# 🆘 Guide de Résolution des Problèmes Vercel

## 🔴 Erreurs courantes et solutions

---

## ❌ Erreur : Build timeout (Dépassement du délai)

### Symptômes
- Le build prend plus de 45 minutes
- Message d'erreur : "Build timed out"

### Solutions

**1. Optimisez les images**
```bash
cd frontend
npm run logos -- --force
```

**2. Supprimez les scripts inutiles**
Modifiez `scripts/postbuild.js` pour qu'il soit minimal

**3. Augmentez le timeout (Plan Pro)**
- Accédez à **Project Settings** → **Build & Development Settings**
- Augmentez le timeout jusqu'à 3600 secondes

**4. Optimisez les dépendances**
```bash
# Vérifiez les dépendances inutiles
npm audit
npm prune
```

---

## ❌ Erreur : "Cannot find module 'next'"

### Symptômes
```
Error: Cannot find module 'next'
```

### Solutions

**1. Vérifiez le build command dans vercel.json**
```json
{
  "buildCommand": "cd frontend && npm install && npm run build"
}
```

**2. Nettoyez node_modules**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**3. Vérifiez Node.js version**
Dans **Project Settings** → **Environment** :
- Assurez-vous que `NODE_VERSION` est >= 16.8.0

---

## ❌ Erreur : "404 Not Found" sur la page d'accueil

### Symptômes
- La page d'accueil retourne 404
- Les autres routes fonctionnent

### Solutions

**1. Vérifiez le fichier pages/index.js**
```bash
# S'assurer que le fichier existe
ls -la frontend/pages/index.js
```

**2. Reconstruisez le projet**
```bash
cd frontend
npm run build
```

**3. Vérifiez vercel.json**
L'`outputDirectory` doit être : `frontend/.next`

---

## ❌ Erreur : "tools.json not found"

### Symptômes
```
Error: ENOENT: no such file or directory, open '...public/data/tools.json'
```

### Solutions

**1. Créez le fichier**
```bash
mkdir -p frontend/public/data
echo '[]' > frontend/public/data/tools.json
```

**2. Commitez le fichier**
```bash
git add frontend/public/data/tools.json
git commit -m "Add tools.json"
git push origin main
```

**3. Alternative : Gérez dynamiquement**
Modifiez `pages/index.js` pour créer le fichier s'il n'existe pas :
```javascript
const toolsPath = path.join(process.cwd(), 'public/data/tools.json');
if (!fs.existsSync(toolsPath)) {
  fs.writeFileSync(toolsPath, '[]');
}
```

---

## ❌ Erreur : CORS / API calls failing

### Symptômes
```
CORS error: Access-Control-Allow-Origin
```

### Solutions

**1. Vérifiez NEXT_PUBLIC_API_URL**
Dans Vercel Dashboard → **Environment Variables** :
```
NEXT_PUBLIC_API_URL=https://api.thecreamai.com
```

**2. Vérifiez les headers CORS dans next.config.js**
```javascript
{
  key: 'Access-Control-Allow-Origin',
  value: process.env.NEXT_PUBLIC_API_URL
}
```

**3. Utiliser des API Routes Next.js**
```javascript
// pages/api/proxy.js
export default function handler(req, res) {
  // Proxy vers votre API
}
```

---

## ❌ Erreur : Images ne se chargent pas

### Symptômes
- Images affichent une croix
- Console : `Failed to load image from...`

### Solutions

**1. Vérifiez les domaines autorisés**
Dans `next.config.js` :
```javascript
images: {
  domains: ['thecreamai.com', 'cdn.example.com']
}
```

**2. Utilisez des images locales**
Placez les images dans `public/images/` et utilisez :
```jsx
<Image src="/images/logo.png" alt="Logo" />
```

**3. Désactivez l'optimisation temporairement**
```javascript
images: {
  unoptimized: true // Seulement en development
}
```

---

## ❌ Erreur : "Memory limit exceeded"

### Symptômes
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
```

### Solutions

**1. Augmentez le memory limit (Plan Pro)**
En contact avec support Vercel

**2. Optimisez le build**
- Réduisez la taille des bundles
- Utilisez code splitting
- Supprimez les dépendances inutiles

**3. Divisez les routes**
```javascript
// pages/api/heavy-operation.js
export default async function handler(req, res) {
  // Traitement lourd
}
```

---

## ❌ Erreur : Environment variables not loading

### Symptômes
- `process.env.VARIABLE` retourne `undefined`
- Les variables privées ne sont pas accessibles

### Solutions

**1. Préfixez avec NEXT_PUBLIC_ pour le frontend**
```
NEXT_PUBLIC_API_URL=...  // Accessible au frontend
API_SECRET=...           // Seulement côté serveur
```

**2. Redéployez après ajout de variables**
Les variables ne sont chargées qu'au moment du build

**3. Vérifiez Vercel Dashboard**
Project → Settings → Environment Variables

---

## ❌ Erreur : "Dependency Conflict"

### Symptômes
```
npm ERR! peer dep missing
npm ERR! Could not resolve dependency
```

### Solutions

**1. Nettoyez les dépendances**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**2. Mettez à jour les dépendances**
```bash
npm update
```

**3. Vérifiez package.json**
Assurez-vous que les versions sont compatibles

---

## ❌ Erreur : "Deployment cancelled"

### Symptômes
- Déploiement s'arrête soudainement
- Aucun message d'erreur clair

### Solutions

**1. Vérifiez les webhooks GitHub**
GitHub → Settings → Webhooks → Vérifiez Vercel

**2. Vérifiez les permissions**
Vercel → Settings → Git Integrations → Réautorisez GitHub

**3. Redéployez manuellement**
```bash
npm i -g vercel
vercel --prod
```

---

## 📊 Debugging

### Lire les logs de build

1. Allez à Vercel Dashboard
2. Cliquez sur **Deployments**
3. Sélectionnez le déploiement échoué
4. Cliquez sur **Logs** pour voir les détails

### Logs utiles à chercher

```
❌ Error during build:
   - "Module not found"
   - "Cannot read property"
   - "ENOENT: no such file"
   - "SyntaxError"
   - "Memory limit exceeded"
```

---

## ✅ Vérification de santé

Avant de déployer, exécutez localement :

```bash
# Test complet
bash test-before-deploy.sh

# Ou manuellement
cd frontend
npm install
npm run lint
npm run build
```

---

## 📞 Besoin d'aide supplémentaire ?

- **Vercel Status:** https://www.vercelstatus.com/
- **Support Vercel:** https://vercel.com/support
- **GitHub Issues:** Ouvrez une issue dans votre dépôt
- **Documentation Next.js:** https://nextjs.org/docs

---

## 💡 Pro Tips

✅ **Gardez les commits clairs**
```bash
git commit -m "feat: add new feature" # Vercel crée des previews per commit
```

✅ **Utilisez les branches**
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# Vercel crée une preview URL automatiquement
```

✅ **Monitorer les performances**
```
Project → Analytics
```

✅ **Rollback facile**
```
Deployments → Sélectionnez une version antérieure → Redéployez
```

---

**Bonne chance ! 🚀**
