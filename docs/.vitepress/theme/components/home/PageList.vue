<script setup lang="ts">
import type { Theme } from '../../composables/config';
import Pagination from '../Pagination.vue';
import { reactive, watch } from 'vue';
import { useData } from 'vitepress';
import { useFilterStore } from '../../store/filter';
import { matchData, pageCount } from '../../ts/handlePageData';
import dayJS from '../../ts/setDay';

const { perPage, author } = useData().site.value.themeConfig;
const filterStore = useFilterStore();
let list = reactive<{
  totalPages: number,
  posts: Theme.PageData[]
  arr: Theme.PageData[]
}>({ totalPages: 0, posts: [], arr: [] });

const handle = {
  // 根据当前页面的页码获取数据
  getCurrData(curr: number) {
    list.arr = [...list.posts.slice((curr - 1) * perPage, curr * perPage)];
  },
  getList(type?: string, val?: any) {
    let data = matchData(type, val);

    list.totalPages = pageCount(perPage, data.length);
    list.posts = data;
    list.arr = [...data.slice(0, perPage)];
  }
};
handle.getList();

// 监听筛选条件变化
watch(() => filterStore.tag, (newVal) => {
  if (newVal) {
    if(newVal == '_all') handle.getList();
    else handle.getList('tag', newVal);
  }
});
watch(() => filterStore.thisMonth, (newVal) => {
  if (newVal) handle.getList('thisMonth', newVal);
});
</script>

<template>
  <div class="page-list">
      <div class="card item" v-for="{ meta, route } in list.arr" :key="'home_' + route">
      <!-- TODO:  图片看下怎么处理 -->
      <div class="cover"></div>
      <div class="info">
        <h2><a :href="route" :title="meta.title">{{meta.title || '暂无标题'}}</a></h2>
        <p >{{ meta.excerpt }}</p>
        <div class="btm">
          <!-- TODO: 修改一下标签 span 不适合做嵌套 -->
          <span>{{ meta?.author || author }}</span>
          <span>{{ dayJS.fromNow(meta.lastUpdated) }}</span>
          <span v-if="meta.tags">
            <!-- TODO：更换标签 -->
            <a href="" v-for="tag in meta.tags">{{ tag }}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
  <Pagination :total="list.totalPages" @updateCurrPage="handle.getCurrData" v-if="list.totalPages > 1"/>
</template>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.page-list {width: 100%; }
.item {
  width: 100%;
  padding: 1rem 1.25rem;
  margin: 1.25rem 0 0;

  &:first-child {
    margin-top: 0;
  }

  a:hover {color: var(--vp-c-brand-1);}
}
.info {
  // max-width: 100%;
  flex-shrink: 10;

  h2 {
    font-size: 1.125rem;
    font-weight: bold;
    @include TextEllipsis;

    a {
      display: inline-block;
      @include TextEllipsis;
    }
  }
  p {
    overflow: hidden;
    margin: .375rem 0 0;
    font-size: .875rem;
    text-align: justify;
    color: var(--vp-c-text-3);
    @include TextEllipsis(2);
  }

  .btm {
    position: relative;
    font-size: .875rem;
    line-height: 1rem;
    color: var(--vp-c-text-2);

    // TODO 分割线待优化
    &:before {
      content: "";
      display: block;
      margin: 6px 0 10px;
      // border-top: 1px solid var(--vp-c-text-3);
    }

    a {
      position: relative;
      padding-left: 1rem;

      &:before {
        content: "";
        position: absolute;
        left: .375rem;
        top: 50%;
        transform: translateY(-50%);
        width: .25rem;
        height: .25rem;
        border-radius: 50%;
        background: var(--vp-c-text-3);
      }

      &:first-child {
        padding-left: 0;
        &:before {display: none;}
      }
    }
  }
  span {
    &:before {
      content: "";
      display: inline-block;
      height: .625rem;
      margin: 0 .625rem;
      border: 1px solid var(--vp-c-text-3);
    }

    &:first-child:before {display: none;}
  }
}
.cover {
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.4%;
  margin-left: 1.5625rem;
  overflow: hidden;
}

</style>