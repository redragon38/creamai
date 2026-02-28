import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star, Check, X, Globe } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

export default function ToolPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tool, setTool] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Charger les données de l'outil
      fetch('/data/tools.json')
        .then(res => res.json())
        .then(data => {
          const foundTool = data.find(t => t.id === id);
          setTool(foundTool);
          
          // Trouver des alternatives basées sur les catégories
          if (foundTool) {
            const similarTools = data.filter(t => {
              // Exclure l'outil actuel
              if (t.id === foundTool.id) return false;
              
              // Vérifier si les outils partagent au moins une catégorie
              const hasCommonCategory = t.categories?.some(cat => 
                foundTool.categories?.includes(cat)
              );
              
              return hasCommonCategory;
            }).slice(0, 3); // Limiter à 3 alternatives
            
            setAlternatives(similarTools);
          }
          
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur de chargement:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-5 h-5 ${i < fullStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
        />
      );
    }
    return stars;
  };

  // Données structurées pour le produit/outil
  const getStructuredData = () => {
    if (!tool) return null;

    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "applicationCategory": tool.categories?.[0] || "UtilitiesApplication",
      "description": tool.description || tool.short,
      "url": `https://thecreamai.com/tool/${tool.id}`,
      "image": tool.logo ? `https://thecreamai.com${tool.logo}` : null,
      "offers": {
        "@type": "Offer",
        "price": tool.priceMonthly || "0",
        "priceCurrency": tool.priceCurrency || "EUR",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": tool.rating ? {
        "@type": "AggregateRating",
        "ratingValue": tool.rating.value,
        "reviewCount": tool.rating.count,
        "bestRating": "5",
        "worstRating": "1"
      } : null,
      "operatingSystem": "Web",
      "softwareVersion": "Latest"
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-purple-400">Chargement...</div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen">
        <SEO
          title="Outil non trouvé"
          description="Cet outil n'existe pas ou a été supprimé."
          noindex={true}
        />
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Outil non trouvé</h1>
          <p className="text-gray-400 mb-8">Cet outil n'existe pas ou a été supprimé.</p>
          <Link href="/" className="gradient-purple text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${tool.name} - Avis, Prix et Alternatives`}
        description={tool.short || tool.description || `Discover ${tool.name}, ses fonctionnalités, tarifs et alternatives. Guide complet et avis détaillé.`}
        canonical={`https://thecreamai.com/tool/${tool.id}`}
        keywords={`${tool.name}, ${tool.categories?.join(', ')}, ${tool.tags?.join(', ')}, avis, prix, alternative`}
        ogImage={tool.logo ? `https://thecreamai.com${tool.logo}` : 'https://thecreamai.com/og-image.jpg'}
        structuredData={getStructuredData()}
      />

      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Bouton retour */}
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Retour aux outils
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* En-tête de l'outil */}
            <div className="gradient-card rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-6 mb-6">
                {tool.logo ? (
                  <div className="w-24 h-24 rounded-xl bg-white flex items-center justify-center p-3 flex-shrink-0">
                    <img 
                      src={tool.logo} 
                      alt={tool.name} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-xl gradient-purple flex items-center justify-center text-4xl flex-shrink-0">
                    🛠️
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{tool.name}</h1>
                    {tool.verified && (
                      <span className="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm font-semibold">
                        ✓ Vérifié
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xl text-gray-300 mb-4">
                    {tool.short || tool.highlight}
                  </p>

                  {tool.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {renderStars(tool.rating.value)}
                      </div>
                      <span className="text-lg text-gray-400">
                        {tool.rating.value} ({tool.rating.count} avis)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Catégories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(tool.categories || []).map((cat, idx) => (
                  <span 
                    key={idx}
                    className="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Bouton principal */}
              <button
                onClick={() => (tool.website || tool.affiliateUrl || tool.link) && window.open(tool.website || tool.affiliateUrl || tool.link, '_blank')}
                className="w-full gradient-purple text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-purple-500/50 transition-all"
              >
                <span>Visiter {tool.name}</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>

            {/* Description complète */}
            <div className="gradient-card rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">À propos</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {tool.description || tool.long || tool.short || "Aucune description disponible pour cet outil."}
              </div>
            </div>

            {/* Points forts et Points faibles */}
            {((tool.strengths && tool.strengths.length > 0) || (tool.limitations && tool.limitations.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Points forts */}
                {tool.strengths && tool.strengths.length > 0 && (
                  <div className="gradient-card rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Check className="w-6 h-6 text-green-400" />
                      Points forts
                    </h2>
                    <ul className="space-y-3">
                      {tool.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Points faibles */}
                {tool.limitations && tool.limitations.length > 0 && (
                  <div className="gradient-card rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <X className="w-6 h-6 text-red-400" />
                      Points faibles
                    </h2>
                    <ul className="space-y-3">
                      {tool.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Fonctionnalités */}
            {tool.features && tool.features.length > 0 && (
              <div className="gradient-card rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Fonctionnalités principales</h2>
                <ul className="space-y-3">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <div className="gradient-card rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Mots-clés</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="bg-purple-900/20 text-purple-300 px-3 py-1 rounded-lg text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {tool.faq && tool.faq.length > 0 && (
              <div className="gradient-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
                <div className="space-y-6">
                  {tool.faq.map((item, idx) => (
                    <div key={idx} className="border-b border-purple-900/30 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-2">
                        <span className="text-purple-400 flex-shrink-0">Q:</span>
                        <span>{item.q}</span>
                      </h3>
                      <p className="text-gray-300 ml-6 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Barre latérale */}
          <div className="lg:col-span-1">
            {/* Alternatives */}
            <div className="gradient-card rounded-2xl p-6 mb-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Alternatives</h3>
              
              {alternatives.length > 0 ? (
                <div className="space-y-4">
                  {alternatives.map((alt) => (
                    <div 
                      key={alt.id}
                      className="bg-[#0a0118]/50 rounded-xl p-4 border border-purple-900/30 hover:border-purple-500/50 transition-all group cursor-pointer"
                      onClick={() => window.open(alt.website || alt.affiliateUrl || alt.link, '_blank')}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {alt.logo ? (
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center p-2 flex-shrink-0">
                            <img 
                              src={alt.logo} 
                              alt={alt.name} 
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg gradient-purple flex items-center justify-center text-xl flex-shrink-0">
                            🛠️
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                            {alt.name}
                          </h4>
                          {alt.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs text-gray-400">
                                {alt.rating.value}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {alt.short || alt.highlight}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {alt.price && (
                          <span className="text-sm font-semibold text-purple-300">
                            {alt.price}
                          </span>
                        )}
                        <button 
                          className="ml-auto text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(alt.website || alt.affiliateUrl || alt.link, '_blank');
                          }}
                        >
                          Voir le site
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  Aucune alternative disponible pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
