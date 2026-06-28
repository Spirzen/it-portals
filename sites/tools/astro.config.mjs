import {defineConfig} from 'astro/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import patchAstroRedirects from '../../../packages/shared/src/integrations/patch-astro-redirects.mjs';
import ituSitemap from '../../../packages/shared/src/integrations/sitemap.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const site = process.env.IT_TOOLS_SITE ?? 'http://localhost:4334';
const base = process.env.IT_TOOLS_BASE ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [ituSitemap(), patchAstroRedirects()],
  vite: {
    resolve: {
      alias: {
        '@itu/portal-shared': path.resolve(repoRoot, 'packages/shared/src'),
      },
    },
  },
});
