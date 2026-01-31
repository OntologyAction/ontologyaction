import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OntologyAction",
  themeConfig: {
    // 1. 全局关闭右侧大纲 (让视觉重心完全移向左侧和中间)
    aside: false, 

    sidebar: [
  {
    text: '引言',
    collapsed: false,
    items: [
      {
        text: '关于 OntologyAction',
        link: '/', // 指向 index.md
        // 这里手动列出你 index.md 里的二级标题
        items: [
          // 规则：去掉 ##，空格变 -，忽略冒号和括号
          { text: '从 AI 热潮到架构困惑', link: '/#从-ai-热潮到架构困惑一个被忽视的核心问题' },
          { text: '本体论的哲学根源', link: '/#features' },
          { text: '核心特征一览', link: '/#本体优先架构的核心特征一览-characteristics-at-a-glance' }
        ]
      }
    ]
  }
]
  }
})
