# ✅ Checklist Pré-Déploiement Vercel

## 🔍 Avant de commencer

- [ ] Vous avez un compte GitHub avec votre projet
- [ ] Vous avez un compte Vercel gratuit ou payant
- [ ] Vous êtes connecté à GitHub depuis Vercel
- [ ] Node.js 16+ est installé localement

---

## 📁 Vérification du projet

### Structure des fichiers
- [ ] Le dossier `frontend/` existe
- [ ] `frontend/package.json` existe
- [ ] `frontend/next.config.js` existe
- [ ] `frontend/pages/index.js` existe
- [ ] `frontend/public/data/tools.json` existe

### Fichiers Vercel
- [ ] `vercel.json` est présent à la racine ✓
- [ ] `.vercelignore` est présent à la racine ✓
- [ ] `.gitignore` est correctement configuré ✓

---

## 🛠️ Test local

Avant tout déploiement, exécutez :

```bash
bash test-before-deploy.sh
```

- [ ] Exécution sans erreurs
- [ ] Build `.next/` créé avec succès
- [ ] Pas d'erreurs de lint critiques

---

## 🔧 Configuration du code

### Next.js
- [ ] `next.config.js` optimisé pour Vercel ✓
- [ ] `package.json` à jour ✓
- [ ] Pas de dépendances Python en frontend
- [ ] Pas de scripts shell complexes

### Routes et pages
- [ ] Pas de chemins en dur (paths)
- [ ] Utilisez des chemins relatifs ou `process.cwd()`
- [ ] Les imports de fichiers utilisent `path.join()`

### Variables d'environnement
- [ ] `NEXT_PUBLIC_*` pour les variables publiques
- [ ] `.env.example` contient tous les secrets à ajouter
- [ ] `.env.local` est ignoré dans `.gitignore`
- [ ] Pas de secrets en dur dans le code

---

## 📊 Dépendances

- [ ] `npm audit` retourne pas de vulnérabilités critiques
- [ ] Toutes les dépendances sont à jour
  ```bash
  cd frontend && npm update
  ```
- [ ] `package-lock.json` est committé

---

## 🌐 Configuration API

- [ ] `NEXT_PUBLIC_API_URL` pointe vers le bon backend
- [ ] Les appels API utilisent les bonnes URLs
- [ ] Les headers CORS sont configurés
- [ ] Pas d'appels à `http://localhost:8000` en production

---

## 📷 Assets et images

- [ ] Toutes les images sont dans `public/`
- [ ] Les domaines d'images sont dans `next.config.js`
- [ ] Pas d'images relatives cassées
- [ ] Favicons sont présents dans `public/`

---

## 🔐 Sécurité

- [ ] Pas de clés API en dur dans le code
- [ ] Pas de tokens dans `.env` committé
- [ ] `robots.txt` est à jour
- [ ] Headers de sécurité sont configurés dans `next.config.js`

---

## 🚀 Déploiement sur Vercel

### Étape 1 : Préparer le code
```bash
git add .
git commit -m "chore: préparation déploiement Vercel"
git push origin main
```
- [ ] Tous les changements sont pushés

### Étape 2 : Connecter Vercel
- [ ] Allez sur https://vercel.com/dashboard
- [ ] Cliquez "Add New" → "Project"
- [ ] Sélectionnez le dépôt `creamai-main`
- [ ] Cliquez "Import"

### Étape 3 : Configuration dans Vercel

**Build settings:**
- [ ] Framework Preset: `Next.js`
- [ ] Build Command: `cd frontend && npm install && npm run build`
- [ ] Output Directory: `frontend/.next`
- [ ] Install Command: `npm install` (ou laisser vide)

**Environment Variables:**
Ajoutez ces variables dans **Environment Variables**:

```
NEXT_PUBLIC_API_URL = https://api.thecreamai.com
SITE_URL = https://thecreamai.com
NEXT_PUBLIC_BACKEND_URL = https://api.thecreamai.com
```

- [ ] Variables ajoutées dans Vercel Dashboard

### Étape 4 : Déployer
- [ ] Cliquez "Deploy"
- [ ] Attendez la fin du déploiement (2-5 minutes)
- [ ] Vérifiez que l'URL de production fonctionne

---

## ✅ Vérifications post-déploiement

### Fonctionnalité
- [ ] La page d'accueil charge correctement
- [ ] Les images s'affichent
- [ ] Le CSS est appliqué
- [ ] Les fonts sont correctes
- [ ] Les liens internes fonctionnent
- [ ] Les routes dynamiques répondent

### API
- [ ] Les appels API fonctionnent
- [ ] Les erreurs CORS n'apparaissent pas
- [ ] Les données se chargent depuis le backend

### Performance
- [ ] Pas d'erreurs console (F12)
- [ ] Les temps de chargement sont acceptables
- [ ] Les images se chargent rapidement

### SEO
- [ ] Les meta tags sont présents
- [ ] Le sitemap est accessible à `/sitemap.xml`
- [ ] `robots.txt` est présent et correct

---

## 📱 Test responsive

- [ ] Page d'accueil en mobile
- [ ] Page d'accueil en tablet
- [ ] Page d'accueil en desktop
- [ ] Navigation responsive fonctionne

---

## 🔄 Après le déploiement

- [ ] Mettez à jour votre DNS si vous utilisez un domaine personnalisé
- [ ] Testez le domaine personnalisé
- [ ] Configurez HTTPS (automatique avec Vercel)
- [ ] Activez les previews de PR si nécessaire

---

## 📊 Monitoring

- [ ] Accédez à **Vercel Dashboard** → **Analytics**
- [ ] Vérifiez les **Core Web Vitals**
- [ ] Activez les alertes de déploiement
- [ ] Gardez un œil sur les erreurs

---

## 🆘 En cas de problème

Si le déploiement échoue :

1. [ ] Consultez les logs : **Deployments** → **Logs**
2. [ ] Exécutez `test-before-deploy.sh` localement
3. [ ] Cherchez dans `TROUBLESHOOTING_VERCEL.md`
4. [ ] Vérifiez `DEPLOYMENT_VERCEL.md`
5. [ ] Contactez le support Vercel si nécessaire

---

## 🎉 Succès !

Si tout fonctionne :

- [ ] Partagez l'URL avec votre équipe
- [ ] Documentez tout changement spécifique
- [ ] Configurez les notifications GitHub
- [ ] Testez le processus de mise à jour

---

## 💾 Points de sauvegarde

Vercel sauvegarde automatiquement :
- [ ] Chaque déploiement reste accessible
- [ ] Vous pouvez revenir à une version antérieure
- [ ] Les logs sont conservés pendant 30 jours

---

## 📝 Notes personnalisées

Espace pour ajouter vos notes spécifiques au projet :

```
_________________________________

_________________________________

_________________________________

```

---

**Prêt ? Commencez le déploiement ! 🚀**

Pour des questions, consultez :
- 📖 `DEPLOYMENT_VERCEL.md`
- 🆘 `TROUBLESHOOTING_VERCEL.md`
