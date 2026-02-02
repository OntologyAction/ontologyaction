import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    // --- 顶层配置 ---
    title: "本体优先架构",
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
          text: '本体优先架构指南',
          items: [
            {
              text: '引言与背景',
              link: '/',
              items: [
                { text: '困惑：AI热潮与架构', link: '/#confusion' },
                { text: '根源：哲学与系统思维', link: '/#philosophy' },
                { text: '概览：核心特征一览', link: '/#glance' }
              ]
            },
            {
              text: '范式对比',
              items: [
                { text: '超越：活的架构', link: '/#living-architecture' },
                { text: '边界：对比数据治理', link: '/#governance' },
                { text: '价值：从理念到工程', link: '/#value' },
                { text: '标杆：Palantir实践', link: '/#palantir' }
              ]
            },
            {
              text: '四大核心特征',
              items: [
                { text: '对象中心主义', link: '/#object-centric' },
                { text: '显式逻辑与动作', link: '/#logic-actions' },
                { text: '语义先于接口', link: '/#semantic-first' },
                { text: '确定性 AI 闭环', link: '/#ai-closed-loop' }
              ]
            },
            {
              text: '落地指引',
              items: [
                { text: '三层模型架构', link: '/#layers' },
                { text: 'OFMM 成熟度模型', link: '/#ofmm' },
                { text: '结语：谨慎的乐观', link: '/#conclusion' }
              ]
            }
          ]
        }
      ]
    }
  })
)
