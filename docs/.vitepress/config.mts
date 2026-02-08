import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    // --- 顶层配置 ---
    title: "OntologyAction",
    description: "本体优先架构 (Ontology-First Architecture)",

    // --- Mermaid 配置 (与 themeConfig 平级) ---
    mermaid: {
      theme: 'neutral', 
    },

    // --- 主题配置 ---
    themeConfig: {
      aside: false, 
      footer: {
        message: '基于 <a href="https://creativecommons.org" target="_blank" rel="noopener">CC BY-NC-ND 4.0</a> 许可协议发布',
        copyright: `Copyright © 2024-${new Date().getFullYear()} <a href="https://ontologyaction.com">OntologyAction</a> | <a href="https://github.com" target="_blank" rel="noopener">YS Zheng</a>`
      },
      
      sidebar: [
        {
          text: '本体优先架构',
          collapsed: false,
          items: [
             {
              text: '引言',
              items: [
                { text: '语义困局', link: '/architecture/ontology-first#confusion' },
                { text: '哲学根源', link: '/architecture/ontology-first#philosophy' },
                { text: '核心特征一览', link: '/architecture/ontology-first#glance' }
              ]
            },
            {
              text: '范式转变',
              items: [
                { text: '活的架构', link: '/architecture/ontology-first#living-architecture' },
                { text: '对比数据治理', link: '/architecture/ontology-first#governance' },
                { text: '从理念到工程', link: '/architecture/ontology-first#value' },
                { text: '标杆实践Palantir', link: '/architecture/ontology-first#palantir' }
              ]
            },
            {
              text: '核心特征',
              items: [
                { text: '对象中心主义', link: '/architecture/ontology-first#object-centric' },
                { text: '显式逻辑与动作', link: '/architecture/ontology-first#logic-actions' },
                { text: '语义先于接口', link: '/architecture/ontology-first#semantic-first' },
                { text: '确定性 AI 闭环', link: '/architecture/ontology-first#ai-closed-loop' }
              ]
            },
            {
              text: '落地指引',
              items: [
                { text: '三层模型架构', link: '/architecture/ontology-first#layers' },
                { text: 'OFMM 成熟度模型', link: '/architecture/ontology-first#ofmm' },
                { text: '结语', link: '/architecture/ontology-first#conclusion' }
              ]
            }
          ]
        }
      ]
    }
  })
)
