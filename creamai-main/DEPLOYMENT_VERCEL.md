# 🚀 Guide de Déploiement CreaMI sur Vercel

## 📋 Table des matières
1. [Prérequis](#prérequis)
2. [Configuration Vercel](#configuration-vercel)
3. [Variables d'environnement](#variables-denvironnement)
4. [Déploiement](#déploiement)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir :

- Un compte **GitHub** avec votre projet pushé
- Un compte **Vercel** (gratuit) sur [vercel.com](https://vercel.com)
- **Node.js** 16.x ou supérieur (localement)

---

## 🎯 Configuration Vercel

### Étape 1 : Connecter votre dépôt GitHub

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur **"Add New..."** → **"Project"**
3. Sélectionnez votre dépôt **creamai-main** depuis GitHub
4. Cliquez sur **"Import"**

### Étape 2 : Configuration du projet

Dans les paramètres du projet Vercel :

**Framework Preset:** `Next.js`

**Build Command:**
```bash
cd frontend && npm install && npm run build
```

**Output Directory:** 
```
frontend/.next
```

**Install Command:**
```bash
npm install
```

---

## 🔐 Variables d'environnement

### Dans Vercel Dashboard

1. Allez à **Project Settings** → **Environment Variables**
2. Ajoutez les variables suivantes pour **Tous les environnements** (Production, Preview, Development) :

| Variable | Valeur | Type |
|----------|--------|------|
| `NEXT_PUBLIC_API_URL` | `https://api.thecreamai.com` | Chaîne |
| `SITE_URL` | `https://thecreamai.com` | Chaîne |
| `NEXT_PUBLIC_BACKEND_URL` | `https://api.thecreamai.com` | Chaîne |

### Pour les variables sensibles (Backend API)

Si vous avez des tokens API ou clés secrètes :

| Variable | Valeur | Environnement |
|----------|--------|---|
| `DATABASE_URL` | *URL MongoDB complète* | Production |
| `MONGO_URL` | *URL MongoDB complète* | Production |
| `API_KEY` | *Votre clé API* | Production |

> **⚠️ Important:** Les variables avec le préfixe `NEXT_PUBLIC_` sont exposées au client. Ne mettez pas de secrets avec ce préfixe !

---

## 📤 Déploiement

### Méthode 1 : Déploiement automatique (Recommandé)

1. **Pushez votre code sur GitHub:**
```bash
git add .
git commit -m "chore: préparation pour déploiement Vercel"
git push origin main
```

2. **Vercel détectera automatiquement les changements** et lancera un déploiement
3. Vous verrez une **preview URL** générée automatiquement
4. Une fois testée, fusionnez vers `main` pour le déploiement production

### Méthode 2 : Déploiement manuel via CLI

```bash
# 1. Installer la CLI Vercel
npm i -g vercel

# 2. Se connecter à votre compte
vercel login

# 3. Déployer
cd creamai-main
vercel --prod
```

### Méthode 3 : Interface Web Vercel

1. Dans votre dashboard Vercel
2. Cliquez sur le projet
3. Allez à **Deployments**
4. Cliquez sur le bouton **"Deploy"** en haut à droite

---

## ✅ Vérifications post-déploiement

Après le déploiement, vérifiez que tout fonctionne :

### 1. URL de base
- [ ] La page d'accueil s'affiche correctement
- [ ] Le CSS et les images se chargent

### 2. Navigation
- [ ] Les liens internes fonctionnent
- [ ] Les routes dynamiques répondent

### 3. API Backend
- [ ] Les appels API réussissent (vérifiez les appels CORS)
- [ ] Les données se chargent correctement

### 4. Performance
- [ ] Vérifiez sur [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Vérifiez les Core Web Vitals

---

## 🐛 Troubleshooting

### Erreur : "Cannot find module"

**Solution:**
```bash
cd frontend
npm install
```

### Erreur : "tools.json not found"

**Solution:** 
```bash
# Créer le fichier par défaut
echo '[]' > frontend/public/data/tools.json
```

Ou assurez-vous que `public/data/tools.json` existe avant le déploiement.

### Erreur : "CORS issues"

**Solution:**
1. Vérifiez les en-têtes CORS dans `next.config.js`
2. Assurez-vous que votre backend accepte les requêtes depuis le domaine Vercel
3. Vérifiez `NEXT_PUBLIC_API_URL`

### Erreur : "Build timeout"

**Solution:**
1. Optimisez les images avec `npm run logos:force`
2. Supprimez les scripts inutiles du `postbuild`
3. Augmentez le timeout dans Vercel (Project Settings → Build & Development Settings)

### Erreur : "Cannot find .env file"

**Solution:**
Les variables d'environnement doivent être définies dans Vercel Dashboard, pas dans des fichiers `.env`. C'est normal qu'il n'existe pas en production.

### La page est vide ou 404

**Solution:**
1. Vérifiez que le répertoire `frontend` est correctement structuré
2. Vérifiez que `vercel.json` pointe vers le bon `outputDirectory`
3. Vérifiez les logs de build : Project → Deployments → Logs

---

## 📊 Structure du projet pour Vercel

```
creamai-main/
├── frontend/                 # ← Ceci sera déployé
│   ├── pages/
│   ├── components/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.example
├── backend/                  # ← Ne sera PAS déployé (API externe)
├── vercel.json              # ← Configuration Vercel
├── .vercelignore           # ← Fichiers à ignorer
└── ...
```

---

## 🔄 Pipeline CI/CD

Vercel crée automatiquement :

1. **Preview Deployment** - À chaque Pull Request
2. **Production Deployment** - À chaque push sur `main`

Vous pouvez voir l'historique dans :
- **Vercel Dashboard** → **Deployments**
- **GitHub** → **Pull Requests** (liens de preview)

---

## 🌐 Domaine personnalisé

1. Allez à **Project Settings** → **Domains**
2. Cliquez **"Add Domain"**
3. Entrez `thecreamai.com`
4. Suivez les instructions pour mettre à jour vos DNS

---

## 📈 Monitoring

Vercel fournit plusieurs outils :

- **Analytics:** Project → Analytics (Web Vitals, visites)
- **Logs:** Project → Deployments → Logs
- **Function Logs:** Pour les API serverless (si vous les utilisez)

---

## 🔐 Sécurité

✅ **Recommandations Vercel:**

1. **Protégez les secrets** - Utilisez les Environment Variables
2. **Activez les previews protégées** - Project Settings → Preview Deployment Protection
3. **Gérez les accès** - Team Settings → Members
4. **Monitorer les logs** - Vérifiez régulièrement les erreurs

---

## 📚 Ressources utiles

- [Documentation Vercel Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Support Vercel](https://vercel.com/support)

---

## ✨ Notes finales

- Le déploiement peut prendre **2-5 minutes**
- Vous recevrez des emails de confirmation
- Chaque déploiement crée une URL unique et traçable
- Les builds précédents restent accessibles pour rollback

**Bon déploiement ! 🎉**
