#!/usr/bin/env node
/**
 * Копирует docs/glossary из it-knowledge-base → content/glossary
 * IT_KB_ROOT — путь к it-knowledge-base (по умолчанию ../it-knowledge-base)
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {mirrorMarkdownDir, repoRoot, resolveKnowledgeBaseRoot} from './src/lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(repoRoot, 'content/glossary');

try {
  const kbRoot = resolveKnowledgeBaseRoot();
  const src = path.join(kbRoot, 'docs/glossary');

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, {recursive: true, force: true});
  }
  fs.mkdirSync(dest, {recursive: true});

  const count = mirrorMarkdownDir(src, dest);
  console.log(`sync-glossary: ${count} files → ${path.relative(repoRoot, dest)}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
