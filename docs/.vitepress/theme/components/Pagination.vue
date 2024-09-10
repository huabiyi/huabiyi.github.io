<script setup lang="ts">
import { ref } from 'vue';

import ChevronDoubleLeft from './icon/ChevronDoubleLeft.vue';
import ChevronDoubleRight from './icon/ChevronDoubleRight.vue';
import ChevronLeft from './icon/ChevronLeft.vue';
import ChevronRight from './icon/ChevronRight.vue';

const { total } = defineProps<{
  total: number
}>();
const emit = defineEmits(['updateCurrPage']);
const curr = ref(1);

const handle = {
  clickState(num) {
    return curr.value == num ? 'disableClick' : '';
  },
  sendCurr(num) {
    if (num < 1) num = 1;
    else if (num > total) num = total;

    curr.value = num;

    // 发送当前页面值给父组件
    emit('updateCurrPage', curr.value);
  }
}
</script>

<template>
  <div class="box-pagination">
    <button @click="handle.sendCurr(1)" :class="['btn-first', handle.clickState(1)]"><ChevronDoubleLeft/></button>
    <button @click="handle.sendCurr(--curr)" :class="['btn-prev', handle.clickState(1)]"><ChevronLeft/></button>
    <div class="box-num">
      <input type="text" class="curr" v-model="curr">
      <span> / {{total}}</span>
    </div>
    <button @click="handle.sendCurr(++curr)" :class="['btn-next', handle.clickState(total)]"><ChevronRight/></button>
    <button @click="handle.sendCurr(total)" :class="['btn-last', handle.clickState(total)]"><ChevronDoubleRight/></button>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/mixin.scss";

@mixin btnHover($c: --vp-c-brand-1) {
  &:hover { svg { fill: var($c);} }
}
.box-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.875rem 0 0;
  color: var(--vp-c-text-2);

  button {
    height: 1.875rem;
    @include btnHover;

    &.disableClick {
      cursor: auto;
      svg {fill: var(--vp-c-text-3);}

      @include btnHover(--vp-c-text-3);
    }
  }

  input {
    margin: 0;
    width: 3rem;
    height: 1.875rem;
    padding: 0 .5rem;
    border: 1px solid var(--vp-c-text-2);
    text-align: center;
    font-size: 1rem;
    @include Radius($radius * 0.4);
    @include Transition(width);

    &:hover, &:focus {
      width: 3.8rem;
      border-color: var(--vp-c-brand-1);
    }
  }

  .box-num, button {margin: 0 .625rem 0;}
}
</style>