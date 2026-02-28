#!/bin/bash

# Script pour préparer le déploiement Vercel

echo "🔨 Préparation du déploiement Vercel..."

# Créer les répertoires nécessaires s'ils n'existent pas
mkdir -p public/data

# Vérifier si tools.json existe
if [ ! -f "public/data/tools.json" ]; then
  echo "⚠️  Fichier tools.json manquant, création d'un fichier par défaut..."
  echo '[]' > public/data/tools.json
fi

echo "✅ Préparation complétée"
