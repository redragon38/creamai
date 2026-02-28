#!/bin/bash

# Script de configuration Vercel
# Usage: bash setup-vercel.sh

set -e

echo "🚀 Configuration Vercel pour CreaMI"
echo "===================================="
echo ""

# Vérifier si Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
else
    echo "✅ Vercel CLI déjà installé"
fi

echo ""
echo "🔑 Connexion à Vercel..."
vercel login

echo ""
echo "📁 Vérification de la structure du projet..."

# Vérifier les fichiers importants
if [ ! -d "frontend" ]; then
    echo "❌ ERREUR: Dossier 'frontend' non trouvé"
    exit 1
fi

if [ ! -f "frontend/package.json" ]; then
    echo "❌ ERREUR: frontend/package.json non trouvé"
    exit 1
fi

if [ ! -f "vercel.json" ]; then
    echo "❌ ERREUR: vercel.json non trouvé"
    exit 1
fi

echo "✅ Structure du projet correcte"

echo ""
echo "📦 Installation des dépendances..."
cd frontend
npm install
cd ..

echo ""
echo "🧪 Test du build..."
cd frontend
npm run build
cd ..

echo ""
echo "✅ Test du build réussi"

echo ""
echo "🚀 Déploiement sur Vercel..."
vercel --prod

echo ""
echo "✨ Déploiement complété!"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Vérifiez votre URL de déploiement"
echo "2. Testez toutes les pages"
echo "3. Configurez votre domaine personnalisé"
echo "4. Mettez à jour les variables d'environnement si nécessaire"
echo ""
