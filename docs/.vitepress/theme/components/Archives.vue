<script setup lang="ts">
import { reactive } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { Theme } from '../composables/config';
import { mapYear, mapRoute } from '../ts/handlePageData';
import dayJS from '../ts/setDay';

const { Layout } = DefaultTheme;

const sortedKey = Object.keys(mapYear).sort((a, b) => b.localeCompare(a));
const list = reactive<{year: string, posts: Theme.PageData[]}[]>([]);

sortedKey.map((val, idx) => {
  let yearRoutes = mapYear[val];

  list.push({year: val, posts: []});
  yearRoutes.map(item => {
    let meta = mapRoute[item];
    list[idx].posts.push({meta: meta, route: item});
  });
});
</script>

<template>
  <div class="custom-page-archives">
    <div class="group" v-for="item in list" :key="item.year">
      <div class="tit-year"><b>{{item.year}}</b></div>
      <div class="content-list">
        <p v-for="val in item.posts" :key="val.meta.title">
          <a :href="val.route">{{val.meta.title}}</a>
          <span>{{dayJS.format(val.meta.date, 'MM-DD')}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-page-archives {
  max-width: 720px;
  padding: 1.875rem 1.5625rem 3.125rem;
}
.group {
  margin-bottom: 1.5625rem;
}
.tit-year {
  font-size: 1.25rem;
  margin-left: -0.75rem;
}
p {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 3%;
  margin: .625rem 0;
  line-height: 1.125rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -0.125rem;
    width: .25rem;
    height: .25rem;
    border-radius: 50%;
    background: var(--vp-c-brand-1);
  }

  a, span { white-space: nowrap; }
  a {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 4%;

    &:hover {color: var(--vp-c-brand-1);}
  }
  span { color: var(--vp-c-text-3); }
}
</style>