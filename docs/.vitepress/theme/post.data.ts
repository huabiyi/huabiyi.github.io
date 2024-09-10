import type { Theme } from './composables/config/index';
import type { SiteConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { createContentLoader } from 'vitepress';
import dayJS from './ts/setDay';

// 获取 data loader 中的配置信息
const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
const srcDir = (config.site.themeConfig.srcDir || '') + '/';

export default createContentLoader(`${srcDir}**/*.md`, {
  transform(raw): Theme.PageData[] {
    return raw.map((page) => {
      const { url, frontmatter } = page;
      const filepath = config.root + url.replace('.html', '.md');
      const stats = fs.statSync(path.resolve(filepath));

      return {
        meta: {
          title: frontmatter?.title,
          excerpt: frontmatter?.excerpt,
          date: dayJS.format(frontmatter?.date || new Date()),
          lastUpdated: dayJS.format(stats.mtime),
          tags: frontmatter?.tags,
          categorize: frontmatter?.categorize,
          layout: frontmatter?.layout,
        },
        route: url
      };
    }).sort((a: any, b: any) => +new Date(b.meta.date) - +new Date(a.meta.date));
  }
});