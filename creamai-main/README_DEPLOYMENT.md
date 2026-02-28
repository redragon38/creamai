# 🚀 Déploiement CreaMI sur Vercel - Guide Rapide

## ⏱️ Déploiement en 5 minutes

### 1️⃣ Préparez votre code
```bash
cd creamai-main
bash test-before-deploy.sh
```

### 2️⃣ Poussez sur GitHub
```bash
git add .
git commit -m "chore: préparation déploiement Vercel"
git push origin main
```

### 3️⃣ Créez un compte Vercel
Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub

### 4️⃣ Importez le projet
1. Dashboard Vercel → **"Add New..."** → **"Project"**
2. Sélectionnez `creamai-main`
3. Cliquez **"Import"**

### 5️⃣ Configurez les variables d'environnement
Dans Vercel → **Project Settings** → **Environment Variables** :

```
NEXT_PUBLIC_API_URL = https://api.thecreamai.com
SITE_URL = https://thecreamai.com
NEXT_PUBLIC_BACKEND_URL = https://api.thecreamai.com
```

### 6️⃣ Déployez
Cliquez **"Deploy"** et attendez 2-5 minutes ✨

---

## 📚 Documentation complète

Pour une documentation détaillée :

- **📖 Guide complet** → [`DEPLOYMENT_VERCEL.md`](./DEPLOYMENT_VERCEL.md)
- **✅ Checklist pré-déploiement** → [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md)
- **🆘 Troubleshooting** → [`TROUBLESHOOTING_VERCEL.md`](./TROUBLESHOOTING_VERCEL.md)

---

## 🎯 Ce qui a été configuré

✅ **vercel.json** - Configuration Vercel
✅ **.vercelignore** - Fichiers à ignorer
✅ **next.config.js** - Optimisé pour Vercel
✅ **package.json** - Scripts de déploiement mis à jour
✅ **.env.example** - Variables d'environnement

---

## ⚠️ Points importants

| Point | Action |
|-------|--------|
| **Domaine** | Pointez vos DNS vers Vercel après déploiement |
| **Backend** | Déployez séparément ou utilisez votre API existante |
| **Variables d'env** | Ajoutez-les dans Vercel, pas dans `.env` local |
| **Images** | Assurez-vous que `tools.json` existe |

---

## 🔍 Vérifier que tout fonctionne

Après déploiement, vérifiez :

```bash
# 1. Page d'accueil
https://your-project.vercel.app/

# 2. Logs
Dashboard → Deployments → Logs

# 3. Performance
Onglet Console (F12) pour les erreurs

# 4. API
Vérifiez que les appels API réussissent
```

---

## 🆘 Problème ?

1. Consultez [`TROUBLESHOOTING_VERCEL.md`](./TROUBLESHOOTING_VERCEL.md)
2. Vérifiez les logs dans Vercel Dashboard
3. Exécutez `test-before-deploy.sh` localement
4. Contactez le support Vercel

---

## 💡 Commandes utiles

```bash
# Test local pré-déploiement
bash test-before-deploy.sh

# Setup complet avec Vercel CLI
bash setup-vercel.sh

# Afficher les fichiers de config
cat vercel.json
cat .vercelignore
cat frontend/.env.example
```

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Support:** https://vercel.com/support

---

**Prêt ? Commencez par `DEPLOYMENT_VERCEL.md` ! 🎉**
