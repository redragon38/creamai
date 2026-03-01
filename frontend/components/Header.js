import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, LayoutGrid, Trophy, Mail } from 'lucide-react';

const CATEGORIES = [
  { slug: 'intelligence-artificielle', label: 'Intelligence artificielle', icon: '🤖', desc: 'Boostez votre productivité' },
  { slug: 'hebergement-web',          label: 'Hébergement web',          icon: '🌐', desc: 'Hébergez vos projets web' },
  { slug: 'vpn',                      label: 'VPN',                      icon: '🛡️', desc: 'Sécurisez vos connexions' },
  { slug: 'antivirus',                label: 'Antivirus',                icon: '🦠', desc: 'Protégez vos appareils' },
];

const TOP10_CATEGORIES = [
  { slug: 'intelligence-artificielle', label: 'IA', icon: '🤖' },
  { slug: 'hebergement-web',          label: 'Hébergement', icon: '🌐' },
  { slug: 'vpn',                      label: 'VPN', icon: '🛡️' },
  { slug: 'antivirus',                label: 'Antivirus', icon: '🦠' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [outilsOpen, setOutilsOpen] = useState(false);
  const [top10Open, setTop10Open] = useState(false);
  const [topbarVisible, setTopbarVisible] = useState(true);
  const outilsRef = useRef(null);
  const top10Ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (outilsRef.current && !outilsRef.current.contains(e.target)) setOutilsOpen(false);
      if (top10Ref.current && !top10Ref.current.contains(e.target)) setTop10Open(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Topbar dismissable */}
      {topbarVisible && (
        <div className="bg-gradient-to-r from-violet-700 via-purple-600 to-violet-700 text-white text-center py-2.5 text-sm font-medium px-4 relative">
          🎉 Sélection mise à jour — <strong>32 outils vérifiés</strong> pour booster votre activité &nbsp;·&nbsp;
          <Link href="/outils" className="underline font-bold hover:text-purple-200 transition-colors">Voir la sélection →</Link>
          <button onClick={() => setTopbarVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src="/logo.png" alt="Thecreamai" className="w-9 h-9 object-contain" />
              </div>
              <span className="text-xl font-extrabold text-gray-900 group-hover:text-purple-700 transition-colors">Thecreamai</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm font-medium transition-all">
                Accueil
              </Link>

              {/* Dropdown Outils */}
              <div className="relative" ref={outilsRef}>
                <button onClick={() => { setOutilsOpen(!outilsOpen); setTop10Open(false); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${outilsOpen ? 'text-purple-700 bg-purple-50' : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'}`}>
                  Outils <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${outilsOpen ? 'rotate-180' : ''}`} />
                </button>
                {outilsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-purple-100 rounded-2xl shadow-xl shadow-purple-100/50 overflow-hidden animate-fade-in">
                    <Link href="/outils" onClick={() => setOutilsOpen(false)} className="flex items-center gap-3 px-4 py-3.5 hover:bg-purple-50 transition-colors border-b border-purple-50 group">
                      <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center flex-shrink-0">
                        <LayoutGrid className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">Tous les outils</p>
                        <p className="text-gray-400 text-xs">Explorer la sélection complète</p>
                      </div>
                    </Link>
                    <div className="p-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-2 py-1.5">Catégories</p>
                      {CATEGORIES.map(cat => (
                        <Link key={cat.slug} href={`/outils/${cat.slug}`} onClick={() => setOutilsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-colors group">
                          <span className="text-xl w-8 text-center">{cat.icon}</span>
                          <div>
                            <p className="text-gray-700 font-medium text-sm group-hover:text-purple-700">{cat.label}</p>
                            <p className="text-gray-400 text-xs">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/comparatifs" className="text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm font-medium transition-all">
                Comparatifs
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm font-medium transition-all">
                Blog
              </Link>
              <Link href="/newsletter" className="text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm font-medium transition-all flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Newsletter
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-50 text-sm font-medium transition-all">
                Contact
              </Link>

              {/* Top 10 dropdown */}
              <div className="relative ml-2" ref={top10Ref}>
                <button
                  onClick={() => { setTop10Open(!top10Open); setOutilsOpen(false); }}
                  className="flex items-center gap-2 gradient-purple text-white px-5 py-2 rounded-xl font-bold text-sm shadow-md shadow-purple-300/50 hover:shadow-purple-400/50 hover:-translate-y-0.5 transition-all">
                  <Trophy className="w-4 h-4" />
                  Top 10
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${top10Open ? 'rotate-180' : ''}`} />
                </button>
                {top10Open && (
                  <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-purple-100 rounded-2xl shadow-xl shadow-purple-100/50 overflow-hidden p-2 animate-fade-in">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-2 py-1.5">Par catégorie</p>
                    {TOP10_CATEGORIES.map(cat => (
                      <Link key={cat.slug} href={`/top-10-${cat.slug}`} onClick={() => setTop10Open(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-colors group">
                        <span className="text-lg w-7 text-center">{cat.icon}</span>
                        <span className="text-gray-700 font-medium text-sm group-hover:text-purple-700">Top 10 {cat.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile burger */}
            <button className="md:hidden text-gray-700 hover:text-purple-700 transition-colors p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-1 border-t border-purple-50 pt-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-purple-700 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-sm font-medium">Accueil</Link>
              <Link href="/outils" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-purple-700 px-3 py-2.5 rounded-xl hover:bg-purple-50 font-semibold text-sm">🛠️ Tous les outils</Link>
              <div className="ml-4 border-l border-purple-100 pl-4 space-y-1">
                {CATEGORIES.map(cat => (
                  <Link key={cat.slug} href={`/outils/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-500 hover:text-purple-700 py-2 text-sm">
                    <span>{cat.icon}</span>{cat.label}
                  </Link>
                ))}
              </div>
              <Link href="/comparatifs" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-purple-700 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-sm">⚖️ Comparatifs</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-purple-700 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-sm">📰 Blog</Link>
              <Link href="/newsletter" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-purple-700 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-sm">📧 Newsletter</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-purple-700 px-3 py-2.5 rounded-xl hover:bg-purple-50 text-sm">✉️ Contact</Link>
              <div className="pt-3 border-t border-purple-50">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-3 py-1.5">🏆 Top 10</p>
                {TOP10_CATEGORIES.map(cat => (
                  <Link key={cat.slug} href={`/top-10-${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-700 hover:text-purple-700 px-3 py-2 rounded-xl hover:bg-purple-50 text-sm">
                    <span>{cat.icon}</span>Top 10 {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
