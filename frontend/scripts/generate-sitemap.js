/**
 * ============================================================
 *  Thecreamai — Générateur de Sitemap XML
 * ============================================================
 *  Génère /public/sitemap.xml complet à chaque déploiement.
 *
 *  Pages couvertes :
 *    ✓ Pages statiques (accueil, comparatifs, outils, etc.)
 *    ✓ Pages dynamiques /tool/[id]        × tous les outils
 *    ✓ Pages dynamiques /outils/[category] × toutes les catégories
 *    ✓ Pages dynamiques /blog/[slug]      × tous les articles
 *
 *  Déclenché automatiquement via "postbuild" dans package.json
 * ============================================================
 */

const fs   = require('fs');
const path = require('path');

// ── Config ─────────────────────────────────────────────────────
const BASE_URL   = process.env.SITE_URL || 'https://thecreamai.com';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const TOOLS_PATH = path.join(PUBLIC_DIR, 'data', 'tools.json');
const OUT_PATH   = path.join(PUBLIC_DIR, 'sitemap.xml');
const TODAY      = new Date().toISOString().split('T')[0];

// ── Helpers ────────────────────────────────────────────────────

function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function safeReadJson(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch { return []; }
}

function urlBlock({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${BASE_URL}${loc}</loc>`,
    `    <lastmod>${lastmod || TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

// ── Construction des URLs ──────────────────────────────────────

function buildUrls(tools) {
  const urls = [];

  // 1. Pages statiques
  const staticPages = [
    { loc: '/',              changefreq: 'daily',   priority: '1.0' },
    { loc: '/comparatifs',   changefreq: 'daily',   priority: '0.9' },
    { loc: '/outils',        changefreq: 'daily',   priority: '0.9' },
    { loc: '/pourquoi-nous', changefreq: 'monthly', priority: '0.7' },
    { loc: '/newsletter',    changefreq: 'monthly', priority: '0.6' },
    { loc: '/contact',       changefreq: 'monthly', priority: '0.6' },
    { loc: '/blog',          changefreq: 'daily',   priority: '0.8' },
    { loc: '/temoignages',   changefreq: 'monthly', priority: '0.5' },
  ];
  urls.push(...staticPages);

  // 2. /tool/[id] — un outil = une URL
  for (const tool of tools) {
    urls.push({
      loc:        `/tool/${tool.id}`,
      lastmod:    tool.updatedAt || tool.createdAt || TODAY,
      changefreq: 'weekly',
      priority:   '0.9',
    });
  }

  // 3. /outils/[category] — une catégorie = une URL
  const categories = [...new Set(tools.flatMap(t => t.categories || []))];
  for (const cat of categories) {
    urls.push({
      loc:        `/outils/${slugify(cat)}`,
      changefreq: 'weekly',
      priority:   '0.8',
    });
  }

  // 4. /blog/[slug] — lit posts.json ou scanne le dossier pages/blog/
  const posts = safeReadJson(path.join(PUBLIC_DIR, 'data', 'posts.json'));
  if (posts.length > 0) {
    for (const post of posts) {
      if (post.slug) {
        urls.push({
          loc:        `/blog/${post.slug}`,
          lastmod:    post.updatedAt || post.publishedAt || TODAY,
          changefreq: 'monthly',
          priority:   '0.7',
        });
      }
    }
  } else {
    // Fallback : fichiers statiques dans pages/blog/
    const blogDir = path.join(__dirname, '..', 'pages', 'blog');
    if (fs.existsSync(blogDir)) {
      fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.js') && f !== 'index.js' && !f.startsWith('['))
        .forEach(f => urls.push({
          loc:        `/blog/${f.replace(/\.js$/, '')}`,
          changefreq: 'monthly',
          priority:   '0.7',
        }));
    }
  }

  return urls;
}

// ── Génération XML ─────────────────────────────────────────────

function generateSitemap() {
  console.log('\n🗺️  Génération du sitemap...\n');

  if (!fs.existsSync(TOOLS_PATH)) {
    console.warn(`⚠️  tools.json introuvable : ${TOOLS_PATH} — sitemap non généré.`);
    return;
  }

  const tools = JSON.parse(fs.readFileSync(TOOLS_PATH, 'utf8'));
  const urls  = buildUrls(tools);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset',
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
    '  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    '',
    urls.map(urlBlock).join('\n\n'),
    '',
    '</urlset>',
  ].join('\n');

  fs.writeFileSync(OUT_PATH, xml, 'utf8');

  const cats      = [...new Set(tools.flatMap(t => t.categories || []))];
  const blogCount = urls.length - 8 - tools.length - cats.length;

  console.log('  ✅ Sitemap généré avec succès !');
  console.log(`  📍 ${OUT_PATH}`);
  console.log(`  📊 ${urls.length} URLs au total :`);
  console.log(`     ├─ Pages statiques    : 8`);
  console.log(`     ├─ Outils /tool/      : ${tools.length}`);
  console.log(`     ├─ Catégories /outils/: ${cats.length}`);
  console.log(`     └─ Articles /blog/    : ${blogCount}`);
  console.log();
}

if (require.main === module) {
  try { generateSitemap(); }
  catch (err) { console.error('❌ Erreur :', err.message); process.exit(1); }
}

module.exports = generateSitemap;
