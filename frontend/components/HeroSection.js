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
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-200/40 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-violet-200/30 rounded-full filter blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white border border-purple-200 text-gray-600 px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Mis à jour 2025 · Sélection experte vérifiée
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900">
          Trouvez les meilleurs<br />
          <span className="text-gray-900">outils du web</span><br />
          en quelques secondes
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          IA, VPN, hébergement web, antivirus — comparez les meilleures solutions du marché, vérifiées et notées par nos experts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/outils" className="gradient-purple text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-purple-300/50 hover:shadow-purple-400/60 hover:-translate-y-1 transition-all inline-flex items-center gap-2">
            ⚡ Explorer les outils
          </Link>
          <Link href="/top-10-intelligence-artificielle" className="bg-white border border-purple-200 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:border-purple-400 hover:bg-purple-50 hover:-translate-y-1 transition-all inline-flex items-center gap-2 shadow-sm">
            🏆 Voir le Top 10
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center">
          <div className="grid grid-cols-3 divide-x divide-purple-100 bg-white border border-purple-100 rounded-2xl overflow-hidden max-w-lg w-full shadow-sm">
            <div className="text-center py-6 px-4">
              <div className="text-3xl font-extrabold text-gray-900">{count}+</div>
              <div className="text-xs text-gray-600 mt-1 uppercase tracking-wider font-semibold">Outils</div>
            </div>
            <div className="text-center py-6 px-4">
              <div className="text-3xl font-extrabold text-gray-900">4</div>
              <div className="text-xs text-gray-600 mt-1 uppercase tracking-wider font-semibold">Catégories</div>
            </div>
            <div className="text-center py-6 px-4">
              <div className="text-3xl font-extrabold text-gray-900">100%</div>
              <div className="text-xs text-gray-600 mt-1 uppercase tracking-wider font-semibold">Vérifiés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
