import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { CheckCircle, Mail, Zap, Shield, Star, Gift } from 'lucide-react';

const PERKS = [
  { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: 'Nouveaux outils en avant-première', desc: 'Soyez le premier informé des meilleures sorties avant tout le monde.' },
  { icon: <Gift className="w-5 h-5 text-emerald-400" />, title: 'Offres exclusives & réductions', desc: 'Des codes promo négociés uniquement pour nos abonnés.' },
  { icon: <Star className="w-5 h-5 text-purple-400" />, title: 'Sélection hebdomadaire experte', desc: 'Un condensé des meilleurs outils de la semaine, triés sur le volet.' },
  { icon: <Shield className="w-5 h-5 text-blue-400" />, title: 'Zéro spam, désinscription facile', desc: '1 email par semaine max. Vous pouvez partir en 1 clic à tout moment.' },
];

const PREVIOUS = [
  { num: '#42', date: '18 fév. 2025', subject: '🛡️ Les 5 meilleurs VPN de 2025 selon nos tests', preview: 'NordVPN vs ExpressVPN, ProtonVPN en chute libre ?' },
  { num: '#41', date: '11 fév. 2025', subject: '🌐 Hébergement : o2switch détrône-t-il Kinsta ?', preview: 'Benchmark de vitesse sur 6 hébergeurs français...' },
  { num: '#40', date: '4 fév. 2025', subject: '🤖 Top 3 outils IA pour créateurs cette semaine', preview: 'ClickUp AI vs Notion AI vs un nouvel entrant...' },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [count] = useState(2847);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Newsletter Thecreamai — Outils IA, VPN & Hébergement chaque semaine"
        description="Rejoignez 2 800+ créateurs et entrepreneurs. Recevez chaque semaine la sélection des meilleurs outils, offres exclusives et tendances du digital."
        canonical="https://thecreamai.com/newsletter"
        keywords="newsletter outils IA, newsletter VPN, newsletter hébergement web, digital, créateurs"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-900/10 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Mail className="w-4 h-4" /> Newsletter gratuite
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Restez à la pointe<br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">chaque semaine</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-lg mx-auto mb-10">
              Rejoignez <strong className="text-white">{count.toLocaleString()}+ créateurs</strong> qui reçoivent chaque semaine les meilleurs outils, offres et guides.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 bg-[#0a0118]/80 border border-purple-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                />
                <button type="submit" className="gradient-purple text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                  Je m'inscris →
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 text-emerald-400 font-bold text-xl mb-4 py-4">
                <CheckCircle className="w-7 h-7" /> Bienvenue ! Vérifiez votre boîte mail 🎉
              </div>
            )}
            <p className="text-gray-600 text-sm">✅ Gratuit · 1 email/semaine max · Désinscription en 1 clic</p>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-24">
          {/* Avantages */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">Ce que vous recevez chaque semaine</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PERKS.map((perk, i) => (
                <div key={i} className="gradient-card rounded-2xl p-6 flex gap-4 hover:-translate-y-1 hover:border-purple-500/50 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-900/40 flex items-center justify-center flex-shrink-0">
                    {perk.icon}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{perk.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Numéros précédents */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-10">Numéros précédents</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {PREVIOUS.map((issue, i) => (
                <div key={i} className="gradient-card rounded-2xl p-5 flex items-center gap-5 hover:border-purple-500/50 hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {issue.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">{issue.date}</p>
                    <p className="font-bold text-sm group-hover:text-purple-300 transition-colors truncate">{issue.subject}</p>
                    <p className="text-gray-400 text-xs mt-1 truncate">{issue.preview}</p>
                  </div>
                  <Mail className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/10 border border-purple-500/30 rounded-3xl p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-purple-600/15 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-3">Prêt à rejoindre la communauté ?</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">{count.toLocaleString()}+ entrepreneurs et créateurs nous font déjà confiance.</p>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com"
                    className="flex-1 bg-[#05010f]/80 border border-purple-500/30 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all" />
                  <button type="submit" className="gradient-purple text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-purple-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                    Je m'abonne →
                  </button>
                </form>
              ) : (
                <p className="text-emerald-400 font-bold text-lg">🎉 Vous êtes inscrit(e) !</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
