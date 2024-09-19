<script setup lang="ts">
console.log('1');
import { onMounted, reactive, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { useDocInfoStore, storeToRefs } from '../../store/docInfo';
import { mapClassify, type MapClassify } from '../../ts/handlePageData';
import { iCaret } from '../../ts/iconSvg';

const { page } = useData();

const docInfoStore = useDocInfoStore();
const { updateDocInfo } = docInfoStore;
updateDocInfo(page.value);
const { splitPath, currArticleName } = storeToRefs(docInfoStore);

let classify: MapClassify & { collapsed?: boolean } = reactive({});

const handle = {
  resetClassify() {
    let valueIsPath: {[key: string]: string | boolean} = {};
    if (splitPath.value.length <= 2) {
      for (const key in mapClassify) {
        let data = mapClassify[key];
        if (typeof data == 'string') valueIsPath[key] = data;
      }
    } else {
      let obj = mapClassify[splitPath.value[1]];
      for (const [key, val] of Object.entries(obj)) {
        if (typeof val == 'string') {
          valueIsPath[key] = val;
        } else {
          classify[key] = {collapsed: false, ...val};
        }
      }
    }

    if (JSON.stringify(valueIsPath) !== '{}') {
      classify.arr = {...valueIsPath, collapsed: false};
    }
  },
  toggle(key) {
    classify[key]['collapsed'] = !classify[key]['collapsed'];
  }
};

onMounted(() => {
  handle.resetClassify();
});

watch(() => page.value, newVal => {
  if (newVal) {
    updateDocInfo(newVal);
  }
}, { deep: true });

watch(() => splitPath.value, newVal => {
  if (newVal) {
    classify = {};
    handle.resetClassify();
  }
}, { deep: true });
</script>

<template>
  <!-- 三级侧导航 -->
  <div class="doc-sidebar-nav">
    <div :class="['dsn-item', {collapsed: item['collapsed']}]" v-for="(item, key) in classify" :key="`doc_${key}`">
      <div class="dsn-title" @click="handle.toggle(key)" v-if="key !== 'arr'">
        <b>{{ key }}</b>
        <button class="btn-toggle"><iCaret/></button>
      </div>

      <div class="dsn-list">
        <template v-for="(val, vkey) in item" :key="val">
          <a :href="val" :class="['dsn-link', {focus: vkey.replace('.html', '') == currArticleName}]" v-if="vkey !== 'collapsed'">
            {{ vkey.replace('.html', '') }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";

// 侧导航
.doc-sidebar-nav {
  .dsn-item {
    padding-bottom: 1.5625rem;

    &:not(:first-child) {
      border-top: 1px solid var(--vp-c-divider);
      padding-top: .625rem;
    }

    &.collapsed {
      padding-bottom: .625rem;

      .dsn-list {height: 0;}
      .dsn-title svg {transform: rotate(0deg);}
    }
  }
  .dsn-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    color: var(--vp-c-text-1);
    cursor: pointer;

    svg {
      width: 1.25rem;
      stroke-width: 2;
      transform: rotate(90deg);
      @include Transition;
    }
  }
  .dsn-list {
    overflow: hidden;
    color: var(--vp-c-text-2);

    a {
      display: block;
      margin: 8px 0 0;
      padding: 0 0 0 8px;
      font-size: .875rem;
      line-height: 1.125rem;
      color: currentColor;

      &:hover, &.focus {color: var(--vp-c-brand-1);}
      &.focus {
        cursor: auto;
        border-left: 2px solid var(--vp-c-brand-1);
      }
    }
  }
}
</style>