import fs from 'node:fs'
import path from 'node:path'

// 修正路径：VitePress 默认输出到 docs/.vitepress/dist
const sitemapPath = path.resolve('docs/.vitepress/dist/sitemap.xml')

console.log('🚀 物理审计开始：检查路径', sitemapPath)

try {
  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf-8')
    if (!content.startsWith('<?xml')) {
      const fixedContent = `<?xml version="1.0" encoding="UTF-8"?>\n${content}`
      fs.writeFileSync(sitemapPath, fixedContent)
      console.log('✅ 物理主权：sitemap.xml 已成功注入 XML 声明')
      fs.writeFileSync(path.resolve('docs/.vitepress/dist', 'sitemap_v2.xml'), fixedContent)
      console.log('✅ 已生成副本 sitemap_v2.xml 用于穿透测试')
    } else {
      console.log('ℹ️ 逻辑检查：sitemap.xml 已存在声明，跳过')
    }
  } else {
    console.error('❌ 路径断裂：未找到 sitemap.xml，请检查 build 输出目录')
  }
} catch (err) {
  console.error('❌ 执行失败：', err.message)
}