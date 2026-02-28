import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-purple-100 py-14 mt-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center text-white font-bold text-lg">✦</div>
              <span className="text-xl font-extrabold text-gray-900">Thecreamai</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              La plateforme de référence pour découvrir et comparer les meilleurs outils du web. Sélection vérifiée pour créateurs et entrepreneurs.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-600 text-sm uppercase tracking-wider">Outils</h4>
            <ul className="space-y-3">
              <li><Link href="/outils" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">Tous les outils</Link></li>
              <li><Link href="/outils/intelligence-artificielle" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🤖 IA</Link></li>
              <li><Link href="/outils/vpn" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🛡️ VPN</Link></li>
              <li><Link href="/outils/hebergement-web" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🌐 Hébergement</Link></li>
              <li><Link href="/outils/antivirus" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🦠 Antivirus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-600 text-sm uppercase tracking-wider">Top 10</h4>
            <ul className="space-y-3">
              <li><Link href="/top-10-intelligence-artificielle" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🏆 Top 10 IA</Link></li>
              <li><Link href="/top-10-vpn" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🏆 Top 10 VPN</Link></li>
              <li><Link href="/top-10-hebergement-web" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🏆 Top 10 Hébergement</Link></li>
              <li><Link href="/top-10-antivirus" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">🏆 Top 10 Antivirus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-gray-600 text-sm uppercase tracking-wider">Légal</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">Contact</Link></li>
              <li><Link href="/comparatifs" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">Comparatifs</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">Blog</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">Mentions légales</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-gray-600 transition-colors text-sm">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2025 Thecreamai. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Mentions légales', 'CGU', 'Contact'].map((item, i) => (
              <Link key={i} href={item === 'Contact' ? '/contact' : '#'} className="text-gray-600 hover:text-gray-600 transition-colors text-sm">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
