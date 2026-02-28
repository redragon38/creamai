import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { tools } };
}

const CATEGORIES = ['Tout', 'VPN', 'Hébergement web', 'Antivirus', 'Intelligence artificielle'];
const CAT_META = {
  'Tout':                      { icon: '⭐', gradient: 'from-purple-600 to-pink-500',   badge: 'bg-purple-900/30 border-purple-500/30 text-purple-300' },
  'VPN':                       { icon: '🛡️', gradient: 'from-blue-600 to-cyan-500',    badge: 'bg-blue-900/30 border-blue-500/30 text-blue-300' },
  'Hébergement web':           { icon: '🌐', gradient: 'from-emerald-600 to-teal-500', badge: 'bg-emerald-900/30 border-emerald-500/30 text-emerald-300' },
  'Antivirus':                 { icon: '🦠', gradient: 'from-red-600 to-orange-500',   badge: 'bg-red-900/30 border-red-500/30 text-red-300' },
  'Intelligence artificielle': { icon: '🤖', gradient: 'from-violet-600 to-purple-500', badge: 'bg-violet-900/30 border-violet-500/30 text-violet-300' },
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Thecreamai",
  "url": "https://thecreamai.com",
  "description": "Comparatif des meilleurs outils IA, VPN, hébergements web et antivirus pour créateurs et entrepreneurs.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thecreamai.com/outils?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Thecreamai",
    "url": "https://thecreamai.com"
  }
};

function Stars({ val }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(val || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
      ))}
    </div>
  );
}

function CompareCard({ tool, rank }) {
  const cat = tool.categories?.[0];
  const meta = CAT_META[cat] || CAT_META['VPN'];
  const url = tool.affiliateUrl || tool.website || '#';
  return (
    <div className="gradient-card rounded-2xl p-5 flex flex-col relative overflow-hidden hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer">
      <Link href={`/tool/${tool.id}`} className="absolute inset-0 z-10" aria-label={`Voir la fiche ${tool.name}`} />
      {rank === 0 && (
        <div className="absolute top-3 right-3 z-20">
          <span className="text-xs bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2.5 py-1 rounded-full font-bold">🏆 Top</span>
        </div>
      )}
      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 z-20">{rank + 1}</div>
      <div className="flex justify-center mt-6 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
          {tool.logo ? (
            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-2"
              onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-3xl">${meta.icon}</span>`; }} />
          ) : (
            <span className="text-3xl">{meta.icon}</span>
          )}
        </div>
      </div>
      <div className="text-center mb-3">
        <h3 className="font-bold text-base group-hover:text-purple-300 transition-colors mb-1">{tool.name}</h3>
        <div className="flex justify-center gap-1.5 flex-wrap">
          {tool.verified && <span className="text-xs bg-green-500/15 border border-green-500/25 text-green-400 px-2 py-0.5 rounded-full font-semibold">✓ Vérifié</span>}
          {tool.trial && <span className="text-xs bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">🆓 Essai</span>}
        </div>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed text-center mb-4 line-clamp-2 flex-1">{tool.short || tool.highlight}</p>
      {tool.rating && (
        <div className="flex flex-col items-center gap-1 mb-3">
          <Stars val={tool.rating.value} />
          <span className="text-xs text-gray-500">{tool.rating.value}/5 · {tool.rating.count} avis</span>
        </div>
      )}
      {tool.price && (
        <div className="text-center mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${meta.badge}`}>{tool.price}</span>
        </div>
      )}
      <div className="relative z-20 mt-auto">
        <a href={url} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="w-full gradient-purple text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
          Voir le site <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default function Home({ tools }) {
  const [selectedCat, setSelectedCat] = useState('Tout');

  const catTools = (selectedCat === 'Tout'
    ? tools
    : tools.filter(t => t.categories?.includes(selectedCat))
  )
    .sort((a, b) => (b.rating?.value || 0) - (a.rating?.value || 0))
    .slice(0, 8);

  return (
    <div className="min-h-screen">
      <SEO
        title="Thecreamai — Les Meilleurs Outils IA, VPN & Hébergement Web"
        description="Découvrez et comparez les meilleurs outils IA, VPN, hébergements web et antivirus. Avis vérifiés, comparatifs experts et guides pour créateurs et entrepreneurs."
        canonical="https://thecreamai.com"
        keywords="outils IA, intelligence artificielle, hébergement web, VPN, antivirus, créateurs, entrepreneurs, comparatif, meilleur VPN 2025, meilleur hébergeur 2025"
        structuredData={STRUCTURED_DATA}
      />
      <Header />
      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Section Comparatif ── */}
        <section className="py-20" id="comparatif">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">⚖️ Comparatif</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Comparez les meilleurs outils</h2>
              <p className="text-gray-400 max-w-lg mx-auto">Sélectionnez une catégorie pour voir notre top sélection, triés par note.</p>
            </div>

            {/* Filtres catégories */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSelectedCat(cat)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-sm ${
                    selectedCat === cat
                      ? 'gradient-purple text-white shadow-lg shadow-purple-500/40 scale-105'
                      : 'gradient-card border border-purple-500/20 text-gray-300 hover:border-purple-500/50 hover:text-white'
                  }`}>
                  <span className="text-base">{CAT_META[cat].icon}</span>
                  {cat}
                </button>
              ))}
            </div>

            {/* Grille d'outils */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {catTools.map((tool, i) => <CompareCard key={tool.id} tool={tool} rank={i} />)}
            </div>

            <div className="text-center">
              <Link href="/comparatifs" className="gradient-card border border-purple-500/30 text-white px-8 py-3 rounded-xl font-semibold hover:border-purple-500/60 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                Voir tous les comparatifs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
