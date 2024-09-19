<script setup lang="ts">
import { useData } from 'vitepress';
import { ref, onMounted } from 'vue';

const { title, description } = useData().site.value;

// 一言
let hitokoto = ref('');
onMounted(() => {
  fetch('https://v1.hitokoto.cn')
  .then(response => response.json())
  .then(data => {
    hitokoto.value = data.hitokoto;
  })
  .catch(console.error)
});
</script>

<template>
  <div>
    <div class="home-banner">
      <h1>
        <b class="title">{{ title }}</b>
        <!-- 简介 & 座右铭 -->
        <span class="motto">{{description}}</span>
      </h1>
      <!-- 一言 -->
      <div class="hitokoto">
        <p>{{ hitokoto }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  padding: 2rem 0;
  text-align: center;
}
h1 {
  .title {
    display: inline-block;
    font-size: 3.125rem;
    line-height: 60px;
  }
  .motto {
    display: inline-block;
    position: relative;
    padding: 0 1rem;
    margin-left: .625rem;
    font-size: .875rem;
    opacity: 0.8;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 11px;
      width: .5rem;
      border-top: 2px solid var(--vp-c-text-1);
    }
  }
}
.hitokoto {
  margin: 1.25rem auto;

  p {
    font-size: 1.25rem;
  }
}
</style>