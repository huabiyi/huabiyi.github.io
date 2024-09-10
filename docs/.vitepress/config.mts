import { defineConfig } from 'vitepress';
import { blogConfig } from './blog.config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogConfig,
  locales: {
    root: {
      label: '中文',
      lang: 'zh-cn'
    }
  },
  themeConfig: {
    lastUpdated: true,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  } as any
});
