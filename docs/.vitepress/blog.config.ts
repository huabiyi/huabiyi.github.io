// 博客的配置
import type { Theme } from 'vitepress';
import { iCopyright, iTheme } from './theme/ts/iconSvg';

const author: string = 'Echo';
const githubLink: string = 'https://github.com/huabiyi/';

export const blogConfig = {
  title: `${author}'s blog`,
  description: "记录日常工作笔记和总结等等",
  themeConfig: {
    blog: true,
    logo: '/imgs/logo.png',
    author: author,
    srcDir: 'posts',
    perPage: 8,
    order: 'date', // 默认：date, lastUpdated, name
    outline: [2, 3],
    head: [['link', { rel: 'icon', href: '/imgs/logo.png' }]],
    footer: {
      // TODO: 要重构
      message: `Powered by&nbsp;<a href="https://vitepress.dev/zh/" target="_blank">VitePress - 1.3.4</a>`,
      copyright: `<span>Copyright © <a href="${githubLink}" target="_blank">${author} Yao</a> | MIT License</span>`
    },
    socialLinks: [
      { icon: 'github', link: githubLink }
    ],
    lastUpdated: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/posts/' },
      { text: '归档', link: '/archives/' },
    ],
    sidebar: [{ text: ''}],
    horizontalNav: true,
    search: {provider: 'local'},
  } as any
} as Theme;