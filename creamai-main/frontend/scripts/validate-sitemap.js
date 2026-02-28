const fs = require('fs');
const path = require('path');

/**
 * Script de validation du sitemap.xml
 * Vérifie la structure et la validité du sitemap généré
 */

function validateSitemap() {
  console.log('🔍 Validation du sitemap.xml...\n');
  
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  
  // Vérifier que le fichier existe
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Erreur : sitemap.xml n\'existe pas');
    console.log('💡 Générez-le avec : npm run sitemap');
    process.exit(1);
  }
  
  // Lire le contenu
  const content = fs.readFileSync(sitemapPath, 'utf8');
  
  // Vérifications basiques
  const checks = [
    {
      name: 'Déclaration XML',
      test: content.includes('<?xml version="1.0" encoding="UTF-8"?>'),
      fix: 'Le fichier doit commencer par la déclaration XML'
    },
    {
      name: 'Namespace urlset',
      test: content.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
      fix: 'Le namespace doit être correctement déclaré'
    },
    {
      name: 'URLs présentes',
      test: content.includes('<loc>'),
      fix: 'Le sitemap doit contenir au moins une URL'
    },
    {
      name: 'Balises fermées',
      test: content.includes('</urlset>'),
      fix: 'La balise urlset doit être fermée'
    },
    {
      name: 'HTTPS',
      test: content.includes('https://'),
      fix: 'Les URLs doivent être en HTTPS'
    }
  ];
  
  let valid = true;
  let passed = 0;
  
  checks.forEach(check => {
    if (check.test) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`❌ ${check.name}`);
      console.log(`   💡 ${check.fix}\n`);
      valid = false;
    }
  });
  
  // Compter les URLs
  const urlMatches = content.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  console.log(`\n📊 Statistiques :`);
  console.log(`   - Tests réussis : ${passed}/${checks.length}`);
  console.log(`   - URLs trouvées : ${urlCount}`);
  console.log(`   - Taille du fichier : ${(content.length / 1024).toFixed(2)} KB`);
  
  // Vérifier la taille (limite Google : 50MB, 50k URLs)
  if (urlCount > 50000) {
    console.log(`\n⚠️  Attention : Plus de 50 000 URLs (limite Google)`);
    console.log(`   💡 Envisagez d'utiliser un index de sitemaps`);
  }
  
  if (content.length > 52428800) { // 50 MB
    console.log(`\n⚠️  Attention : Fichier supérieur à 50 MB (limite Google)`);
    console.log(`   💡 Divisez le sitemap en plusieurs fichiers`);
  }
  
  // Afficher les premières URLs pour vérification
  console.log(`\n📄 Aperçu des URLs (premières 5) :`);
  const locMatches = content.match(/<loc>(.*?)<\/loc>/g);
  if (locMatches) {
    locMatches.slice(0, 5).forEach(loc => {
      const url = loc.replace(/<\/?loc>/g, '');
      console.log(`   - ${url}`);
    });
    if (locMatches.length > 5) {
      console.log(`   ... et ${locMatches.length - 5} autres`);
    }
  }
  
  if (valid) {
    console.log(`\n✅ Sitemap valide !`);
    console.log(`📍 Emplacement : ${sitemapPath}`);
    console.log(`🌐 URL de production : https://thecreamai.com/sitemap.xml\n`);
  } else {
    console.log(`\n❌ Le sitemap contient des erreurs`);
    console.log(`💡 Régénérez-le avec : npm run sitemap\n`);
    process.exit(1);
  }
}

// Exécuter la validation
if (require.main === module) {
  validateSitemap();
}

module.exports = validateSitemap;
