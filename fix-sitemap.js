import fs from 'node:fs'
import path from 'node:path'
const sitemapPath = path.resolve('docs/.vitepress/dist', 'sitemap.xml')
if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf-8')
  if (!content.startsWith('<?xml')) {
    fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n${content}`)
    console.log('✅ 外部脚本：sitemap.xml 修正成功')
  }
}