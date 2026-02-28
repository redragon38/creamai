import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const timer = setInterval(() => { c++; setCount(c); if (c >= 32) clearInterval(timer); }, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/25 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-5 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Mis à jour 2025 · Sélection experte vérifiée
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Trouvez les meilleurs<br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">outils du web</span><br />
          en quelques secondes
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          IA, VPN, hébergement web, antivirus — comparez les meilleures solutions du marché, vérifiées et notées par nos experts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/outils" className="gradient-purple text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:-translate-y-1 transition-all inline-flex items-center gap-2">
            ⚡ Explorer les outils
          </Link>
          <Link href="/pourquoi-nous" className="bg-purple-900/20 border border-purple-500/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-900/40 hover:-translate-y-1 transition-all inline-flex items-center gap-2">
            📖 Comment ça marche
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 divide-x divide-purple-900/40 bg-purple-900/10 border border-purple-500/20 rounded-2xl overflow-hidden max-w-lg w-full">
            <div className="text-center py-6 px-4">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{count}+</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Outils</div>
            </div>
            <div className="text-center py-6 px-4">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">4</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Catégories</div>
            </div>
            <div className="text-center py-6 px-4">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100%</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Vérifiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
