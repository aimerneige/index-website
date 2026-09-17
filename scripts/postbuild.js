import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const rootDir = process.cwd();
const sitesYamlPath = path.join(rootDir, 'sites.yaml');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. 拷贝 sites.yaml 到 dist/
fs.copyFileSync(sitesYamlPath, path.join(distDir, 'sites.yaml'));
console.log('✓ Copied sites.yaml to dist/sites.yaml');

// 2. 解析 sites.yaml 并生成 sitemap.xml
let domain = 'www.aimer.moe';
try {
  const content = fs.readFileSync(sitesYamlPath, 'utf8');
  const parsed = load(content);
  if (parsed && parsed.meta && parsed.meta.domain) {
    domain = parsed.meta.domain;
  }
} catch (err) {
  console.warn('Warning: Failed to parse sites.yaml, falling back to default domain:', domain, err);
}

const baseUrl = `https://${domain}`;
const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent.trim() + '\n', 'utf8');
console.log(`✓ Generated dist/sitemap.xml (domain: ${domain}, lastmod: ${today})`);
