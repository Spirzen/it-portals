import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');

/**
 * @param {string} [envVar]
 * @param {string} relativeFromRepo
 */
export function resolveKnowledgeBaseRoot(envVar = 'IT_KB_ROOT', relativeFromRepo = '../it-knowledge-base') {
  const fromEnv = process.env[envVar];
  if (fromEnv && fs.existsSync(fromEnv)) {
    return path.resolve(fromEnv);
  }
  const sibling = path.resolve(repoRoot, relativeFromRepo);
  if (fs.existsSync(sibling)) {
    return sibling;
  }
  throw new Error(
    `it-knowledge-base not found. Set ${envVar} or place repo at ${sibling}`,
  );
}

/**
 * @param {string} srcDir
 * @param {string} destDir
 * @param {{ filter?: (name: string) => boolean }} [options]
 */
export function mirrorMarkdownDir(srcDir, destDir, options = {}) {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Source directory missing: ${srcDir}`);
  }

  fs.mkdirSync(destDir, {recursive: true});
  const entries = fs.readdirSync(srcDir, {withFileTypes: true});
  let copied = 0;

  for (const entry of entries) {
    if (entry.name === '_category_.json') {
      continue;
    }
    if (options.filter && !options.filter(entry.name)) {
      continue;
    }
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      mirrorMarkdownDir(src, dest, options);
      continue;
    }
    if (!/\.mdx?$/i.test(entry.name)) {
      continue;
    }
    fs.copyFileSync(src, dest);
    copied += 1;
  }

  return copied;
}

export {repoRoot};
