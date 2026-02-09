import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    // 核心补丁：使用动态导入绕过 ts(6133) 和类型报错
    async buildEnd({ outDir }) {
      const fs = await import('node:fs')
      const path = await import('node:path')
      const sitemapPath = path.resolve(outDir, 'sitemap.xml')

      // 强制等待 2 秒，确保 VitePress 已经把 sitemap 文件写入磁盘
      await new Promise(resolve => setTimeout(resolve, 2000))

      if (fs.existsSync(sitemapPath)) {
        const content = fs.readFileSync(sitemapPath, 'utf-8')
        if (!content.startsWith('<?xml')) {
          fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n${content}`)
          console.log('✅ 逻辑补丁：已成功修正 sitemap.xml 声明')
        }
      } else {
        console.warn('❌ 逻辑断裂：未能捕获 sitemap.xml，请检查 hostname 配置')
      }
    },
  vite: {
  build: {
    chunkSizeWarningLimit: 3000, // 调高至 3MB，抹平警告
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/mermaid')) {
            return 'mermaid-engine'; // 将巨型 Mermaid 独立打包，避免阻塞主逻辑
          }
        }
      }
    }
  }
},
          // 1. 必须配置 hostname，sitemap 才能生成正确的绝对路径
      sitemap: {
        hostname: 'https://ontologyaction.com' 
      },
    // 核心指令：彻底关闭深色模式切换功能
  appearance: false,
    cleanUrls: true,
    // --- 顶层配置 ---
    title: "OntologyAction",
    description: "本体优先架构 (Ontology-First Architecture)",

    head: [
      ['meta', { name: 'keywords', ontent: '本体优先, Palantir Ontology, 架构设计, 数字化转型, AI治理, Ontology-First, 企业架构' }],
      ['link', { rel: 'icon', href: '/favicon.ico' }] // 增加站点图标，提升搜索展示识别度
    ],

    // --- Mermaid 配置 (与 themeConfig 平级) ---
    mermaid: {
      theme: 'neutral', 
    },

    // --- 主题配置 ---
    themeConfig: {

       nav: [
      { text: '关于作者', link: '/about' },
      { 
        text: '外部链接', 
        items: [
          { text: 'GitHub 仓库', link: 'https://github.com/OntologyAction/ontologyaction' },
          { text: '参与讨论', link: 'https://github.com/orgs/OntologyAction/discussions' }
        ]
      }
    ],
      aside: false, 
      footer: {
        message: '基于 CC BY-NC-ND 4.0 许可协议发布',
        // 这里可以统一署名，确立全站版权主权
        copyright: `Copyright © 2024-${new Date().getFullYear()} 郑勇胜 (Yongsheng Zheng) | OntologyAction`
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
        },
        {
          text: '其他',
          collapsed: false,
          items: [
             {
              text: '关于作者',
              link: '/about'
            }
          ]
        }

      ]
    }
  })
)
