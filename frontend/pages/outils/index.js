import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ToolCard from '../../components/ToolCard';
import SEO from '../../components/SEO';
import { ChevronRight, Search } from 'lucide-react';

function normalizeSlug(text) {
  return text.toLowerCase()
    .replace(/é/g,'e').replace(/è/g,'e').replace(/ê/g,'e')
    .replace(/à/g,'a').replace(/ù/g,'u').replace(/ô/g,'o')
    .replace(/ç/g,'c').replace(/ /g,'-');
}

const CATEGORY_META = {
  'Intelligence artificielle': { icon: '🤖', topBar: 'bg-violet-500', border: 'border-violet-200', badge: 'bg-violet-50 border-violet-200 text-violet-700', desc: 'Boostez votre productivité' },
  'Hébergement web':           { icon: '🌐', topBar: 'bg-emerald-500', border: 'border-emerald-200', badge: 'bg-emerald-50 border-emerald-200 text-emerald-700', desc: 'Hébergez vos projets' },
  'VPN':                       { icon: '🛡️', topBar: 'bg-blue-500', border: 'border-blue-200', badge: 'bg-blue-50 border-blue-200 text-blue-700', desc: 'Sécurisez vos connexions' },
  'Antivirus':                 { icon: '🦠', topBar: 'bg-red-500', border: 'border-red-200', badge: 'bg-red-50 border-red-200 text-red-700', desc: 'Protégez vos appareils' },
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
          <section className="py-12 sm:py-20 bg-gradient-to-b from-purple-50 to-white border-b border-purple-100">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <span className="inline-block bg-white border border-purple-200 text-purple-700 px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-sm">
                🛠️ Tous les outils
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">
                Découvrez les meilleurs outils
              </h1>
              <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto px-2">
                Sélectionnés et testés pour les créateurs, freelances et entrepreneurs.
              </p>
            </div>
          </section>

          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-16 sm:pb-24">

            {/* Catégories cards */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5 text-gray-900">Parcourir par catégorie</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {FIXED_CATEGORIES.map(cat => {
                  const meta = CATEGORY_META[cat];
                  const slug = normalizeSlug(cat);
                  return (
                    <Link key={cat} href={`/outils/${slug}`}
                      className={`bg-white rounded-2xl overflow-hidden border-2 ${meta.border} hover:shadow-lg transition-all duration-300 group select-none min-h-[72px]`}>
                      <div className={`h-1.5 w-full ${meta.topBar}`} />
                      <div className="p-3 sm:p-5 flex items-center gap-3 sm:gap-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${meta.badge} border flex items-center justify-center text-xl sm:text-2xl flex-shrink-0`}>
                          {meta.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">{cat}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{categoryMap[cat]} outil{categoryMap[cat] > 1 ? 's' : ''}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0 hidden sm:block" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Filtres + recherche */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Rechercher un outil..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 shadow-sm transition-all text-base"
                />
              </div>
              {/* Filtres — scroll horizontal sur mobile */}
              <div className="scroll-x-mobile gap-2 sm:flex sm:flex-wrap sm:gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all select-none whitespace-nowrap min-h-[40px] ${
                    activeCategory === 'all'
                      ? 'gradient-purple text-white shadow-md shadow-purple-300/40'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700'
                  }`}>
                  Tous ({tools.length})
                </button>
                {FIXED_CATEGORIES.map(cat => {
                  const meta = CATEGORY_META[cat];
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all select-none whitespace-nowrap min-h-[40px] ${
                        activeCategory === cat
                          ? 'gradient-purple text-white shadow-md shadow-purple-300/40'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700'
                      }`}>
                      {meta.icon} {cat.split(' ')[0]} ({categoryMap[cat]})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grille outils — 2 colonnes sur mobile */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filtered.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <p className="text-gray-500 text-base sm:text-lg">Aucun outil trouvé.</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
