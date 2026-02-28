import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import { Star, ArrowRight, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { props: { tools } };
}

const CATEGORIES = ['Tout', 'VPN', 'Hébergement web', 'Antivirus', 'Intelligence artificielle'];
const CAT_META = {
  'Tout':                      { icon: '⭐', gradient: 'from-purple-600 to-pink-500',   badge: 'bg-purple-900/30 border-purple-500/30 text-purple-300' },
  'VPN':                       { icon: '🛡️', gradient: 'from-blue-600 to-cyan-500',    badge: 'bg-blue-900/30 border-blue-500/30 text-blue-300' },
  'Hébergement web':           { icon: '🌐', gradient: 'from-emerald-600 to-teal-500', badge: 'bg-emerald-900/30 border-emerald-500/30 text-emerald-300' },
  'Antivirus':                 { icon: '🦠', gradient: 'from-red-600 to-orange-500',   badge: 'bg-red-900/30 border-red-500/30 text-red-300' },
  'Intelligence artificielle': { icon: '🤖', gradient: 'from-violet-600 to-purple-500', badge: 'bg-violet-900/30 border-violet-500/30 text-violet-300' },
};

const FAQ_ITEMS = [
  {
    q: "Comment Thecreamai sélectionne-t-il les outils ?",
    a: "Chaque outil est testé manuellement par notre équipe pendant plusieurs semaines. Nous évaluons la performance réelle, le rapport qualité-prix, la qualité du support et la fiabilité sur la durée. Seuls les outils dépassant notre barre d'exigence sont publiés.",
  },
  {
    q: "Les comparatifs sont-ils vraiment indépendants ?",
    a: "Oui, à 100%. Nos classements ne sont jamais influencés par des accords commerciaux. Certains liens sont affiliés — ce qui nous aide à maintenir le site gratuitement — mais cela ne change jamais notre note ni notre recommandation.",
  },
  {
    q: "À quelle fréquence les outils sont-ils mis à jour ?",
    a: "Nous réévaluons chaque outil tous les trimestres et mettons à jour nos avis en temps réel si un outil évolue significativement (prix, fonctionnalités, qualité de service).",
  },
  {
    q: "La newsletter est-elle vraiment utile ?",
    a: "Nos 2 800+ abonnés reçoivent chaque semaine une sélection des meilleurs outils et deals, des guides pratiques et les nouveautés du marché. Pas de spam, désabonnement en un clic.",
  },
];

const BLOG_PREVIEWS = [
  {
    tag: '🤖 IA',
    title: 'Les 5 meilleurs outils IA pour créateurs en 2025',
    desc: "Comparatif complet des assistants IA les plus utiles pour booster votre productivité au quotidien.",
    slug: 'meilleurs-outils-ia-2025',
    readTime: '5 min',
  },
  {
    tag: '🛡️ VPN',
    title: 'NordVPN vs ExpressVPN : lequel choisir ?',
    desc: "Duel au sommet entre les deux géants du VPN. Prix, vitesse, sécurité — on compare tout.",
    slug: 'nordvpn-vs-expressvpn',
    readTime: '7 min',
  },
  {
    tag: '🌐 Hébergement',
    title: 'Quel hébergeur web choisir pour débuter ?',
    desc: "O2switch, Hostinger, LWS… notre guide pour choisir le bon hébergeur selon votre budget et vos besoins.",
    slug: 'meilleur-hebergeur-web-debutant',
    readTime: '6 min',
  },
];

function Stars({ val }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(val || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
      ))}
    </div>
  );
}

function CompareCard({ tool, rank }) {
  const cat = tool.categories?.[0];
  const meta = CAT_META[cat] || CAT_META['VPN'];
  const url = tool.affiliateUrl || tool.website || '#';
  return (
    <div className="gradient-card rounded-2xl p-5 flex flex-col relative overflow-hidden hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer">

      {/* Lien couvrant toute la carte */}
      <Link href={`/tool/${tool.id}`} className="absolute inset-0 z-10" aria-label={`Voir la fiche ${tool.name}`} />

      {rank === 0 && (
        <div className="absolute top-3 right-3 z-20">
          <span className="text-xs bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 px-2.5 py-1 rounded-full font-bold">🏆 Top</span>
        </div>
      )}
      <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300 z-20">{rank + 1}</div>

      <div className="flex justify-center mt-6 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
          {tool.logo ? (
            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-2"
              onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-3xl">${meta.icon}</span>`; }} />
          ) : (
            <span className="text-3xl">{meta.icon}</span>
          )}
        </div>
      </div>

      <div className="text-center mb-3">
        <h3 className="font-bold text-base group-hover:text-purple-300 transition-colors mb-1">{tool.name}</h3>
        <div className="flex justify-center gap-1.5 flex-wrap">
          {tool.verified && <span className="text-xs bg-green-500/15 border border-green-500/25 text-green-400 px-2 py-0.5 rounded-full font-semibold">✓ Vérifié</span>}
          {tool.trial && <span className="text-xs bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 px-2 py-0.5 rounded-full font-semibold">🆓 Essai</span>}
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed text-center mb-4 line-clamp-2 flex-1">{tool.short || tool.highlight}</p>

      {tool.rating && (
        <div className="flex flex-col items-center gap-1 mb-3">
          <Stars val={tool.rating.value} />
          <span className="text-xs text-gray-500">{tool.rating.value}/5 · {tool.rating.count} avis</span>
        </div>
      )}

      {tool.price && (
        <div className="text-center mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${meta.badge}`}>{tool.price}</span>
        </div>
      )}

      {/* Bouton site officiel — z-20 pour passer au-dessus du lien overlay */}
      <div className="relative z-20 mt-auto">
        <a href={url} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="w-full gradient-purple text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
          Voir le site <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="gradient-card rounded-2xl overflow-hidden transition-all hover:border-purple-500/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-semibold text-base group-hover:text-purple-300 transition-colors pr-4">{q}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-purple-900/30 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Thecreamai",
  "url": "https://thecreamai.com",
  "description": "Comparatif des meilleurs outils IA, VPN, hébergements web et antivirus pour créateurs et entrepreneurs.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thecreamai.com/outils?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Thecreamai",
    "url": "https://thecreamai.com"
  }
};

export default function Home({ tools }) {
  const [selectedCat, setSelectedCat] = useState('Tout');

  const catTools = (selectedCat === 'Tout'
    ? tools
    : tools.filter(t => t.categories?.includes(selectedCat))
  )
    .sort((a, b) => (b.rating?.value || 0) - (a.rating?.value || 0))
    .slice(0, 8);

  return (
    <div className="min-h-screen">
      <SEO
        title="Thecreamai — Les Meilleurs Outils IA, VPN & Hébergement Web"
        description="Découvrez et comparez les meilleurs outils IA, VPN, hébergements web et antivirus. Avis vérifiés, comparatifs experts et guides pour créateurs et entrepreneurs."
        canonical="https://thecreamai.com"
        keywords="outils IA, intelligence artificielle, hébergement web, VPN, antivirus, créateurs, entrepreneurs, comparatif, meilleur VPN 2025, meilleur hébergeur 2025"
        structuredData={STRUCTURED_DATA}
      />
      <Header />
      <main>
        <HeroSection />

        {/* ── Section Comparatif ── */}
        <section className="py-20" id="comparatif">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">⚖️ Comparatif</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Comparez les meilleurs outils</h2>
              <p className="text-gray-400 max-w-lg mx-auto">Sélectionnez une catégorie pour voir notre top sélection, triés par note.</p>
            </div>

            {/* Filtres catégories avec "Tout" */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setSelectedCat(cat)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-sm ${
                    selectedCat === cat
                      ? 'gradient-purple text-white shadow-lg shadow-purple-500/40 scale-105'
                      : 'gradient-card border border-purple-500/20 text-gray-300 hover:border-purple-500/50 hover:text-white'
                  }`}>
                  <span className="text-base">{CAT_META[cat].icon}</span>
                  {cat}
                </button>
              ))}
            </div>

            {/* Grille d'outils */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {catTools.map((tool, i) => <CompareCard key={tool.id} tool={tool} rank={i} />)}
            </div>

            <div className="text-center">
              <Link href="/comparatifs" className="gradient-card border border-purple-500/30 text-white px-8 py-3 rounded-xl font-semibold hover:border-purple-500/60 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                Voir tous les comparatifs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Chiffres clés ── */}
        <section className="py-16 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { num: '4.9/5',  label: 'Note moyenne',       icon: '⭐' },
                { num: '32+',    label: 'Outils vérifiés',    icon: '✅' },
                { num: '100%',   label: 'Indépendants',       icon: '🔒' },
              ].map((s, i) => (
                <div key={i} className="gradient-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-all">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">{s.num}</div>
                  <div className="text-gray-400 text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Blog preview ── */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">📰 Guides & Conseils</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Les derniers articles</h2>
              <p className="text-gray-400 max-w-lg mx-auto">Comparatifs approfondis et guides pratiques pour choisir les bons outils.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {BLOG_PREVIEWS.map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`}
                  className="gradient-card rounded-2xl p-6 flex flex-col hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-purple-900/30 border border-purple-500/20 text-purple-300 px-3 py-1 rounded-full">{post.tag}</span>
                    <span className="text-xs text-gray-500">⏱ {post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base mb-3 group-hover:text-purple-300 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-purple-400 text-sm font-semibold">
                    Lire l'article <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/blog" className="gradient-card border border-purple-500/30 text-white px-8 py-3 rounded-xl font-semibold hover:border-purple-500/60 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                Voir tous les articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Témoignages ── */}
        <section className="py-20 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">💬 Témoignages</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Ce qu'en disent nos lecteurs</h2>
              <p className="text-gray-400 max-w-lg mx-auto">Des entrepreneurs et créateurs qui ont trouvé les bons outils grâce à Thecreamai.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { stars: 5, text: "Grâce à Thecreamai, j'ai trouvé le bon hébergeur en 10 minutes. Les comparatifs sont clairs et les avis fiables. Je recommande !", name: "Sarah M.", role: "Freelance Web Designer", initial: "S", color: "from-purple-600 to-pink-500" },
                { stars: 5, text: "Le meilleur site pour comparer les VPN. J'ai passé des heures ailleurs sans décision — ici en 5 min c'était réglé. NordVPN au final, parfait !", name: "Thomas K.", role: "Développeur & Digital Nomad", initial: "T", color: "from-blue-600 to-purple-600" },
                { stars: 5, text: "J'utilise Thecreamai comme référence avant chaque achat d'outil IA. La sélection est sérieuse et les notes honnêtes. Rien à redire !", name: "Amélie R.", role: "Créatrice de contenu", initial: "A", color: "from-pink-600 to-purple-600" },
              ].map((t, i) => (
                <div key={i} className="gradient-card rounded-2xl p-6 hover:-translate-y-2 hover:border-purple-500/50 transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed italic mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-white`}>{t.initial}</div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">❓ FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-gray-400 max-w-lg mx-auto">Tout ce que vous devez savoir sur notre méthode et nos recommandations.</p>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/pourquoi-nous" className="text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors inline-flex items-center gap-1.5">
                En savoir plus sur notre méthode <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="relative gradient-card rounded-3xl p-12 text-center border-purple-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/10 pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">📧 Newsletter hebdo</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Les meilleurs outils dans votre boîte</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">2 800+ créateurs et entrepreneurs reçoivent notre sélection chaque semaine. Gratuit, sans spam, désabonnement en 1 clic.</p>
                <Link href="/newsletter" className="gradient-purple text-white px-10 py-4 rounded-xl font-bold text-base shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:-translate-y-0.5 transition-all inline-block">
                  S'abonner gratuitement →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
