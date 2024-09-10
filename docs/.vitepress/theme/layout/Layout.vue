<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';

import HomeBanner from '../components/HomeBanner.vue';
import List from '../components/List.vue';

const { Layout } = DefaultTheme;
const { site } = useData();
const { themeConfig } = site.value;
</script>

<template>
  <Layout>
    <template #home-hero-before v-if="themeConfig?.blog">
      <div class="home">
        <HomeBanner />
        <div class="home-content">
          <div class="home-list">
            <List />
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style scoped lang="scss">
.home {
  max-width: 1126px;
  margin: 0 auto;
}
</style>