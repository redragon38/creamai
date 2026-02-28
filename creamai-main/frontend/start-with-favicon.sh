#!/bin/bash

echo "🚀 Démarrage de Thecreamai avec Favicon corrigé"
echo "================================================"
echo ""

# Aller dans le dossier frontend
cd "$(dirname "$0")"

# Vérifier que les fichiers favicon existent
echo "✅ Vérification des fichiers favicon..."
files=("public/favicon.ico" "public/favicon-16x16.png" "public/favicon-32x32.png" "public/apple-touch-icon.png")
all_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file existe"
    else
        echo "   ✗ $file MANQUANT!"
        all_exist=false
    fi
done

if [ "$all_exist" = false ]; then
    echo ""
    echo "❌ Certains fichiers favicon sont manquants!"
    echo "   Veuillez vérifier le dossier public/"
    exit 1
fi

echo ""
echo "✅ Tous les fichiers favicon sont présents"
echo ""

# Nettoyer le cache Next.js
if [ -d ".next" ]; then
    echo "🧹 Nettoyage du cache Next.js..."
    rm -rf .next
    echo "   ✓ Cache supprimé"
    echo ""
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

echo "🎯 Instructions importantes:"
echo "─────────────────────────────"
echo ""
echo "1. Après le démarrage, ouvrez: http://localhost:3000"
echo ""
echo "2. Si vous voyez encore un 'L' au lieu du logo violet:"
echo "   • Videz le cache: Ctrl+Shift+Delete (ou Cmd+Shift+Delete sur Mac)"
echo "   • Sélectionnez 'Images et fichiers en cache'"
echo "   • Cliquez sur 'Effacer les données'"
echo "   • Rechargez avec: Ctrl+F5 (ou Cmd+Shift+R sur Mac)"
echo ""
echo "3. Test rapide: Ouvrez en navigation privée (Ctrl+Shift+N)"
echo ""
echo "4. Page de diagnostic: http://localhost:3000/test-favicon.html"
echo ""
echo "─────────────────────────────"
echo ""
echo "🚀 Démarrage du serveur..."
echo ""

# Démarrer le serveur
npm run dev
