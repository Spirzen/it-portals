import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findRepoRoot(startDir = __dirname) {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, 'ecosystem-urls.json'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new Error('ecosystem-urls.json not found — run build from it-portals repo');
}

let cached = null;

/**
 * @param {{ repoRoot?: string, dev?: boolean, portalId?: string }} [options]
 */
export function loadEcosystemConfig(options = {}) {
  if (cached && !options.repoRoot && options.dev === undefined) {
    return cached;
  }

  const root = options.repoRoot ?? process.env.IT_PORTALS_ROOT ?? findRepoRoot();
  const raw = JSON.parse(fs.readFileSync(path.join(root, 'ecosystem-urls.json'), 'utf8'));

  const useDev = options.dev ?? process.env.IT_PORTALS_DEV === '1';
  const domains = {...raw.domains};

  if (useDev && raw.localDev) {
    for (const [key, url] of Object.entries(raw.localDev)) {
      if (url) {
        domains[key] = url.replace(/\/$/, '');
      }
    }
  }

  const config = {
    ...raw,
    domains,
    repoRoot: root,
  };

  if (!options.repoRoot) {
    cached = config;
  }

  return config;
}

/**
 * @param {ReturnType<typeof loadEcosystemConfig>} config
 * @param {string} portalId — terms | lab | games | kids | tools
 */
export function resolvePortalBase(config, portalId) {
  const base = config.domains[portalId];
  if (!base) {
    throw new Error(`Unknown portal id: ${portalId}`);
  }
  return base.replace(/\/$/, '');
}

/**
 * @param {ReturnType<typeof loadEcosystemConfig>} config
 * @param {{ hrefKey: string, routeKey?: string, suffix?: string }} item
 */
export function resolveNavHref(config, item) {
  const domain = config.domains[item.hrefKey]?.replace(/\/$/, '') ?? '#';
  if (!item.routeKey) {
    return domain;
  }
  const route = config.routes[item.routeKey] ?? '';
  const suffix = item.suffix ?? '';
  return `${domain}${route}${suffix}`;
}

/**
 * @param {ReturnType<typeof loadEcosystemConfig>} config
 * @param {string} portalId
 * @param {string} [activeId]
 */
export function buildNavItems(config, portalId, activeId = portalId) {
  return (config.nav?.ecosystem ?? []).map((item) => ({
    id: item.id,
    label: item.label,
    href: resolveNavHref(config, item),
    active: item.id === activeId,
  }));
}

/**
 * @param {ReturnType<typeof loadEcosystemConfig>} config
 * @param {string} routeKey — glossaryPrefix | labPrefix | …
 * @param {string} portalId — домен для routeKey (terms для glossary)
 */
export function absoluteRoute(config, routeKey, portalId, suffix = '') {
  const domain = resolvePortalBase(config, portalId);
  const route = config.routes[routeKey] ?? '';
  return `${domain}${route}${suffix}`;
}

export {findRepoRoot};
