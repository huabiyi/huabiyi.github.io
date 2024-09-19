<script setup lang="ts">
import { useData } from 'vitepress';
import { useDocInfoStore, storeToRefs } from '../../store/docInfo';
import dayJS from '../../ts/setDay';
import { iAuthor, iCreateDate, iTags2 } from '../../ts/iconSvg';

const { themeConfig } = useData().site.value;

const docInfoStore = useDocInfoStore();
const { meta } = storeToRefs(docInfoStore);
</script>

<template>
  <div class="article-info">
    <h1>{{ meta.title }}</h1>
    <div class="meta">
      <div class="author"><iAuthor/> {{meta.author || themeConfig.author}}</div>
      <div class="date"><iCreateDate /> {{dayJS.format(meta.date, 'YYYY-MM-DD')}}</div>
      <div class="tags">
        <iTags2 />
        <p><a v-for="tag in meta.tags">{{tag}}</a></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 文章信息
.article-info {
  margin-bottom: -2.5rem;

  h1 {
    margin-bottom: 15px;
    font-size: 2rem;
    font-weight: bold;
    line-height: initial;
  }

  .meta {
    color: var(--vp-c-text-2);
    font-size: .875rem;

    &, > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    > div {margin-right: .875rem;}
    svg {
      width: 1.2em;
      margin-right: .25rem;
    }

    .tags {
      margin-right: 0;
    }
    .tags p {
      display: flex;
      flex-wrap: wrap;
    }
    a {
      display: flex;
      align-items: center;

      &:before {
        content: "";
        display: inline-block;
        width: .25rem;
        height: .25rem;
        margin: 0 .25rem;
        border-radius: 50%;
        background: currentColor;
      }
      &:first-child:before {display: none;}
    }
  }
}

</style>