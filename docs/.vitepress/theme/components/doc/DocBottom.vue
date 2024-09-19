<script setup lang="ts">
import { mapClassify } from '../../ts/handlePageData';
import { useDocInfoStore, storeToRefs } from '../../store/docInfo';

const docInfoStore = useDocInfoStore();
const { currColumnName } = storeToRefs(docInfoStore);
</script>

<template>
  <!-- 二级导航 -->
  <div class="bottom-nav">
    <div class="bottom-nav-list">
      <!-- TODO: posts根目录下的文章数据问题 -->
      <template v-for="(item, key) in mapClassify" :key="'bnl_'+key">
        <a :href="`/posts/${key}/`" v-if="(key as string).indexOf('.html') == -1" :class="{focus: currColumnName == key}">{{key}}</a>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 底部导航
.bottom-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  background: var(--vp-sidebar-bg-color);

  &-list {
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    text-align: center;
  }

  a {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    margin: 0 10px;

    &:hover {
      color: var(--vp-c-brand-1);
    }
    &.focus {
      border-bottom: 2px solid var(--vp-c-brand-1);
    }
  }
}
</style>