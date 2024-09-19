import type { Theme } from './composables/config/index';
import type { SiteConfig } from 'vitepress';
import { execSync } from 'node:child_process';
import { createContentLoader } from 'vitepress';
import dayJS from './ts/setDay';

// 获取 data loader 中的配置信息
const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
const srcDir = (config.site.themeConfig.srcDir || '') + '/';

export default createContentLoader(`${srcDir}**/*.md`, {
  transform(raw): Theme.PageData[] {
    let posts: Theme.PageData[] = [];
    raw.map(({ url, frontmatter }) => {
      const file = config.root + url.replace('.html', '.md');
      if (!frontmatter?.lastUpdated) {
        try {
          const gitDate = execSync(`git log -1 --format=%cd --date=default ${file}`, { encoding: 'utf-8' }).trim();
          frontmatter.lastUpdated = gitDate;
        } catch (error) {
          console.error(`Error fetching last updated time for ${file}:`, error);
        }
      }

      // 过滤掉frontmatter.title为空的数据
      if (frontmatter.title && !/\/$/.test(url)) {
        posts.push({
          meta: {
            title: frontmatter?.title,
            excerpt: frontmatter?.excerpt,
            date: dayJS.format(frontmatter?.date),
            lastUpdated: dayJS.format(frontmatter?.lastUpdated),
            tags: frontmatter?.tags,
            categorize: frontmatter?.categorize,
            layout: frontmatter?.layout,
          },
          route: url
        });
      }
    })
    posts = posts.sort((a: any, b: any) => +new Date(b.meta.date) - +new Date(a.meta.date));

    return posts;
  }
});