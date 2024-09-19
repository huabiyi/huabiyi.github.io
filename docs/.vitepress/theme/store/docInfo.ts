import { defineStore, storeToRefs } from 'pinia';
import { splitPath } from '../ts/utils';

export const useDocInfoStore = defineStore('docInfo', {
  state: () => ({
    path: '',
    meta: {
      title: '',
      date: '',
      tags: [],
      author: ''
    },
    currColumnName: '',
    currArticleName: '',
    splitPath: []
  }),
  actions: {
    updateDocInfo(data) {
      const { filePath, frontmatter } = data;
      const split = splitPath(filePath);
      this.splitPath = split;
      this.path = filePath;
      this.meta = frontmatter;
      this.currColumnName = split[1];
      this.currArticleName = frontmatter.title;
    }
  }
});

export { storeToRefs };