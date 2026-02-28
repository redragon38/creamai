import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ToolCard from '../../components/ToolCard';
import SEO from '../../components/SEO';
import { ChevronRight } from 'lucide-react';

function normalizeSlug(text) {
  return text.toLowerCase()
    .replace(/é/g,'e').replace(/è/g,'e').replace(/ê/g,'e')
    .replace(/à/g,'a').replace(/ù/g,'u').replace(/ô/g,'o')
    .replace(/ç/g,'c').replace(/ /g,'-');
}

const CATEGORY_META = {
  'Intelligence artificielle': {
    icon: '🤖', topBar: 'bg-violet-500', border: 'border-violet-200',
    badge: 'bg-violet-50 border-violet-200 text-violet-700',
    desc: 'Boostez votre productivité avec des outils IA de pointe.',
  },
  'Hébergement web': {
    icon: '🌐', topBar: 'bg-emerald-500', border: 'border-emerald-200',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    desc: 'Hébergez vos sites avec les meilleures plateformes.',
  },
  'VPN': {
    icon: '🛡️', topBar: 'bg-blue-500', border: 'border-blue-200',
    badge: 'bg-blue-50 border-blue-200 text-blue-700',
    desc: 'Sécurisez vos connexions et protégez votre vie privée.',
  },
  'Antivirus': {
    icon: '🦠', topBar: 'bg-red-500', border: 'border-red-200',
    badge: 'bg-red-50 border-red-200 text-red-700',
    desc: 'Protégez vos appareils contre les cybermenaces.',
  },
};

const FIXED_CATEGORIES = ['Intelligence artificielle', 'Hébergement web', 'VPN', 'Antivirus'];

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const categoryMap = {};
  FIXED_CATEGORIES.forEach(cat => { categoryMap[cat] = 0; });
  tools.forEach(tool => {
    (tool.categories || []).forEach(cat => {
      if (FIXED_CATEGORIES.includes(cat)) categoryMap[cat]++;
    });
  });
  return { props: { tools, categoryMap } };
}

export default function ToolsPage({ tools, categoryMap }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = tools.filter(tool => {
    const matchCat = activeCategory === 'all' || (tool.categories || []).includes(activeCategory);
    const matchSearch = !searchTerm ||
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tool.short || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <SEO
        title="Tous les outils — Thecreamai"
        description="Explorez tous les outils sélectionnés par Thecreamai : VPN, IA, hébergement, antivirus."
        canonical="https://thecreamai.com/outils"
      />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">

          {/* Hero */}
          <section className="py-20 bg-gradient-to-b from-purple-50 to-white border-b border-purple-100">
            <div className="container mx-auto px-6 text-center">
              <span className="inline-block bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                🛠️ Tous les outils
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 leading-tight">
                Découvrez les meilleurs outils
              </h1>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Sélectionnés et testés pour les créateurs, freelances et entrepreneurs.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-6 py-12 pb-24">

            {/* ── Catégories cards ── */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-5 text-gray-900">Parcourir par catégorie</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {FIXED_CATEGORIES.map(cat => {
                  const meta = CATEGORY_META[cat];
                  const slug = normalizeSlug(cat);
                  return (
                    <Link key={cat} href={`/outils/${slug}`}
                      className={`bg-white rounded-2xl overflow-hidden border-2 ${meta.border} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group select-none`}>
                      {/* Barre colorée */}
                      <div className={`h-1.5 w-full ${meta.topBar}`} />
                      <div className="p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${meta.badge} border flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          {meta.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-sm truncate">{cat}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{categoryMap[cat]} outil{categoryMap[cat] > 1 ? 's' : ''}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── Filtres + recherche ── */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
              <input
                type="text"
                placeholder="Rechercher un outil..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-sm bg-white border border-gray-200 rounded-xl px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 shadow-sm transition-all"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all select-none ${
                    activeCategory === 'all'
                      ? 'gradient-purple text-white shadow-md shadow-purple-300/40'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50'
                  }`}>
                  Tous ({tools.length})
                </button>
                {FIXED_CATEGORIES.map(cat => {
                  const meta = CATEGORY_META[cat];
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all select-none ${
                        activeCategory === cat
                          ? 'gradient-purple text-white shadow-md shadow-purple-300/40'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50'
                      }`}>
                      {meta.icon} {cat} ({categoryMap[cat]})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Grille outils ── */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Aucun outil trouvé.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
