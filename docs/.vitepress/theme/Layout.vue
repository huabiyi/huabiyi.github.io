<script setup lang="ts">
import Home from './components/home/Home.vue';
import DocBefore from './components/doc/DocBefore.vue';
import DocBottom from './components/doc/DocBottom.vue';
import SidebarNavAfter from './components/doc/SidebarNavAfter.vue';
import Archives from './components/Archives.vue';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
const { themeConfig } = useData().site.value;
const { frontmatter} = useData();
console.log('>>>> frontmatter', frontmatter);
</script>

<template>
    <main v-if="themeConfig?.blog">
      <Layout>
        <!-- 首页 -->
        <template #home-hero-after>
          <slot name="home-hero-after" />
          <Home />
        </template>

        <!-- 文章页 -->
        <template #sidebar-nav-after>
          <slot name="sidebar-nav-after" />
          <SidebarNavAfter />
        </template>

        <template #doc-before>
          <slot name="doc-before"/>
          <DocBefore />
        </template>

        <template #doc-bottom>
          <slot name="doc-bottom"/>
          <DocBottom v-if="themeConfig.horizontalNav"/>
        </template>

        <!-- 新增自定义页面 -->
        <template #page-top>
          <slot name="page-top" />
          <!-- 归档页 -->
          <Archives v-if="frontmatter.archives" />
        </template>
      </Layout>
    </main>
</template>

<style scoped lang="scss">

</style>