import {defineConfig} from 'astro/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import patchAstroRedirects from '../../../packages/shared/src/integrations/patch-astro-redirects.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

const site = process.env.IT_LAB_SITE ?? 'http://localhost:4331';
const base = process.env.IT_LAB_BASE ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [patchAstroRedirects()],
  vite: {
    resolve: {
      alias: {
        '@itu/portal-shared': path.resolve(repoRoot, 'packages/shared/src'),
      },
    },
  },
});
