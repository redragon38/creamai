import { useState, useEffect } from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolCard from '../components/ToolCard';
import HeroSection from '../components/HeroSection';
import ToolModal from '../components/ToolModal';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const tools = JSON.parse(jsonData);
  
  return {
    props: {
      initialTools: tools,
    },
  };
}

export default function Home({ initialTools }) {
  const [tools] = useState(initialTools || []);
  const [filteredTools, setFilteredTools] = useState(initialTools || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    const cats = new Set(['all']);
    tools.forEach(tool => {
      if (tool.categories) {
        tool.categories.forEach(cat => cats.add(cat));
      }
    });
    setCategories(Array.from(cats));
  }, [tools]);

  useEffect(() => {
    let filtered = tools;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => 
        tool.categories && tool.categories.includes(activeCategory)
      );
    }
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
        <HeroSection />

        {/* Tools Section */}
        <section id="tools" className="py-20" data-testid="tools-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Outils
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Découvrez les meilleurs outils IA</h2>
              
              <div className="max-w-2xl mx-auto mb-8">
                <input 
                  type="text"
                  placeholder="Rechercher un outil..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="search-input"
                  className="w-full bg-[#110822]/80 border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 focus:shadow-lg focus:shadow-purple-500/30 transition-all"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    data-testid={`category-${category}`}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onSelect={setSelectedTool}
                />
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aucun outil trouvé correspondant à vos critères.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Tool Detail Modal */}
      {selectedTool && (
        <ToolModal 
          tool={selectedTool} 
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
}
