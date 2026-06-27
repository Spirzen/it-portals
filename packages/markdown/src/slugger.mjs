/** Упрощённый slugger, совместимый с Docusaurus createSlugger для кириллицы. */
export function createSlugger() {
  /** @type {Map<string, number>} */
  const counts = new Map();

  return {
    /** @param {string} value */
    slug(value) {
      const base = value
        .trim()
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '');

      const key = base || 'section';
      const count = counts.get(key) ?? 0;
      counts.set(key, count + 1);
      return count === 0 ? key : `${key}-${count}`;
    },
  };
}
