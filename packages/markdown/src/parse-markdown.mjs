import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {createSlugger} from './slugger.mjs';

export {parseMarkdownFile, listMarkdownFiles, glossaryLetterFromFile, glossaryPageSlug};

/** @param {string} fileName */
function glossaryLetterFromFile(fileName) {
  return fileName.replace(/\.mdx?$/i, '');
}

/** @param {string} fileName */
function glossaryPageSlug(fileName) {
  const letter = glossaryLetterFromFile(fileName);
  return letter === 'intro' ? 'intro' : letter;
}

/**
 * @param {string} dir
 * @param {{ skip?: Set<string> }} [options]
 */
function listMarkdownFiles(dir, options = {}) {
  const skip = options.skip ?? new Set(['_category_.json']);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((name) => /\.mdx?$/i.test(name) && !skip.has(name))
    .sort((a, b) => a.localeCompare(b, 'ru'));
}

/**
 * @param {string} filePath
 */
function parseMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const {data, content} = matter(raw);
  const fileName = path.basename(filePath);
  const cleaned = stripDocusaurusArtifacts(content);
  const terms = extractHeadingTerms(cleaned.bodyForTerms);
  const introHtml = cleaned.introMarkdown.trim();

  return {
    fileName,
    frontmatter: data,
    title: data.title ?? data.sidebar_label ?? glossaryLetterFromFile(fileName),
    description: data.description ?? '',
    slug: typeof data.slug === 'string' ? data.slug.replace(/^\/glossary\//, '') : glossaryLetterFromFile(fileName),
    introMarkdown: introHtml,
    terms,
    rawBody: cleaned.bodyForTerms,
  };
}

/**
 * @param {string} content
 */
function stripDocusaurusArtifacts(content) {
  let body = content;

  body = body.replace(/import\s+[\s\S]*?from\s+['"]@theme\/[^'"]+['"];?\s*/g, '');
  body = body.replace(/import\s+[\s\S]*?from\s+['"]@site\/[^'"]+['"];?\s*/g, '');
  body = body.replace(/<DocCardList\s*\/>/g, '');
  body = body.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '');

  const introParts = [];
  const lines = body.split(/\r?\n/);
  const kept = [];
  let inTags = false;

  for (const line of lines) {
    if (/^<div class="article-tags">/.test(line)) {
      inTags = true;
      continue;
    }
    if (inTags) {
      if (/<\/div>/.test(line)) {
        inTags = false;
      }
      continue;
    }
    if (/^---\s*$/.test(line) && kept.length === 0 && introParts.length === 0) {
      continue;
    }
    kept.push(line);
  }

  body = kept.join('\n').trim();

  const sections = body.split(/\n(?=##\s+)/);
  introParts.push(sections.shift() ?? '');

  return {
    introMarkdown: introParts.join('\n').trim(),
    bodyForTerms: [introParts.join('\n'), ...sections].join('\n').trim(),
  };
}

/**
 * @param {string} content
 */
function extractHeadingTerms(content) {
  const slugger = createSlugger();
  /** @type {Array<{ title: string, anchor: string, markdown: string }>} */
  const terms = [];
  const parts = content.split(/\n(?=##\s+)/);

  for (const part of parts) {
    const match = /^##\s+(.+?)\s*(?:\r?\n|$)/.exec(part);
    if (!match) {
      continue;
    }
    const title = match[1].trim();
    if (!title) {
      continue;
    }
    const anchor = slugger.slug(title);
    const markdown = part.replace(/^##\s+.+?\s*(?:\r?\n|$)/, '').trim();
    terms.push({title, anchor, markdown});
  }

  return terms;
}
