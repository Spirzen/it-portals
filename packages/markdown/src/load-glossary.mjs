import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {listMarkdownFiles, parseMarkdownFile, glossaryPageSlug} from './parse-markdown.mjs';
import {renderMarkdownToHtml} from './render-markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, '../../..');

function resolveContentDir(contentDir) {
  if (contentDir) {
    return contentDir;
  }
  if (process.env.IT_PORTALS_ROOT) {
    return path.join(process.env.IT_PORTALS_ROOT, 'content/glossary');
  }
  if (fs.existsSync(path.join(monorepoRoot, 'ecosystem-urls.json'))) {
    return path.join(monorepoRoot, 'content/glossary');
  }
  return path.join(monorepoRoot, 'content/glossary');
}

/**
 * @param {string} [contentDir]
 */
export async function loadGlossaryPages(contentDir) {
  const dir = resolveContentDir(contentDir);
  const files = listMarkdownFiles(dir, {skip: new Set(['intro.md', '_category_.json', 'README.md'])});
  /** @type {Array<Awaited<ReturnType<typeof buildGlossaryPage>>>} */
  const pages = [];

  for (const fileName of files) {
    pages.push(await buildGlossaryPage(path.join(dir, fileName)));
  }

  const introPath = path.join(dir, 'intro.md');
  const intro = fs.existsSync(introPath) ? await buildGlossaryPage(introPath, {isIntro: true}) : null;

  return {
    intro,
    letters: pages.sort((a, b) => a.label.localeCompare(b.label, 'ru')),
    sidebar: buildSidebar(intro, pages),
  };
}

/**
 * @param {Awaited<ReturnType<typeof buildGlossaryPage>> | null} intro
 * @param {Array<Awaited<ReturnType<typeof buildGlossaryPage>>>} letters
 */
function buildSidebar(intro, letters) {
  /** @type {Array<{ slug: string, label: string, href: string }>} */
  const items = [];
  if (intro) {
    items.push({slug: 'intro', label: 'О разделе', href: '/glossary/intro'});
  }
  for (const page of letters) {
    items.push({slug: page.slug, label: page.label, href: page.href});
  }
  return items;
}

/**
 * @param {string} filePath
 * @param {{ isIntro?: boolean }} [options]
 */
async function buildGlossaryPage(filePath, options = {}) {
  const parsed = parseMarkdownFile(filePath);
  const slug = options.isIntro ? 'intro' : glossaryPageSlug(parsed.fileName);
  const introHtml = await renderMarkdownToHtml(parsed.introMarkdown);
  const terms = [];

  for (const term of parsed.terms) {
    terms.push({
      ...term,
      html: await renderMarkdownToHtml(term.markdown),
    });
  }

  return {
    slug,
    label: parsed.title,
    title: parsed.title,
    description: parsed.description,
    href: `/glossary/${slug}`,
    introHtml,
    terms,
  };
}
