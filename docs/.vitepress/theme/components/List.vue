<script setup lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress';
import '../ts/getPageData.ts';

import Pagination from './Pagination.vue';

const { site, page, frontmatter } = useData();
// console.log('>>>> frontmatter', frontmatter);
// console.log('>>>> page', page);
// console.log('>>>> site', site);

/**
 * showType：
 * all：全部，默认
 * title：标题+日期（月日）
 * titDec：标题+简介
 */
const { showType } = defineProps<{
  showType?: string;
}>();

const isTitleShow = ref(showType === 'title');
const isTitDecShow = ref(showType === 'titDec');

const handle = {
  // 获取当前页面的页码
  receiveCurr(curr: number) {}
}
</script>

<template>
  <div class="page-list">
    <div class="item" :class="'is-'+showType">
      <!-- 图片看下怎么处理 -->
      <div class="cover" v-if="!isTitleShow && !isTitDecShow"><img src="https://img2.baidu.com/it/u=1237025922,2679733234&fm=253&fmt=auto&app=120&f=JPEG?w=749&h=500" alt="ces"></div>
      <div class="info">
        <h2>
          <a href="" title="">标题标题标题标题标题标题标题标题标题标题标标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题11题标题标题标题标题标题标题标题标题标题标题标题标题11</a>
          <b v-if="isTitleShow">01-01</b>
        </h2>
        <p v-if="!isTitleShow">简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>
        <div class="btm" v-if="!isTitleShow && !isTitDecShow">
          <span>作者？</span>
          <span>最近更新</span>
          <span><a href="">tags</a><a href="">tags2</a></span>
        </div>
      </div>
    </div>
  </div>
  <Pagination :total="10" @updateCurrPage="handle.receiveCurr"/>
</template>

<style lang="scss" scoped>
@import "../styles/mixin.scss";

.page-list {width: 100%; }
.item {
  padding: 1rem 1.25rem;
  box-shadow: 0 0 .5rem var(--vp-c-text-3);
  @include Radius;

  a:hover {color: var(--vp-c-brand-1);}
}
.info {
  max-width: 100%;
  flex-shrink: 10;

  h2 {
    display: flex;
    justify-content: space-between;
    font-size: 1.125rem;
    font-weight: bold;
    @include TextEllipsis;

    a {
      display: inline-block;
      @include TextEllipsis;
    }

    b {
      display: inline-block;
      font-weight: normal;
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

    // TODO：分割线待优化
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

.item {
  &.is-title {
    box-shadow: none;

    a {max-width: 80%;}
  }
}
</style>