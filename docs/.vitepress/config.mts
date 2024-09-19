import { defineConfig } from 'vitepress';
import { blogConfig } from './blog.config';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogConfig,
  ignoreDeadLinks: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh-cn'
    }
  },
  transformHead({ assets }) {
    // TODO: 测试字体是否引入成功
    // 相应地调整正则表达式以匹配字体
    const myFontFile = [
      assets.find(file => /\/fonts\/DankMono\.\w+\.woff2/),
      assets.find(file => /\/fonts\/LXGWWenKaiLite\.\w+\.woff2/)
    ];
    if (myFontFile) {
      let links: any = [];
      myFontFile.map(val => {
        links.push([
          'link',
          {
            rel: 'preload',
            href: val,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]);
      });
      return links;
    }
  }
});
