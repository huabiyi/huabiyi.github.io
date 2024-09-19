// 获取pageData的各种信息
import type { Theme } from '../composables/config/index';
import { data as posts } from '../posts.data';
import dayJS from './setDay';
import { splitPath } from './utils';

type RoutesArr = {
  [key: string]: string[]
};
export type MapClassify<T = string | boolean> = {
  [key: string]: MapClassify<T> | T
};

const mapRoute: { [key: string]: Theme.PageMeta } = {};
const mapClassify: MapClassify = {};
const thisMonth: RoutesArr = {update:[], add: []};
const mapTags: RoutesArr = {};
let mapYear: RoutesArr = {};

const getClassify = (route: string) => {
  const paths = splitPath(route, 6);
  const len = paths.length;
  let currObj: MapClassify | string = mapClassify;

  paths.map((val, idx) => {
    if (idx === (len-1)) {
      currObj[val] = route;
    } else {
      if (!currObj[val]) {
        currObj[val] = {};
      }
      currObj = currObj[val];
    }
  });
};

console.log('>>>> posts', posts);
posts.map(({ meta, route }) => {
  // 保存以 文件路径 为key，meta为值的数据
  mapRoute[route] = meta;

  // 本月或本月新增
  const currMonth = dayJS.getMonth();
  if (currMonth == dayJS.getMonth(meta.date)) {
    thisMonth.add.push(route);
  };
  if (currMonth == dayJS.getMonth(meta.lastUpdated)) {
    thisMonth.update.push(route);
  }

  // tags
  meta.tags?.forEach(tag => {
    mapTags[tag] = mapTags[tag] || [];
    mapTags[tag].push(route);
  });

  // 年份
  mapYear[dayJS.getYear(meta.date)] = mapYear[dayJS.getYear(meta.date)] || [];
  mapYear[dayJS.getYear(meta.date)].push(route);

  // 对路径进行分类
  getClassify(route);
});

export const total = posts.length;
export const pageCount = (perPage, num = total) => Math.ceil(num / perPage);

// 根据筛选的地址匹配具体的数据
export const matchData = (type?: any, val?: any) => {
  if ((!type && !val) || (val === '_all')) {
    return posts;
  }

  let res: Theme.PageData[] = [];
  let mapData: string[] = [];
  if (type === 'tag') { mapData = mapTags[val]; }
  if (type === 'thisMonth') { mapData = thisMonth[val]; }

  mapData.map((val) => {
    res.push({meta: mapRoute[val], route: val});
  });
  return res;
};
export {
  posts,
  thisMonth,
  mapTags,
  mapRoute,
  mapClassify,
  mapYear
};