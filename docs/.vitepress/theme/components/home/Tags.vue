<script setup lang="ts">
import { computed } from 'vue';
import { useFilterStore } from '../../store/filter';
import { mapTags } from '../../ts/handlePageData';
import { iTags1, iClose } from '../../ts/iconSvg';

const filter = useFilterStore();
const selected = computed(() => filter.tag);

const handle = {
  click(tag: any) {
    filter.update('tag', tag);
  }
};
</script>

<template>
  <div class="card tags" v-if="Object.keys(mapTags).length !== 0">
    <div class="card-header tags-head">
      <div class="card-title"><iTags1/> 标签</div>
      <div class="curr-selected" v-show="selected">
        <span>{{ filter.tag }}</span>
        <button class="btn-cancel" @click="handle.click('_all')"><iClose/></button>
      </div>
    </div>
    <div class="card-body tags-list">
      <button v-for="(tag, key, idx) in mapTags" :key="key" :class="'c'+(idx % 5)" @click="handle.click(key)">{{key}}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../styles/mixin.scss";
.tags-head {
  position: relative;

  .card-tilte {
    svg {width: 1em;}
  }

  .curr-selected {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 .25rem 0 .375rem;
    background: var(--vp-c-brand-1);
    color: #fff;
    font-size: .75rem;
    white-space: nowrap;
    @include Radius;
  }
  .btn-cancel {
    margin-left: .375rem;
    border-radius: 50%;
    padding: .125rem;
    @include Transition(background);

    svg {
      width: .875rem;
      stroke-width: 3px;
      stroke: currentcolor;
    }

    &:hover {
      background: var(--vp-c-gray-1);
    }
  }
}
.tags-list {
  display: flex;
  flex-wrap: wrap;
  padding: .625rem 0 0;

  button {
    padding: 0 .5rem;
    margin: 0 8px 8px 0;
    font-size: .75rem;
    background: var(--vp-c-brand-1);
    color: #fff;
    @include Radius;

    &.c0 {background: var(--vp-c-indigo-3);}
    &.c1 {background: var(--vp-c-yellow-3);}
    &.c2 {background: var(--vp-c-purple-3);}
    &.c3 {background: var(--vp-c-brand-3);}
    &.c4 {background: var(--vp-c-text-2);}

    &:hover {
      color: var(--vp-c-brand-3);
      background: #fff;
    }
  }
}
</style>