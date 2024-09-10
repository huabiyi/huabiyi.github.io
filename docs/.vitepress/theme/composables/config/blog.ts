import { useData } from 'vitepress';
import type { Component, InjectionKey, Ref } from 'vue';
import { computed, defineComponent, h, provide } from 'vue';
import type { Theme } from './index';

const configSymbol: InjectionKey<Ref<Theme.Config>> = Symbol('theme-config');
export function withConfigProvider(App: Component) {
  return defineComponent({
    name: 'ConfigProvider',
    setup(_, { slots }) {
      const { theme } = useData();
      console.log('>>>> theme', theme);

      const config = computed(() => resolveConfig(theme.value));

      // provide(homeFooter, config.value.blog?.footer);
      provide(configSymbol, config);

      return () => h(App, null, slots);
    }
  });
};

function resolveConfig(config: Theme.Config): Theme.Config {
  return {
    ...config,
    blog: {
      ...config?.blog,
      pageData: config?.blog?.pageData || []
    }
  };
}