<script setup lang="ts">
import Banner from './Banner.vue';
import List from './PageList.vue';
import SiteInfo from './SiteInfo.vue';
import Tags from './Tags.vue';
</script>

<template>
  <div class="custom-page-home">
    <Banner />
    <div class="home-wrap">
      <div class="wrap-page-list">
        <List />
      </div>
      <div class="wrap-site-info">
        <div class="blog-info">
          <SiteInfo />
          <Tags />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-home {
  max-width: 1126px;
  margin: 0 auto;
  padding: 0 1.5625rem;
}

.home-wrap {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.wrap-page-list {
  width: 100%;
}

.wrap-site-info {
  position: sticky;
  top: 80px;
  margin-left: 1.25rem;

  .blog-info {
    width: 280px;
    min-width: 240px;
  }
}

// 适配小屏
@media screen and (max-width: 767px) {
  .home-wrap {
    flex-wrap: wrap;
  }

  .wrap-site-info {
    margin: 0;
    width: 100%;
  }
}
</style>