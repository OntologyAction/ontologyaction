import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    vite: {
      build: {
        chunkSizeWarningLimit: 3000, // 调高至 3MB，抹平警告
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/mermaid')) {
                return 'mermaid-engine' // 将巨型 Mermaid 独立打包，避免阻塞主逻辑
              }
            }
          }
        }
      }
    },
    // 必须配置 hostname，sitemap 才能生成正确的绝对路径
    // （sitemap.xml 的 XML 声明由构建脚本 fix-sitemap.js 统一修正）
    sitemap: {
      hostname: 'https://ontologyaction.com'
    },
    // 彻底关闭深色模式切换功能
    appearance: false,
    cleanUrls: true,

    // --- 顶层配置 ---
    title: 'OntologyAction',
    description:
      'Ontology-First Architecture, AI Execution Boundaries, OFMM — a practical methodology for AI-ready enterprise systems | 本体优先架构与 AI 执行边界方法论',

    head: [
      [
        'meta',
        {
          name: 'keywords',
          content:
            'Ontology-First Architecture, AI Execution Boundary, AI Execution Boundaries, OFMM, Ontology Templates, AI Governance, 本体优先, 本体优先架构, AI 执行边界, Palantir Ontology, 架构设计, 数字化转型, AI治理, 企业架构'
        }
      ],
      ['link', { rel: 'icon', href: '/favicon.ico' }] // 站点图标，提升搜索展示识别度
    ],

    // --- Mermaid 配置 (与 themeConfig 平级) ---
    mermaid: {
      theme: 'neutral'
    },

    // --- 主题配置 ---
    themeConfig: {
      nav: [
        { text: 'Framework', link: '/architecture/ontology-first' },
        { text: 'Methods', link: '/en/methods/ai-execution-boundaries' },
        { text: 'Assessment', link: '/assessment/ofmm' },
        { text: 'Models', link: '/models/ontology-templates' },
        { text: 'Insights', link: '/insights/' },
        { text: 'About', link: '/about' },
        {
          text: 'GitHub',
          items: [
            { text: 'GitHub 仓库', link: 'https://github.com/OntologyAction/ontologyaction' },
            { text: '参与讨论', link: 'https://github.com/orgs/OntologyAction/discussions' }
          ]
        }
      ],
      aside: false,
      footer: {
        message: '基于 CC BY-NC-ND 4.0 许可协议发布',
        copyright: `Copyright © 2024-${new Date().getFullYear()} 郑勇胜 (Yongsheng Zheng) | OntologyAction`
      },

      // sidebar 按路径分组：每个板块只显示自己的目录
      sidebar: {
        '/architecture/': [
          {
            text: 'Framework · 本体优先架构',
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
          },
          {
            text: '延伸',
            collapsed: false,
            items: [
              { text: 'Methods · AI Execution Boundaries', link: '/en/methods/ai-execution-boundaries' },
              { text: 'Assessment · OFMM', link: '/assessment/ofmm' }
            ]
          }
        ],
        '/methods/': [
          {
            text: 'Methods · 方法',
            collapsed: false,
            items: [
              { text: 'AI 执行边界', link: '/methods/ai-execution-boundaries' }
            ]
          },
          {
            text: '相关',
            collapsed: false,
            items: [
              { text: 'Framework · 本体优先架构', link: '/architecture/ontology-first' },
              { text: 'Insights', link: '/insights/' }
            ]
          }
        ],
        '/en/methods/': [
          {
            text: 'Methods',
            collapsed: false,
            items: [
              { text: 'AI Execution Boundaries', link: '/en/methods/ai-execution-boundaries' }
            ]
          },
          {
            text: 'Related',
            collapsed: false,
            items: [
              { text: 'Framework · Ontology-First Architecture', link: '/architecture/ontology-first' },
              { text: '中文版 · AI 执行边界', link: '/methods/ai-execution-boundaries' },
              { text: 'Insights', link: '/insights/' }
            ]
          }
        ],
        '/assessment/': [
          {
            text: 'Assessment · 评估',
            collapsed: false,
            items: [{ text: 'OFMM 成熟度模型', link: '/assessment/ofmm' }]
          },
          {
            text: '相关',
            collapsed: false,
            items: [{ text: 'Framework · 本体优先架构', link: '/architecture/ontology-first' }]
          }
        ],
        '/models/': [
          {
            text: 'Models · 语义资产',
            collapsed: false,
            items: [{ text: 'Ontology Templates 模板库', link: '/models/ontology-templates' }]
          },
          {
            text: '相关',
            collapsed: false,
            items: [{ text: 'Framework · 本体优先架构', link: '/architecture/ontology-first' }]
          }
        ],
        '/insights/': [
          {
            text: 'Insights · 文章',
            collapsed: false,
            items: [
              { text: '全部文章', link: '/insights/' },
              { text: 'When AI Can Act', link: '/insights/when-ai-can-act' }
            ]
          },
          {
            text: '相关',
            collapsed: false,
            items: [
              { text: 'Methods · English', link: '/en/methods/ai-execution-boundaries' },
              { text: '方法 · 中文', link: '/methods/ai-execution-boundaries' }
            ]
          }
        ]
      }
    }
  })
)
