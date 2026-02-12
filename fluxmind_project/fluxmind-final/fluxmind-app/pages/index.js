import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';

export default function Home() {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  // Load tools data
  useEffect(() => {
    fetch('/tools.json')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setFilteredTools(data);
        
        // Extract unique categories
        const cats = new Set(['all']);
        data.forEach(tool => {
          if (tool.categories) {
            tool.categories.forEach(cat => cats.add(cat));
          }
        });
        setCategories(Array.from(cats));
      })
      .catch(err => console.error('Erreur lors du chargement des outils:', err));
  }, []);

  // Filter tools
  useEffect(() => {
    let filtered = tools;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => 
        tool.categories && tool.categories.includes(activeCategory)
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.short && tool.short.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    setFilteredTools(filtered);
  }, [activeCategory, searchTerm, tools]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>FluxMind - Plateforme d'Innovation IA</title>
        <meta name="description" content="Découvrez les meilleurs outils IA pour booster votre productivité" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 rounded-full filter blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="inline-block mb-6">
              <span className="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Solutions professionnelles innovantes
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-shadow">
              Libérez la puissance<br />de l'innovation IA
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Découvrez les meilleurs outils IA pour améliorer votre efficacité, renforcer votre prise de décision 
              et proposer des solutions professionnelles plus intelligentes et plus rapides.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a href="#tools" className="gradient-purple text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:-translate-y-1 transition-all inline-block">
                Découvrir les outils
              </a>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Découvrez les meilleurs outils</h2>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <input 
                  type="text"
                  placeholder="Rechercher un outil..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#110822]/80 border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:shadow-lg focus:shadow-purple-500/30 transition-all"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === category
                        ? 'gradient-purple text-white shadow-lg shadow-purple-500/50'
                        : 'bg-[#110822]/80 border border-purple-500/30 text-gray-300 hover:border-purple-500/60'
                    }`}
                  >
                    {category === 'all' ? 'Tous' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.slice(0, 12).map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aucun outil trouvé correspondant à vos critères.</p>
              </div>
            )}

            {filteredTools.length > 12 && (
              <div className="text-center mt-12">
                <button className="gradient-purple text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:-translate-y-1 transition-all">
                  Charger plus d'outils
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
