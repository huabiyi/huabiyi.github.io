import './styles/style.css';
import './styles/custom.scss';
// https://vitepress.dev/guide/custom-theme
import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { createPinia } from 'pinia';

import Layout from './Layout.vue';
import Archives from './components/Archives.vue';

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(createPinia());
    app.component('Archives', Archives);
    // ...
  },
} satisfies Theme;
