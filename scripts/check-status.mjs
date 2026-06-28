#!/usr/bin/env node
/**
 * Проверяет доступность всех сервисов экосистемы и пишет public/status.json.
 * Запускается перед build и по расписанию в CI.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const servicesPath = path.join(root, 'src/data/services.json');
const outPath = path.join(root, 'public/status.json');

const TIMEOUT_MS = 12_000;

/** @param {string} url */
async function probe(url) {
  const started = Date.now();
  const attempts = [
    () => fetch(url, {method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS)}),
    () => fetch(url, {method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS)}),
  ];

  /** @type {Response | null} */
  let lastRes = null;

  for (const attempt of attempts) {
    try {
      const res = await attempt();
      lastRes = res;
      if (res.ok) {
        return {
          state: 'up',
          httpStatus: res.status,
          latency: Date.now() - started,
          checkedAt: new Date().toISOString(),
        };
      }
      if (res.status >= 500) {
        return {
          state: 'down',
          httpStatus: res.status,
          latency: Date.now() - started,
          checkedAt: new Date().toISOString(),
        };
      }
      /* 4xx from HEAD — try GET before marking degraded */
    } catch {
      /* try next method */
    }
  }

  if (lastRes) {
    return {
      state: 'degraded',
      httpStatus: lastRes.status,
      latency: Date.now() - started,
      checkedAt: new Date().toISOString(),
    };
  }

  return {
    state: 'down',
    httpStatus: 0,
    latency: Date.now() - started,
    checkedAt: new Date().toISOString(),
  };
}

async function main() {
  const {services} = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
  const results = await Promise.all(
    services.map(async (svc) => {
      const probeResult = await probe(svc.url);
      process.stdout.write(`${probeResult.state === 'up' ? '●' : '○'} ${svc.domain}\n`);
      return {
        id: svc.id,
        domain: svc.domain,
        url: svc.url,
        ...probeResult,
      };
    }),
  );

  const summary = {
    total: results.length,
    up: results.filter((r) => r.state === 'up').length,
    degraded: results.filter((r) => r.state === 'degraded').length,
    down: results.filter((r) => r.state === 'down').length,
  };

  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    summary,
    services: Object.fromEntries(results.map((r) => [r.id, r])),
  };

  fs.mkdirSync(path.dirname(outPath), {recursive: true});
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`\nStatus: ${summary.up}/${summary.total} online → ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
