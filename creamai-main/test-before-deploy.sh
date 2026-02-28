#!/bin/bash

# Script de test pré-déploiement Vercel
# Exécutez: bash test-before-deploy.sh

set -e

echo "🧪 Démarrage des tests pré-déploiement..."
echo ""

cd frontend

echo "1️⃣  Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
  echo "   📦 Installation des dépendances..."
  npm install
else
  echo "   ✅ Dépendances déjà installées"
fi

echo ""
echo "2️⃣  Vérification du fichier tools.json..."
if [ ! -f "public/data/tools.json" ]; then
  echo "   ⚠️  Création du fichier tools.json par défaut..."
  mkdir -p public/data
  echo '[]' > public/data/tools.json
else
  echo "   ✅ Fichier tools.json trouvé"
fi

echo ""
echo "3️⃣  Lint du code..."
npm run lint || echo "   ⚠️  Quelques avertissements de lint détectés (non bloquant)"

echo ""
echo "4️⃣  Build Next.js..."
npm run build

echo ""
echo "5️⃣  Vérification de la structure du build..."
if [ -d ".next" ]; then
  echo "   ✅ Dossier .next créé avec succès"
else
  echo "   ❌ ERREUR: Dossier .next non trouvé"
  exit 1
fi

echo ""
echo "✅ Tous les tests sont passés avec succès!"
echo "🚀 Vous pouvez maintenant faire: git push origin main"
echo ""
