import { defineStore, storeToRefs } from 'pinia';

export const useFilterStore = defineStore('filter', {
  state: () => ({
    tag: '',
    thisMonth: ''
  }),
  actions: {
    update(key: string, val: string) {
      if (key == 'tag') {
        this.$state.thisMonth = '';
        this.$state[key] = val;
      } else {
        this.$state.tag = '';
        this.$state.thisMonth = (this.$state.thisMonth == val) ? '_all' : val;
      }
    }
  }
});
export { storeToRefs };