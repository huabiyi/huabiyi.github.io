import { createContentLoader } from 'vitepress';
// import dateTime from './js/dateTimeFormat';

type PostsItem = {
  url: string;
  title: string;
  tags: string[];
  category: string[];
  createDate?: string;
  excerpt: string | undefined;
  sticky: number | string;
};

export default createContentLoader('posts/**/*.md', {
  excerpt: '<!-- excerpt end -->',  // 自定义摘要结束点
  transform(data) {
    let posts: Array<PostsItem> = [];
    const yearMap: { [key: string]: string[] } = {};
    const tagMap: { [key: string]: string[] } = {};
    const categoryMap: { [key: string]: string[] } = {};
    const urlMap: { [key: string]: PostsItem } = {};

    // 遍历数据 获取需要的内容格式
    data.map(({ url, frontmatter, excerpt }) => {
      let cDate = new Date(frontmatter?.createDate! || new Date());

      let obj: PostsItem = {
        url,
        excerpt,
        title: frontmatter.title,
        tags: frontmatter?.tags || [],
        category: frontmatter?.category || [],
        // createDate: dateTime.format(cDate, 'YYYY/MM/DD hh:mm'),
        sticky: frontmatter?.sticky || 0
      };
      posts.push(obj);

      // 以地址为id的集合
      urlMap[url] = obj;
    });

    // 根据创建时间进行排序
    // posts = posts.sort((a, b) => {
    //   if (b.createDate > a.createDate) return 1;
    //   else if (b.createDate < a.createDate) return -1;
    //   else return 0;
    // });
    // console.log('>>>> posts', posts);

    // 获取年份、标签、分类
    posts.map((val) => {
      // console.log('>>>> val', val);
      // let year: number = new Date(val.createDate).getFullYear();
      let year: number = new Date().getFullYear();

      // 年份集合
      if (!yearMap[year]) yearMap[year] = [];
      yearMap[year].push(val.url);

      // 标签集合
      val.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push(val.url);
      });

      // 分类集合
      val.category.forEach(cat => {
        if (!categoryMap[cat]) categoryMap[cat] = [];
        categoryMap[cat].push(val.url);
      });
    });

    return {
      posts,
      total: posts.length,
      yearMap,
      tagMap,
      // categoryMap,
      urlMap
    };
  }
})