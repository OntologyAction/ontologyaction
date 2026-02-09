import fs from 'node:fs'
import path from 'node:path'

const sitemapPath = path.resolve('docs/.vitepress/dist/sitemap.xml')

console.log('🚀 物理审计开始：检查路径', sitemapPath)

try {
  if (fs.existsSync(sitemapPath)) {
    let content = fs.readFileSync(sitemapPath, 'utf-8')
    
    // --- 移除旧声明（如果存在），确保逻辑纯净 ---
    content = content.replace(/^<\?xml.*\?>\n?/, '') 
    
    // --- 强制注入：声明 + 内容 + 时间戳 ---
    const timestamp = `<!-- Build: ${new Date().toLocaleString()} -->`; 
    const fixedContent = `<?xml version="1.0" encoding="UTF-8"?>\n${content}\n${timestamp}`;
    
    fs.writeFileSync(sitemapPath, fixedContent)
    
    // --- 同步生成 v2 以供对比 ---
    fs.writeFileSync(path.resolve('docs/.vitepress/dist', 'sitemap_v2.xml'), fixedContent)
    
    console.log('✅ 物理主权：sitemap.xml 已被强制重写并注入时间戳')
  } else {
    console.error('❌ 路径断裂：未找到 sitemap.xml')
  }
} catch (err) {
  console.error('❌ 执行失败：', err.message)
}
