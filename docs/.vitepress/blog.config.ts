// 博客的配置
import type { Theme } from 'vitepress';

const author: string = 'Echo';

export const blogConfig = {
  title: `${author}'s blog`,
  description: "记录日常笔记和博文11",
  themeConfig: {
    blog: true,
    author: author,
    srcDir: ''
  }
} as Theme;