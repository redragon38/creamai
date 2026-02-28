import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ToolCard from '../../components/ToolCard';
import SEO from '../../components/SEO';
import { Grid3X3, ChevronRight } from 'lucide-react';

// Fonction utilitaire pour normaliser les slugs (enlever accents)
function normalizeSlug(text) {
  return text.toLowerCase()
    .replace(/é/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/à/g, 'a')
    .replace(/ù/g, 'u')
    .replace(/ô/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ /g, '-');
}

// Icônes et couleurs par catégorie
const CATEGORY_META = {
  'Intelligence artificielle': {
    icon: '🤖',
    color: 'from-purple-600 to-violet-500',
    glow: 'rgba(168,85,247,0.15)',
    border: 'border-purple-500/30',
    bg: 'bg-purple-900/20',
    text: 'text-purple-300',
    desc: 'Boostez votre productivité avec des outils IA de pointe pour créateurs et entrepreneurs.',
  },
  'Hébergement web': {
    icon: '🌐',
    color: 'from-emerald-600 to-teal-500',
    glow: 'rgba(16,185,129,0.15)',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-900/20',
    text: 'text-emerald-300',
    desc: 'Hébergez vos sites et applications web avec les meilleures plateformes du marché.',
  },
  'VPN': {
    icon: '🛡️',
    color: 'from-blue-600 to-cyan-500',
    glow: 'rgba(59,130,246,0.15)',
    border: 'border-blue-500/30',
    bg: 'bg-blue-900/20',
    text: 'text-blue-300',
    desc: 'Protégez votre vie privée et sécurisez vos connexions avec les meilleurs VPN du marché.',
  },
  'Antivirus': {
    icon: '🦠',
    color: 'from-red-600 to-orange-500',
    glow: 'rgba(239,68,68,0.15)',
    border: 'border-red-500/30',
    bg: 'bg-red-900/20',
    text: 'text-red-300',
    desc: 'Protégez vos appareils contre les virus, malwares et cybermenaces avec les meilleures solutions du marché.',
  },
  'default': {
    icon: '🛠️',
    color: 'from-pink-600 to-purple-500',
    glow: 'rgba(236,72,153,0.15)',
    border: 'border-pink-500/30',
    bg: 'bg-pink-900/20',
    text: 'text-pink-300',
    desc: 'Découvrez les meilleurs outils sélectionnés pour votre activité.',
  },
};

// Les 3 catégories affichées (ordre fixe)
const FIXED_CATEGORIES = ['Intelligence artificielle', 'Hébergement web', 'VPN', 'Antivirus'];

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Construire les catégories avec leur comptage — uniquement les 3 catégories fixes
  const categoryMap = {};
  FIXED_CATEGORIES.forEach(cat => { categoryMap[cat] = 0; });
  tools.forEach(tool => {
    (tool.categories || []).forEach(cat => {
      if (FIXED_CATEGORIES.includes(cat)) {
        categoryMap[cat]++;
      }
    });
  });

  return {
    props: { tools, categoryMap },
  };
}

export default function ToolsPage({ tools, categoryMap }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const categories = FIXED_CATEGORIES;

  const filtered = tools.filter(tool => {
    const matchCat = activeCategory === 'all' || (tool.categories || []).includes(activeCategory);
    const matchSearch =
      !searchTerm ||
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.short || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <SEO
        title="Tous les outils – TheCreamAI"
        description="Explorez tous les outils IA sélectionnés par TheCreamAI : VPN, intelligence artificielle, productivité et plus encore."
        canonical="https://thecreamai.com/outils"
      />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* ── HERO ── */}
          <section className="relative py-24 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-900/20 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-6 relative z-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-900/30 border border-purple-700/40 px-4 py-1.5 rounded-full mb-6">
                🛠️ Tous les outils
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Découvrez les meilleurs{' '}
                <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                  outils IA
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Sélectionnés et testés pour les créateurs, freelances et entrepreneurs.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-6 pb-32">

            {/* ── CATÉGORIES CARDS ── */}
            <div className="mb-16">
              <h2 className="text-xl font-bold mb-6 text-white">Parcourir par catégorie</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map(cat => {
                  const meta = CATEGORY_META[cat] || CATEGORY_META['default'];
                  const slug = normalizeSlug(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/outils/${slug}`}
                      className={`gradient-card rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300 group`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {meta.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-sm truncate">{cat}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{categoryMap[cat]} outil{categoryMap[cat] > 1 ? 's' : ''}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors ml-auto flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── FILTRES + RECHERCHE ── */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <input
                type="text"
                placeholder="Rechercher un outil..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-sm bg-[#110822]/80 border border-purple-500/30 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 transition-all"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === 'all'
                      ? 'gradient-purple text-white shadow-lg shadow-purple-500/40'
                      : 'bg-[#110822]/80 border border-purple-500/30 text-gray-300 hover:border-purple-500/60'
                  }`}
                >
                  Tous ({tools.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat
                        ? 'gradient-purple text-white shadow-lg shadow-purple-500/40'
                        : 'bg-[#110822]/80 border border-purple-500/30 text-gray-300 hover:border-purple-500/60'
                    }`}
                  >
                    {cat} ({categoryMap[cat]})
                  </button>
                ))}
              </div>
            </div>

            {/* ── GRILLE OUTILS ── */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map(tool => (
                  <ToolCard key={tool.id} tool={tool} onSelect={() => {}} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Aucun outil trouvé.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
