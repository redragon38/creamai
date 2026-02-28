import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star, Check, X } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

const CAT_META = {
  'VPN':                       { icon: '🛡️', topBar: 'bg-blue-500',    border: 'border-blue-200',    badge: 'bg-blue-50 border-blue-200 text-blue-700'         },
  'Intelligence artificielle': { icon: '🤖', topBar: 'bg-violet-500',  border: 'border-violet-200',  badge: 'bg-violet-50 border-violet-200 text-violet-700'   },
  'Hébergement web':           { icon: '🌐', topBar: 'bg-emerald-500', border: 'border-emerald-200', badge: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  'Antivirus':                 { icon: '🦠', topBar: 'bg-red-500',     border: 'border-red-200',     badge: 'bg-red-50 border-red-200 text-red-700'            },
};

function Stars({ val }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < Math.floor(val || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

function AltCard({ tool }) {
  const cat = tool.categories?.[0];
  const meta = CAT_META[cat] || { icon: '🛠️', topBar: 'bg-purple-500', border: 'border-purple-200', badge: 'bg-purple-50 border-purple-200 text-purple-700' };
  const url = tool.website || tool.affiliateUrl || '#';

  return (
    <div className={`bg-white rounded-2xl overflow-hidden border-2 ${meta.border} hover:shadow-lg hover:-translate-y-1 transition-all group`}>
      <div className={`h-1 w-full ${meta.topBar}`} />
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {tool.logo ? (
              <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-1.5"
                onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span class="text-xl">${meta.icon}</span>`; }} />
            ) : <span className="text-xl">{meta.icon}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors truncate">{tool.name}</h4>
            {tool.rating && (
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-gray-500">{tool.rating.value}/5</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{tool.short || tool.highlight}</p>
        <div className="flex gap-2">
          <Link href={`/tool/${tool.id}`}
            className="flex-1 border border-gray-200 text-gray-700 py-1.5 rounded-lg font-semibold text-xs text-center hover:border-purple-300 hover:text-purple-700 transition-all">
            Voir
          </Link>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="flex-1 gradient-purple text-white py-1.5 rounded-lg font-semibold text-xs text-center hover:shadow-md transition-all flex items-center justify-center gap-1">
            Site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ToolPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tool, setTool] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch('/data/tools.json')
        .then(r => r.json())
        .then(data => {
          const found = data.find(t => t.id === id);
          setTool(found);
          if (found) {
            setAlternatives(data.filter(t => t.id !== found.id && t.categories?.some(c => found.categories?.includes(c))).slice(0, 3));
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500 text-lg">Chargement…</div>
    </div>
  );

  if (!tool) return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Outil non trouvé</h1>
        <Link href="/" className="gradient-purple text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Retour
        </Link>
      </div>
      <Footer />
    </div>
  );

  const cat = tool.categories?.[0];
  const meta = CAT_META[cat] || { icon: '🛠️', topBar: 'bg-purple-500', border: 'border-purple-200', badge: 'bg-purple-50 border-purple-200 text-purple-700' };
  const url = tool.website || tool.affiliateUrl || '#';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${tool.name} - Avis, Prix et Alternatives`}
        description={tool.short || tool.description || `Avis et comparatif de ${tool.name}.`}
        canonical={`https://thecreamai.com/tool/${tool.id}`}
      />
      <Header />
      <main className="container mx-auto px-6 py-12 max-w-6xl">

        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-700 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Retour aux outils
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Colonne principale ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header outil */}
            <div className={`bg-white rounded-2xl overflow-hidden border-2 ${meta.border} shadow-sm`}>
              <div className={`h-2 w-full ${meta.topBar}`} />
              <div className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0">
                    {tool.logo ? (
                      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-3"
                        onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span class="text-4xl">${meta.icon}</span>`; }} />
                    ) : <span className="text-4xl">{meta.icon}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                      {tool.verified && <span className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">✓ Vérifié</span>}
                    </div>
                    <p className="text-gray-600 text-lg mb-4">{tool.short || tool.highlight}</p>
                    {tool.rating && (
                      <div className="flex items-center gap-3">
                        <Stars val={tool.rating.value} />
                        <span className="text-gray-600 font-semibold">{tool.rating.value}/5</span>
                        <span className="text-gray-400 text-sm">({tool.rating.count} avis)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Catégories */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(tool.categories || []).map((c, i) => {
                    const m = CAT_META[c] || { badge: 'bg-gray-50 border-gray-200 text-gray-700' };
                    return <span key={i} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${m.badge}`}>{c}</span>;
                  })}
                </div>

                <a href={url} target="_blank" rel="noopener noreferrer"
                  className="w-full gradient-purple text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-300/50 transition-all">
                  Visiter {tool.name} <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{tool.description || tool.short}</p>
            </div>

            {/* Points forts / faibles */}
            {((tool.strengths?.length > 0) || (tool.limitations?.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tool.strengths?.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" /> Points forts
                    </h2>
                    <ul className="space-y-2">
                      {tool.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tool.limitations?.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-500" /> Points faibles
                    </h2>
                    <ul className="space-y-2">
                      {tool.limitations.map((l, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm">{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Fonctionnalités */}
            {tool.features?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Fonctionnalités</h2>
                <ul className="space-y-3">
                  {tool.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {tool.tags?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Mots-clés</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((t, i) => (
                    <span key={i} className="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-sm">#{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Prix */}
            {tool.price && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Tarif</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${meta.badge}`}>{tool.price}</span>
              </div>
            )}

            {/* Alternatives */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Alternatives</h3>
              {alternatives.length > 0 ? (
                <div className="space-y-3">
                  {alternatives.map(alt => <AltCard key={alt.id} tool={alt} />)}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Aucune alternative disponible.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
