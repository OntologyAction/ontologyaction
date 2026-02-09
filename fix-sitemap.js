import fs from 'node:fs'
import path from 'node:path'

const sitemapPath = path.resolve('docs/.vitepress/dist/sitemap.xml')

console.log('🚀 物理审计开始：检查路径', sitemapPath)

try {
  if (fs.existsSync(sitemapPath)) {
    let content = fs.readFileSync(sitemapPath, 'utf-8')
    
    // 1. 彻底清洗：移除所有已存在的声明和首尾空白，让内容回归纯粹的 <urlset>
    content = content.replace(/^[\s\S]*?(?=<urlset)/, '').trim();
    
    // 2. 强行构造：确保声明与 urlset 之间只有一个换行
    // 在开头显式注入标准声明
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const timestamp = `\n`; 
    
    const fixedContent = xmlHeader + content + timestamp;
    
    // 3. 物理写回：强制 UTF-8 编码
    fs.writeFileSync(sitemapPath, fixedContent, 'utf-8')
    
    console.log('✅ 物理主权：sitemap.xml 已被强制重置并焊接 XML 声明')
  }
} catch (err) {
  console.error('❌ 执行失败：', err.message)
}
