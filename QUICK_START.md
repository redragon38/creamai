# 🚀 QUICK START - Déployer CreaMI sur Vercel en 10 minutes

> **Estimated time: 10 minutes** ⏱️

## Step 1️⃣ - Préparation locale (2 min)

```bash
cd creamai-main
bash test-before-deploy.sh
```

Attendez que tout passe (✅ Tous les tests réussis).

## Step 2️⃣ - Push sur GitHub (1 min)

```bash
git add .
git commit -m "chore: config Vercel"
git push origin main
```

## Step 3️⃣ - Créer un compte Vercel (2 min)

1. Allez sur https://vercel.com/signup
2. Cliquez "Continue with GitHub"
3. Autorisez Vercel à accéder à votre GitHub

## Step 4️⃣ - Importer le projet (2 min)

1. Vous êtes redirigé vers le dashboard
2. Cliquez **"Add New..."** → **"Project"**
3. Trouvez et sélectionnez **`creamai-main`**
4. Cliquez **"Import"**

## Step 5️⃣ - Configurer les variables (2 min)

Dans l'écran de configuration qui s'affiche :

**Framework Preset:** Assurez-vous que `Next.js` est sélectionné ✓

**Puis, cliquez sur "Environment Variables" et ajoutez :**

```
NEXT_PUBLIC_API_URL = https://api.thecreamai.com
SITE_URL = https://thecreamai.com
NEXT_PUBLIC_BACKEND_URL = https://api.thecreamai.com
```

## Step 6️⃣ - Déployer (1 min)

Cliquez le gros bouton **"Deploy"** bleu et attendez ✨

---

## ✅ Vous êtes fini !

Dans 2-5 minutes, vous recevrez une URL :
```
https://creamai-main.vercel.app
```

### Tester le déploiement

1. Cliquez sur l'URL
2. Vérifiez que la page s'affiche
3. Vérifiez la console (F12) pour les erreurs

---

## 📌 Si quelque chose ne fonctionne pas

1. Vérifiez les logs : **Dashboard** → **Deployments** → **Logs**
2. Consultez [`TROUBLESHOOTING_VERCEL.md`](./creamai-main/TROUBLESHOOTING_VERCEL.md)
3. Exécutez `bash test-before-deploy.sh` à nouveau

---

## 🎯 Prochaines étapes (optionnel)

### Ajouter un domaine personnalisé
```
Dashboard → Project Settings → Domains
```

### Activer les previews de Pull Requests
```
C'est déjà activé par défaut !
```

### Configurer les notifications
```
Team Settings → Notifications
```

---

## 📚 Pour plus d'informations

- 📖 [`DEPLOYMENT_VERCEL.md`](./creamai-main/DEPLOYMENT_VERCEL.md) - Guide complet
- ✅ [`DEPLOYMENT_CHECKLIST.md`](./creamai-main/DEPLOYMENT_CHECKLIST.md) - Checklist détaillée
- 🆘 [`TROUBLESHOOTING_VERCEL.md`](./creamai-main/TROUBLESHOOTING_VERCEL.md) - Résoudre les problèmes

---

## ⚡ Commandes utiles

```bash
# Tester avant déploiement
bash creamai-main/test-before-deploy.sh

# Voir la structure du projet
ls -la creamai-main/

# Voir les fichiers de config Vercel
cat creamai-main/vercel.json
cat creamai-main/.vercelignore
```

---

**C'est tout ! Votre application est maintenant live ! 🎉**

> Pour des mises à jour : il suffit de `git push origin main`
> Vercel détectera les changements et redéploiera automatiquement
