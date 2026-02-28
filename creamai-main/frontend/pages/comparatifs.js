import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Star, ExternalLink, ArrowRight } from 'lucide-react';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { tools } };
}

const CATEGORIES = ['Tout', 'VPN', 'Hébergement web', 'Antivirus', 'Intelligence artificielle'];
const CAT_META = {
  'Tout':                      { icon: '⭐', badge: 'bg-purple-900/30 border-purple-500/30 text-purple-300' },
  'VPN':                       { icon: '🛡️', badge: 'bg-blue-900/30 border-blue-500/30 text-blue-300' },
  'Hébergement web':           { icon: '🌐', badge: 'bg-emerald-900/30 border-emerald-500/30 text-emerald-300' },
  'Antivirus':                 { icon: '🦠', badge: 'bg-red-900/30 border-red-500/30 text-red-300' },
  'Intelligence artificielle': { icon: '🤖', badge: 'bg-violet-900/30 border-violet-500/30 text-violet-300' },
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

function ToolCard({ tool, rank }) {
  const cat = tool.categories?.[0];
  const meta = CAT_META[cat] || CAT_META['VPN'];
  const affUrl = tool.affiliateUrl || tool.website || '#';

  return (
    <div className="gradient-card rounded-2xl p-5 flex flex-col relative overflow-hidden hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
      {rank === 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2.5 py-1 rounded-full font-bold">🏆 Top</span>
        </div>
      )}
      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300">{rank + 1}</div>

      {/* Logo — clique → page dédiée */}
      <Link href={`/tool/${tool.id}`} className="flex justify-center mt-6 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
          {tool.logo ? (
            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-2"
              onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-3xl">${meta.icon}</span>`; }} />
          ) : (
            <span className="text-3xl">{meta.icon}</span>
          )}
        </div>
      </Link>

      {/* Nom — clique → page dédiée */}
      <div className="text-center mb-3">
        <Link href={`/tool/${tool.id}`}>
          <h3 className="font-bold text-base group-hover:text-purple-300 transition-colors mb-1 hover:text-purple-300">{tool.name}</h3>
        </Link>
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

      {/* Deux boutons : fiche dédiée + site officiel */}
      <div className="flex gap-2 mt-auto">
        <Link href={`/tool/${tool.id}`}
          className="flex-1 border border-purple-500/40 text-purple-300 py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 hover:bg-purple-900/30 hover:-translate-y-0.5 transition-all">
          Voir la fiche <ArrowRight className="w-3 h-3" />
        </Link>
        <a href={affUrl} target="_blank" rel="noopener noreferrer"
          className="flex-1 gradient-purple text-white py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
          Site officiel <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function ComparatifsPage({ tools }) {
  const [selectedCat, setSelectedCat] = useState('Tout');

  const filtered = (selectedCat === 'Tout'
    ? tools
    : tools.filter(t => t.categories?.includes(selectedCat))
  ).sort((a, b) => (b.rating?.value || 0) - (a.rating?.value || 0));

  return (
    <div className="min-h-screen">
      <SEO
        title="Comparatifs outils — VPN, Hébergement, Antivirus, IA"
        description="Comparez les meilleurs outils VPN, hébergement web, antivirus et IA. Avis vérifiés, notes et recommandations d'experts pour choisir sans se tromper."
        canonical="https://thecreamai.com/comparatifs"
        keywords="comparatif VPN, comparatif hébergement web, comparatif antivirus, comparatif IA"
      />
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ⚖️ Comparatifs
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
              Comparez les meilleurs<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">outils côte à côte</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Notes, prix, essais gratuits — tout pour choisir sans se tromper.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-24">

          {/* ── Filtres catégories ── */}
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

          {/* ── Compteur ── */}
          <p className="text-center text-gray-500 text-sm mb-8">
            <span className="text-purple-300 font-bold">{filtered.length}</span> outil{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
            {selectedCat !== 'Tout' && <> dans la catégorie <span className="text-purple-300 font-bold">{selectedCat}</span></>}
          </p>

          {/* ── Grille de cards ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} rank={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun outil dans cette catégorie.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
