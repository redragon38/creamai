/**
 * Hook post-build Next.js
 * Appelé automatiquement par npm après chaque "npm run build"
 * grâce au script "postbuild" dans package.json.
 */
const generateSitemap = require('./generate-sitemap');

console.log('\n🚀 Post-build : génération du sitemap...');
try {
  generateSitemap();
} catch (err) {
  console.error('❌ Erreur post-build sitemap :', err.message);
  process.exit(1);
}
