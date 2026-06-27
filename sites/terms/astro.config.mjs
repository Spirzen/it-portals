import {defineConfig} from 'astro/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

/** Прод: IT_TERMS_SITE=https://terms.spirzen.ru, IT_TERMS_BASE=/ */
const site = process.env.IT_TERMS_SITE ?? 'http://localhost:4330';
const base = process.env.IT_TERMS_BASE ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'never',
  vite: {
    resolve: {
      alias: {
        '@itu/portal-shared': path.resolve(repoRoot, 'packages/shared/src'),
        '@itu/portal-markdown': path.resolve(repoRoot, 'packages/markdown'),
        '@content': path.resolve(repoRoot, 'content'),
      },
    },
    ssr: {
      noExternal: ['@itu/portal-markdown'],
    },
  },
});
