@echo off
echo.
echo ============================================================
echo 🚀 Demarrage de Thecreamai avec Favicon corrige
echo ============================================================
echo.

cd /d "%~dp0"

echo ✅ Verification des fichiers favicon...
set all_exist=1

if exist "public\favicon.ico" (
    echo    ✓ public\favicon.ico existe
) else (
    echo    ✗ public\favicon.ico MANQUANT!
    set all_exist=0
)

if exist "public\favicon-16x16.png" (
    echo    ✓ public\favicon-16x16.png existe
) else (
    echo    ✗ public\favicon-16x16.png MANQUANT!
    set all_exist=0
)

if exist "public\favicon-32x32.png" (
    echo    ✓ public\favicon-32x32.png existe
) else (
    echo    ✗ public\favicon-32x32.png MANQUANT!
    set all_exist=0
)

if exist "public\apple-touch-icon.png" (
    echo    ✓ public\apple-touch-icon.png existe
) else (
    echo    ✗ public\apple-touch-icon.png MANQUANT!
    set all_exist=0
)

if %all_exist%==0 (
    echo.
    echo ❌ Certains fichiers favicon sont manquants!
    echo    Veuillez verifier le dossier public\
    pause
    exit /b 1
)

echo.
echo ✅ Tous les fichiers favicon sont presents
echo.

if exist ".next" (
    echo 🧹 Nettoyage du cache Next.js...
    rmdir /s /q .next 2>nul
    echo    ✓ Cache supprime
    echo.
)

if not exist "node_modules" (
    echo 📦 Installation des dependances...
    call npm install
    echo.
)

echo 🎯 Instructions importantes:
echo ─────────────────────────────
echo.
echo 1. Apres le demarrage, ouvrez: http://localhost:3000
echo.
echo 2. Si vous voyez encore un 'L' au lieu du logo violet:
echo    • Videz le cache: Ctrl+Shift+Delete
echo    • Selectionnez 'Images et fichiers en cache'
echo    • Cliquez sur 'Effacer les donnees'
echo    • Rechargez avec: Ctrl+F5
echo.
echo 3. Test rapide: Ouvrez en navigation privee (Ctrl+Shift+N)
echo.
echo 4. Page de diagnostic: http://localhost:3000/test-favicon.html
echo.
echo ─────────────────────────────
echo.
echo 🚀 Demarrage du serveur...
echo.

call npm run dev
