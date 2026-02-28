import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, LayoutGrid } from 'lucide-react';

const CATEGORIES = [
  { slug: 'intelligence-artificielle', label: 'Intelligence artificielle', icon: '🤖', desc: 'Boostez votre productivité' },
  { slug: 'hebergement-web',          label: 'Hébergement web',          icon: '🌐', desc: 'Hébergez vos projets web' },
  { slug: 'vpn',                      label: 'VPN',                      icon: '🛡️', desc: 'Sécurisez vos connexions' },
  { slug: 'antivirus',                label: 'Antivirus',                icon: '🦠', desc: 'Protégez vos appareils' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [outilsOpen, setOutilsOpen] = useState(false);
  const [ressourcesOpen, setRessourcesOpen] = useState(false);
  const outilsRef = useRef(null);
  const ressourcesRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (outilsRef.current && !outilsRef.current.contains(e.target)) setOutilsOpen(false);
      if (ressourcesRef.current && !ressourcesRef.current.contains(e.target)) setRessourcesOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 text-white text-center py-2.5 text-sm font-medium px-4">
        🎉 Sélection mise à jour — <strong>32 outils vérifiés</strong> pour booster votre activité &nbsp;·&nbsp;
        <Link href="/outils" className="underline font-bold">Voir la sélection →</Link>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#0a0118]/85 border-b border-purple-900/20" data-testid="header">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" data-testid="logo">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src="/logo.png" alt="Thecreamai" className="w-9 h-9 object-contain" />
              </div>
              <span className="text-xl font-extrabold">Thecreamai</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-purple-900/20 text-sm font-medium transition-colors">
                Accueil
              </Link>

              {/* Dropdown Outils */}
              <div className="relative" ref={outilsRef}>
                <button onClick={() => { setOutilsOpen(!outilsOpen); setRessourcesOpen(false); }}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-purple-900/20 text-sm font-medium transition-colors">
                  Outils <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${outilsOpen ? 'rotate-180' : ''}`} />
                </button>
                {outilsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#0e0520]/95 backdrop-blur-xl border border-purple-900/40 rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden">
                    <Link href="/outils" onClick={() => setOutilsOpen(false)} className="flex items-center gap-3 px-4 py-3.5 hover:bg-purple-900/30 transition-colors border-b border-purple-900/20 group">
                      <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <LayoutGrid className="w-4 h-4 text-white" />
                      </div>
                      <div><p className="text-white font-semibold text-sm">Tous les outils</p><p className="text-gray-500 text-xs">Explorer la sélection complète</p></div>
                    </Link>
                    <div className="p-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-600 px-2 py-1.5">Catégories</p>
                      {CATEGORIES.map(cat => (
                        <Link key={cat.slug} href={`/outils/${cat.slug}`} onClick={() => setOutilsOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-900/30 transition-colors group">
                          <span className="text-xl w-8 text-center group-hover:scale-110 transition-transform inline-block">{cat.icon}</span>
                          <div>
                            <p className="text-gray-200 font-medium text-sm group-hover:text-white">{cat.label}</p>
                            <p className="text-gray-500 text-xs">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown Ressources */}
              <div className="relative" ref={ressourcesRef}>
                <button onClick={() => { setRessourcesOpen(!ressourcesOpen); setOutilsOpen(false); }}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-purple-900/20 text-sm font-medium transition-colors">
                  Ressources <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${ressourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {ressourcesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-[#0e0520]/95 backdrop-blur-xl border border-purple-900/40 rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden p-2">
                    {[
                      { href: '/comparatifs', icon: '⚖️', label: 'Comparatifs', desc: 'Outils côte à côte' },
                      { href: '/blog',        icon: '📰', label: 'Blog & Guides', desc: 'Articles et conseils' },
                      { href: '/pourquoi-nous', icon: '💎', label: 'Pourquoi nous', desc: 'Notre méthode' },
                      { href: '/newsletter',  icon: '📧', label: 'Newsletter',   desc: 'Sélection hebdo' },
                    ].map(item => (
                      <Link key={item.href} href={item.href} onClick={() => setRessourcesOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-purple-900/30 transition-colors group">
                        <span className="text-xl w-8 text-center">{item.icon}</span>
                        <div>
                          <p className="text-gray-200 font-medium text-sm group-hover:text-white">{item.label}</p>
                          <p className="text-gray-500 text-xs">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-purple-900/20 text-sm font-medium transition-colors">Contact</Link>
              <Link href="/newsletter" className="gradient-purple text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all ml-2">
                Newsletter
              </Link>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="mobile-menu-btn">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-purple-900/20 pt-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2.5 rounded-xl hover:bg-purple-900/20 text-sm">Accueil</Link>
              <Link href="/outils" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2.5 rounded-xl hover:bg-purple-900/20 font-medium text-sm">🛠️ Tous les outils</Link>
              <div className="ml-4 border-l border-purple-900/30 pl-4 space-y-1">
                {CATEGORIES.map(cat => (
                  <Link key={cat.slug} href={`/outils/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-400 hover:text-purple-300 py-2 text-sm">
                    <span>{cat.icon}</span>{cat.label}
                  </Link>
                ))}
              </div>
              {[
                { href: '/comparatifs', label: '⚖️ Comparatifs' },
                { href: '/blog',        label: '📰 Blog & Guides' },
                { href: '/pourquoi-nous', label: '💎 Pourquoi nous' },
                { href: '/newsletter',  label: '📧 Newsletter' },
                { href: '/contact',     label: 'Contact' },
              ].map(item => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 hover:text-white px-3 py-2.5 rounded-xl hover:bg-purple-900/20 text-sm">{item.label}</Link>
              ))}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
