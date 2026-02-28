# FluxMind - Product Requirements Document

## Project Overview
Landing page marketing pour FluxMind - une plateforme d'innovation IA.

## Original Problem Statement
Reproduire le projet FluxMind avec la même structure que sur GitHub (Next.js avec pages router).

## Tech Stack
- **Framework**: Next.js 14.1.0 (Pages Router)
- **UI**: React 18.2.0, Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Styling**: CSS Modules + Tailwind

## Project Structure
```
/app/frontend/
├── components/       # Composants React (Header, Footer, etc.)
├── lib/             # Utilitaires
├── pages/           # Pages Next.js (_app, _document, index)
├── public/          # Assets statiques (data, partners logos)
├── styles/          # Styles globaux (globals.css)
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Implemented Features
- [x] Hero Section avec dashboard preview
- [x] Features Section (Smart Automation, Predictive Insights, etc.)
- [x] Tools Section avec filtrage par catégorie et recherche
- [x] Pricing Section avec 3 plans (Basic, Business, Enterprise)
- [x] Header responsive avec navigation mobile
- [x] Footer avec liens sociaux et navigation

## Data
- tools.json contient les outils IA (NordVPN, Surfshark, ClickUp, Emergent)

## Completed: Feb 11, 2026

## Next Action Items
- Ajouter plus d'outils dans tools.json
- Implémenter les pages individuelles pour chaque outil
- Ajouter l'authentification utilisateur
