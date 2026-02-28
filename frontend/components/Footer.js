import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 py-10 sm:py-14 mt-8 sm:mt-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-10">
          {/* Logo + description — occupe 2 colonnes sur mobile */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center text-white font-bold text-lg">✦</div>
              <span className="text-xl font-extrabold text-gray-900">Thecreamai</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              La plateforme de référence pour découvrir et comparer les meilleurs outils du web.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-gray-700 text-xs uppercase tracking-wider">Outils</h4>
            <ul className="space-y-2.5">
              <li><Link href="/outils" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Tous les outils</Link></li>
              <li><Link href="/outils/intelligence-artificielle" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🤖 IA</Link></li>
              <li><Link href="/outils/vpn" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🛡️ VPN</Link></li>
              <li><Link href="/outils/hebergement-web" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🌐 Hébergement</Link></li>
              <li><Link href="/outils/antivirus" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🦠 Antivirus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-gray-700 text-xs uppercase tracking-wider">Top 10</h4>
            <ul className="space-y-2.5">
              <li><Link href="/top-10-intelligence-artificielle" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🏆 Top 10 IA</Link></li>
              <li><Link href="/top-10-vpn" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🏆 Top 10 VPN</Link></li>
              <li><Link href="/top-10-hebergement-web" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🏆 Top 10 Hébergement</Link></li>
              <li><Link href="/top-10-antivirus" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🏆 Top 10 Antivirus</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-bold mb-3 text-gray-700 text-xs uppercase tracking-wider">Légal</h4>
            <ul className="space-y-2.5">
              <li><Link href="/contact" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Contact</Link></li>
              <li><Link href="/comparatifs" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Comparatifs</Link></li>
              <li><Link href="/blog" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Mentions légales</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        {/* Ligne légale mobile — liens horizontaux scroll */}
        <div className="border-t border-purple-100 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-400 text-xs">© 2025 Thecreamai. Tous droits réservés.</p>
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
            {['Mentions légales', 'CGU', 'Contact'].map((item, i) => (
              <Link key={i} href={item === 'Contact' ? '/contact' : '#'}
                className="text-gray-400 hover:text-purple-700 transition-colors text-xs min-h-[44px] flex items-center">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
