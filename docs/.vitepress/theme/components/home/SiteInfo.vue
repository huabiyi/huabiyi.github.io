<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { total, thisMonth } from '../../ts/handlePageData';
import { useFilterStore } from '../../store/filter';

const { author, logo } = useData().site.value.themeConfig;

const filter = useFilterStore();
let state = computed(() => filter.thisMonth);

const handle = {
  click(type: any) {
    filter.update('thisMonth', type);
  }
};
</script>

<template>
  <div class="card site-info">
    <div class="blog-author">
      <div class="img"><img :src="logo" alt="avatar"></div>
      <p>{{ author }}</p>
    </div>
    <ul class="overview-data">
      <li :class="{selected: state == 'update'}" @click="handle.click('update')">
        <p>+{{ thisMonth.update.length }}</p><span>本月更新</span>
      </li>
      <li :class="{selected: state == 'add'}" @click="handle.click('add')">
        <p>+{{ thisMonth.add.length }}</p><span>本月新增</span>
      </li>
      <li><p>{{ total }}</p><span>博客文章</span></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

.card {
  text-align: center;
}
.blog-author {
  margin-bottom: 1.25rem;

  .img {
    width: 6.25rem;
    height: 6.25rem;
    margin: .625rem auto;
    overflow: hidden;
    @include Radius($radius*2);
  }

  p {
    font-size: 1.125rem;
  }
}
.overview-data {
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    position: relative;
    width: 30%;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: -1px;
      transform: translateY(-50%);
      height: 12px;
      border-left: 2px solid var(--vp-c-text-3);
    }
    &:first-child:after {display: none;}

    &:nth-child(-n+2) {cursor: pointer;}

    &.selected { color: var(--vp-c-brand-1);}
  }
  p { font-size: 1.125rem; }
  span {
    display: block;
    font-size: .75rem;
    color: var(--vp-c-text-3);
  }
}
</style>