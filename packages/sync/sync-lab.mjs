#!/usr/bin/env node
/**
 * Копирует docs/lab из it-knowledge-base → content/lab
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mirrorMarkdownDir, repoRoot, resolveKnowledgeBaseRoot} from './src/lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(repoRoot, 'content/lab');

try {
  const kbRoot = resolveKnowledgeBaseRoot();
  const src = path.join(kbRoot, 'docs/lab');

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, {recursive: true, force: true});
  }
  fs.mkdirSync(dest, {recursive: true});

  const count = mirrorMarkdownDir(src, dest);
  console.log(`sync-lab: ${count} files → ${path.relative(repoRoot, dest)}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
