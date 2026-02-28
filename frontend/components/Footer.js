import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-purple-900/30 py-14 mt-10" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center text-white font-bold text-lg">✦</div>
              <span className="text-xl font-extrabold">Thecreamai</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              La plateforme de référence pour découvrir et comparer les meilleurs outils du web. Sélection vérifiée pour créateurs et entrepreneurs.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', '▶'].map((s, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-purple-900/20 border border-purple-900/40 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 transition-all text-sm">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Outils</h4>
            <ul className="space-y-3">
              <li><Link href="/outils" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Tous les outils</Link></li>
              <li><Link href="/outils/intelligence-artificielle" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">🤖 IA</Link></li>
              <li><Link href="/outils/vpn" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">🛡️ VPN</Link></li>
              <li><Link href="/outils/hebergement-web" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">🌐 Hébergement</Link></li>
              <li><Link href="/outils/antivirus" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">🦠 Antivirus</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Découvrir</h4>
            <ul className="space-y-3">
              <li><Link href="/comparatifs" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">⚖️ Comparatifs</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">📰 Blog & Guides</Link></li>
              <li><Link href="/temoignages" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">💬 Témoignages</Link></li>
              <li><Link href="/pourquoi-nous" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">💎 Pourquoi nous</Link></li>
              <li><Link href="/newsletter" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">📧 Newsletter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Légal</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Contact</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Mentions légales</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Politique de confidentialité</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2025 Thecreamai. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Mentions légales', 'CGU', 'Contact'].map((item, i) => (
              <Link key={i} href={item === 'Contact' ? '/contact' : '#'} className="text-gray-500 hover:text-purple-400 transition-colors text-sm">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
