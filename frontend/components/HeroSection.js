import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { Search, ArrowRight, Star, Shield, Cpu, Globe, Zap } from 'lucide-react';
import { useRouter } from 'next/router';

const QUICK_LINKS = [
  { label: '🤖 IA', href: '/outils/intelligence-artificielle' },
  { label: '🛡️ VPN', href: '/outils/vpn' },
  { label: '🌐 Hébergement', href: '/outils/hebergement-web' },
  { label: '🦠 Antivirus', href: '/outils/antivirus' },
];

const STATS = [
  { value: 32, suffix: '+', label: 'Outils testés', icon: <Zap className="w-4 h-4" /> },
  { value: 4, suffix: '', label: 'Catégories', icon: <Globe className="w-4 h-4" /> },
  { value: 100, suffix: '%', label: 'Vérifiés', icon: <Shield className="w-4 h-4" /> },
  { value: 12, suffix: 'k+', label: 'Lecteurs/mois', icon: <Star className="w-4 h-4" /> },
];

function AnimatedNumber({ target, suffix }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let c = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      c += step;
      if (c >= target) { setCount(target); clearInterval(timer); }
      else setCount(c);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/outils?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/50 rounded-full filter blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-200/40 rounded-full filter blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-10 left-1/2 w-[600px] h-[300px] bg-purple-100/60 rounded-full filter blur-[80px] pointer-events-none" />

      {/* Floating category badges (desktop) */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 space-y-4 animate-fade-in delay-300">
        {[{ icon: '🤖', label: 'IA', score: '9.4' }, { icon: '🛡️', label: 'VPN', score: '9.1' }].map((b, i) => (
          <div key={i} className="glass border border-purple-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
            <span className="text-2xl">{b.icon}</span>
            <div>
              <div className="text-xs text-gray-500 font-medium">{b.label}</div>
              <div className="text-sm font-bold text-gray-900">⭐ {b.score}/10</div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 space-y-4 animate-fade-in delay-400">
        {[{ icon: '🌐', label: 'Hébergement', score: '9.2' }, { icon: '🦠', label: 'Antivirus', score: '8.9' }].map((b, i) => (
          <div key={i} className="glass border border-purple-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm animate-float" style={{ animationDelay: `${i * 0.7 + 0.3}s` }}>
            <span className="text-2xl">{b.icon}</span>
            <div>
              <div className="text-xs text-gray-500 font-medium">{b.label}</div>
              <div className="text-sm font-bold text-gray-900">⭐ {b.score}/10</div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white border border-purple-200 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-sm animate-fade-in-up">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Mis à jour 2025 · 32 outils vérifiés par nos experts
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-gray-900 animate-fade-in-up delay-100">
          Trouvez les meilleurs<br />
          <span className="shimmer-text">outils du web</span><br />
          en quelques secondes
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          IA · VPN · Hébergement · Antivirus — comparez les meilleures solutions du marché, testées et notées par nos experts.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6 animate-fade-in-up delay-300">
          <div className="flex items-center bg-white border-2 border-purple-200 rounded-2xl shadow-lg shadow-purple-100/50 hover:border-purple-400 focus-within:border-purple-500 focus-within:shadow-purple-200/60 transition-all overflow-hidden">
            <Search className="w-5 h-5 text-gray-400 ml-5 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un outil, VPN, hébergeur..."
              className="flex-1 py-4 px-4 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent text-base font-medium"
            />
            <button type="submit" className="m-1.5 gradient-purple px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-purple-300/40 hover:-translate-y-0.5 transition-all">
              Rechercher <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 animate-fade-in-up delay-400">
          {QUICK_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50 hover:-translate-y-0.5 transition-all shadow-sm">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up delay-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white border border-purple-100 rounded-2xl py-5 px-4 shadow-sm hover:shadow-md hover:border-purple-200 transition-all">
                <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">{stat.icon}</div>
                <div className="text-2xl font-extrabold text-gray-900 mb-0.5">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
