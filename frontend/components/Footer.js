import Link from 'next/link';
import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Twitter, Linkedin, Youtube } from 'lucide-react';

const FORMSPREE_URL = 'https://formspree.io/f/xjgezqgj';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _subject: '[Thecreamai] Inscription newsletter (footer)' }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch { setStatus('error'); }
  };

  return (
<<<<<<< HEAD
    <footer className="border-t border-purple-100 bg-white">
      {/* Mini newsletter band */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 border-b border-purple-100 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-gray-900 text-lg mb-1">📬 Restez informé chaque semaine</p>
            <p className="text-gray-500 text-sm">Les meilleurs outils, offres et guides — directement dans votre boîte mail.</p>
          </div>
          {status === 'success' ? (
            <div className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 border border-green-200 px-5 py-3 rounded-xl">
              <CheckCircle className="w-4 h-4" /> Inscription confirmée !
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 md:w-64 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all" />
              <button type="submit" disabled={status === 'loading'}
                className="gradient-purple text-white px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-300/50 transition-all disabled:opacity-60">
                {status === 'loading' ? '...' : "S'abonner →"}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Erreur. Réessayez.</p>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-purple flex items-center justify-center text-white font-bold text-lg">✦</div>
              <span className="text-xl font-extrabold text-gray-900">Thecreamai</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              La plateforme de référence pour découvrir et comparer les meilleurs outils du web. Sélection vérifiée et mise à jour par nos experts.
=======
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
>>>>>>> e1e71006e992e9f1033014f1fa53003639ef3267
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-purple-100 hover:text-purple-700 flex items-center justify-center text-gray-500 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-purple-100 hover:text-purple-700 flex items-center justify-center text-gray-500 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-purple-100 hover:text-purple-700 flex items-center justify-center text-gray-500 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Outils */}
          <div>
<<<<<<< HEAD
            <h4 className="font-bold mb-4 text-gray-900 text-sm uppercase tracking-wider">Outils</h4>
            <ul className="space-y-3">
              <li><Link href="/outils" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Tous les outils</Link></li>
              <li><Link href="/outils/intelligence-artificielle" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🤖 IA</Link></li>
              <li><Link href="/outils/vpn" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🛡️ VPN</Link></li>
              <li><Link href="/outils/hebergement-web" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🌐 Hébergement</Link></li>
              <li><Link href="/outils/antivirus" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🦠 Antivirus</Link></li>
=======
            <h4 className="font-bold mb-3 text-gray-700 text-xs uppercase tracking-wider">Outils</h4>
            <ul className="space-y-2.5">
              <li><Link href="/outils" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">Tous les outils</Link></li>
              <li><Link href="/outils/intelligence-artificielle" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🤖 IA</Link></li>
              <li><Link href="/outils/vpn" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🛡️ VPN</Link></li>
              <li><Link href="/outils/hebergement-web" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🌐 Hébergement</Link></li>
              <li><Link href="/outils/antivirus" className="text-gray-500 hover:text-purple-700 transition-colors text-sm">🦠 Antivirus</Link></li>
>>>>>>> e1e71006e992e9f1033014f1fa53003639ef3267
            </ul>
          </div>

          {/* Top 10 */}
          <div>
<<<<<<< HEAD
            <h4 className="font-bold mb-4 text-gray-900 text-sm uppercase tracking-wider">Top 10</h4>
            <ul className="space-y-3">
              <li><Link href="/top-10-intelligence-artificielle" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🏆 Top 10 IA</Link></li>
              <li><Link href="/top-10-vpn" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🏆 Top 10 VPN</Link></li>
              <li><Link href="/top-10-hebergement-web" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🏆 Top 10 Hébergement</Link></li>
              <li><Link href="/top-10-antivirus" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">🏆 Top 10 Antivirus</Link></li>
            </ul>
          </div>

          {/* Liens */}
          <div>
            <h4 className="font-bold mb-4 text-gray-900 text-sm uppercase tracking-wider">Liens utiles</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Blog</Link></li>
              <li><Link href="/comparatifs" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Comparatifs</Link></li>
              <li><Link href="/newsletter" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Newsletter</Link></li>
              <li><Link href="/contact" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Contact</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Mentions légales</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-purple-600 transition-colors text-sm">Confidentialité</Link></li>
=======
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
>>>>>>> e1e71006e992e9f1033014f1fa53003639ef3267
            </ul>
          </div>
        </div>

<<<<<<< HEAD
        {/* Bottom bar */}
        <div className="border-t border-purple-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 Thecreamai. Tous droits réservés.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
              32 outils vérifiés · Mis à jour 2025
            </span>
=======
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
>>>>>>> e1e71006e992e9f1033014f1fa53003639ef3267
          </div>
        </div>
      </div>
    </footer>
  );
}
