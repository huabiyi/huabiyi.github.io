/* eslint-disable ts/no-namespace */
import type { DefaultTheme } from 'vitepress'

export namespace Theme {
  export interface Config extends DefaultTheme.Config {
    blog?: BlogConfig
  }

  export interface BlogConfig {
    blog?: false
    home?: false
    author?: string
    title?: string
    // 座右铭
    motto?: string
    // 一言：默认开启
    hitokoto?: boolean
    footer?: Footer | Footer[]
    backToTop?: boolean | BackToTop
    /**
     * 解析 frontmatter 里 date 的时区
     * @default new Date().getTimezoneOffset() / -60
     * @example 8 => 'UTC+8'
     */
    timeZone?: number

    // 文章数据
    pageData?: PageData[]
    srcDir?: string
    // 待增加内容
    // comment?: CommentConfig | false
  }

  export interface PageData {
    meta: PageMeta
    route: string
  }
  export interface PageMeta {
    title?: string
    date?: string
    lastUpdated?: string
    description?: string
    tags?: string[]
    categorize?: string[]
    layout?: string
    // TODO： 文章列表顺序？
  }

  // 回到页面顶部
  export interface BackToTop {
    // 展示图标
    icon?: string
    /**
     * 滚动条滚动多长距离之后出现
     * @default 50% height
     */
    top?: number
  }

  // 底部信息
  export interface Footer {
    // 3个自定义补充信息（支持配置为HTML）
    // 在内置的 footer 上方
    message?: string | string[]
    // 在内置的 footer 下方
    bottomMessage?: string | string[]
    // 紧随内置的后方
    list?: string | string[] | FooterItem | FooterItem[]

    // 是否展示主题版本信息
    themeVersion?: boolean | {
      name?: string
      link?: string
      icon?: boolean | string
    }
    copyright?: string | {
      message: string
      link?: string
      icon?: boolean | string
    }
    // ICP 备案信息
    icpRecord?: {
      name: string
      link: string
      icon?: boolean | string
    }
    // 公安备案信息
    securityRecord?: {
      name: string
      link: string
      icon?: boolean | string
    }
  }

  export interface FooterItem {
    text: string
    link?: string
    icon?: boolean | string
  }
}