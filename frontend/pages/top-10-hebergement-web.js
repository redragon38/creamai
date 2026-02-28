import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Star, ExternalLink, ArrowRight, Trophy } from 'lucide-react';

const META = {
  label: 'Hébergement Web', catFilter: 'Hébergement web', icon: '🌐',
  color: 'from-emerald-600 to-teal-500', colorLight: 'from-emerald-50 to-teal-50',
  border: 'border-emerald-200', badge: 'bg-blue-100 border-emerald-200 text-gray-900',
  desc: 'Les meilleurs hébergeurs web pour vos sites et applications en 2025.',
};

const OTHERS = [
  { href: '/top-10-vpn', label: 'Top 10 VPN', icon: '🛡️' },
  { href: '/top-10-intelligence-artificielle', label: 'Top 10 IA', icon: '🤖' },
  { href: '/top-10-antivirus', label: 'Top 10 Antivirus', icon: '🦠' },
];

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const allTools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tools = allTools
    .filter(t => (t.categories || []).includes(META.catFilter))
    .sort((a, b) => (b.rating?.value || 0) - (a.rating?.value || 0))
    .slice(0, 10);
  return { props: { tools } };
}

function Stars({ val }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < Math.floor(val || 0) ? 'text-gray-900 fill-yellow-400' : 'text-gray-900'}`} />
      ))}
    </div>
  );
}

function getRankBadge(rank) {
  if (rank === 0) return { emoji: '🥇', label: '#1', bg: 'bg-yellow-50 border-yellow-300 text-gray-900' };
  if (rank === 1) return { emoji: '🥈', label: '#2', bg: 'bg-gray-100 border-gray-300 text-gray-900' };
  if (rank === 2) return { emoji: '🥉', label: '#3', bg: 'bg-orange-50 border-orange-300 text-gray-900' };
  return { emoji: '', label: `#${rank + 1}`, bg: 'bg-purple-50 border-purple-200 text-gray-900' };
}

export default function Top10Hebergement({ tools }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Top 10 Hébergement Web 2025 — Classement & Comparatif"
        description={`Découvrez le Top 10 des meilleurs VPN en 2025. ${META.desc}`}
        canonical="https://thecreamai.com/top-10-hebergement-web"
        keywords="top 10 hébergement web, meilleur hébergeur 2025, comparatif hébergement"
      />
      <Header />
      <main>
        <section className={`py-20 bg-gradient-to-b ${META.colorLight} border-b ${META.border}`}>
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-purple-200 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Trophy className="w-4 h-4" /> Classement 2025
            </div>
            <div className="text-6xl mb-4">{META.icon}</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              Top 10 <span>{META.label}</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">{META.desc}</p>
          </div>
        </section>

        <div className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="space-y-4 mb-16">
            {tools.map((tool, i) => {
              const badge = getRankBadge(i);
              const url = tool.affiliateUrl || tool.website || '#';
              return (
                <div key={tool.id} className={`bg-white rounded-2xl border-2 ${i < 3 ? META.border : 'border-gray-100'} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden`}>
                  <div className={`h-1 w-full ${i < 3 ? META.topBar : "bg-gray-200"}`} />
                  <div className="flex items-center gap-5 p-5">
                    <div className={`w-14 h-14 rounded-2xl border-2 ${badge.bg} flex flex-col items-center justify-center flex-shrink-0`}>
                      {badge.emoji && <span className="text-xl leading-none">{badge.emoji}</span>}
                      <span className="text-xs font-bold mt-0.5">{badge.label}</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {tool.logo ? (
                        <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-2"
                          onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-2xl">${META.icon}</span>`; }} />
                      ) : <span className="text-2xl">{META.icon}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-lg">{tool.name}</h3>
                        {tool.verified && <span className="text-xs bg-green-50 border border-green-200 text-gray-600 px-2 py-0.5 rounded-full font-semibold">✓ Vérifié</span>}
                        {tool.trial && <span className="text-xs bg-cyan-50 border border-cyan-200 text-gray-600 px-2 py-0.5 rounded-full font-semibold">🆓 Essai gratuit</span>}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-1">{tool.short || tool.highlight}</p>
                      {tool.rating && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <Stars val={tool.rating.value} />
                          <span className="text-xs text-gray-600">{tool.rating.value}/5 ({tool.rating.count} avis)</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      {tool.price && <span className={`text-xs font-bold px-3 py-1 rounded-full border ${META.badge}`}>{tool.price}</span>}
                      <div className="flex gap-2">
                        <Link href={`/tool/${tool.id}`} className="border border-purple-200 text-gray-600 px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1 hover:bg-purple-50 transition-all">
                          Fiche <ArrowRight className="w-3 h-3" />
                        </Link>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="gradient-purple text-white px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1 hover:shadow-md transition-all">
                          Site <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {tool.rating && (
                    <div className="px-5 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-16">Note</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${META.color} rounded-full`} style={{ width: `${(tool.rating.value / 5) * 100}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-900 w-8 text-right">{tool.rating.value}/5</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Voir les autres Top 10</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {OTHERS.map(cat => (
                <Link key={cat.href} href={cat.href} className="bg-white border-2 border-purple-100 rounded-2xl p-5 flex items-center gap-3 select-none hover:border-purple-300 hover:shadow-md hover:-translate-y-1 transition-all group shadow-sm">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <p className="font-bold text-gray-600 group-hover:text-gray-600 text-sm">{cat.label}</p>
                    <p className="text-xs text-gray-600">Classement 2025</p>
                  </div>
                  <Trophy className="w-4 h-4 text-gray-900 ml-auto group-hover:text-gray-900" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
