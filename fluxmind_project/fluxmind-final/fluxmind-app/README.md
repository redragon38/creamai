# FluxMind - AI-Powered Innovation Platform

Une plateforme web moderne pour découvrir et explorer des outils AI, construite avec Next.js et React.

## 🎨 Design

Le projet est inspiré d'un design moderne avec :
- **Palette de couleurs** : Fond sombre (#0a0118) avec des accents violet/bleu (#6b46c1, #9333ea)
- **Effets visuels** : Gradients, glows, glassmorphism
- **Animation** : Transitions fluides et hover effects
- **Responsive** : Optimisé pour mobile, tablette et desktop

## 🚀 Fonctionnalités

### Version HTML Standalone
- ✅ Design moderne avec Tailwind CSS
- ✅ Chargement dynamique des outils depuis tools.json
- ✅ Système de filtrage par catégorie
- ✅ Recherche en temps réel
- ✅ Cards interactives avec hover effects
- ✅ Section pricing avec 3 plans
- ✅ Footer complet

### Version Next.js/React
- ✅ Architecture composants modulaires
- ✅ Gestion d'état avec React Hooks
- ✅ Routing avec Next.js
- ✅ Optimisation des performances
- ✅ SEO-friendly
- ✅ TypeScript ready

## 📁 Structure du Projet

```
fluxmind-app/
├── components/
│   ├── Header.js          # Navigation principale
│   ├── Footer.js          # Pied de page
│   └── ToolCard.js        # Carte d'outil
├── pages/
│   ├── _app.js           # Configuration Next.js
│   ├── _document.js      # HTML personnalisé
│   └── index.js          # Page d'accueil
├── public/
│   └── tools.json        # Données des outils
├── styles/
│   └── globals.css       # Styles globaux
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## 🛠️ Installation et Démarrage

### Version HTML (Simple)
1. Ouvrir `index.html` dans votre navigateur
2. Assurer que `tools.json` est dans le même dossier

### Version Next.js (Complète)

```bash
# Installation des dépendances
cd fluxmind-app
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build de production

```bash
npm run build
npm start
```

## 📊 Données - tools.json

Le fichier `tools.json` contient toutes les informations des outils :

```json
{
  "id": "tool-id",
  "name": "Tool Name",
  "categories": ["Category1", "Category2"],
  "short": "Description courte",
  "price": "Prix",
  "rating": {
    "value": 4.8,
    "count": 86
  },
  "verified": true,
  "trial": true
}
```

## 🎯 Sections Principales

### 1. Hero Section
- Titre accrocheur avec animation
- CTA boutons (Trial + Video)
- Dashboard avec statistiques

### 2. Features
- 6 cartes de fonctionnalités
- Icônes expressives
- Descriptions claires

### 3. Tools Directory
- Barre de recherche
- Filtres par catégorie
- Grille de cartes d'outils
- Système de notation
- Badges (Verified, Free Trial)

### 4. Pricing
- 3 plans tarifaires
- Plan "Popular" mis en avant
- Liste de fonctionnalités
- CTA sur chaque plan

### 5. Footer
- Liens organisés par sections
- Réseaux sociaux
- Copyright

## 🎨 Personnalisation

### Couleurs
Modifier dans `tailwind.config.js` ou `styles/globals.css` :
- Primaire : `#9333ea` (violet)
- Secondaire : `#6b46c1` (violet foncé)
- Fond : `#0a0118` (noir-bleu)

### Contenu
- Modifier `tools.json` pour ajouter/modifier des outils
- Éditer les composants dans `/components`
- Personnaliser les sections dans `pages/index.js`

## 📱 Responsive

- **Mobile** : < 768px (menu hamburger, grille 1 colonne)
- **Tablet** : 768px - 1024px (grille 2 colonnes)
- **Desktop** : > 1024px (grille 3 colonnes)

## ⚡ Performance

- Lazy loading des images
- Optimisation Tailwind CSS (purge des classes non utilisées)
- Code splitting avec Next.js
- Compression automatique en production

## 🔧 Technologies Utilisées

- **Next.js 14** - Framework React
- **React 18** - Bibliothèque UI
- **Tailwind CSS 3** - Framework CSS
- **JavaScript ES6+** - Langage
- **PostCSS** - Transformation CSS

## 📝 License

MIT License - Libre d'utilisation

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou suggestion, ouvrez une issue sur GitHub.

---

Fait avec ❤️ et ⚡ FluxMind
