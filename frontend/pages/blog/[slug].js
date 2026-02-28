import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft } from 'lucide-react';

const ARTICLES = {
  'meilleur-vpn-2025': {
    category: 'VPN', catColor: 'text-gray-600 bg-blue-900/20 border-blue-500/20',
    date: '18 fév. 2025', readTime: '8 min', emoji: '🛡️',
    title: 'Meilleur VPN 2025 : notre classement après 6 semaines de tests',
    intro: 'Nous avons testé 10 VPN pendant 6 semaines sur des critères précis : vitesse, sécurité, compatibilité streaming et rapport qualité-prix.',
    sections: [
      { title: '🥇 NordVPN — Notre top choix', content: 'NordVPN reste le meilleur VPN en 2025. Avec plus de 6 000 serveurs dans 111 pays, des vitesses exceptionnelles et une politique zéro log auditée, c\'est la référence absolue. Son protocole NordLynx offre les meilleures performances du marché.' },
      { title: '🥈 ExpressVPN — Le plus rapide', content: 'ExpressVPN se distingue par sa vitesse incomparable et son infrastructure Lightway. Disponible sur 105 pays, il excelle pour le streaming et le contournement géographique.' },
      { title: '🥉 Proton VPN — Le plus sécurisé', content: 'Proton VPN est le choix idéal pour les utilisateurs soucieux de leur vie privée. Basé en Suisse, open source et audité indépendamment, il propose même une version gratuite sans limite de bande passante.' },
      { title: '✅ Notre verdict', content: 'Pour un usage général, NordVPN reste imbattable. Pour le streaming, ExpressVPN prend l\'avantage. Pour la confidentialité maximale, Proton VPN est votre meilleur allié.' },
    ],
  },
  'hebergement-wordpress-2025': {
    category: 'Hébergement', catColor: 'text-gray-600 bg-emerald-900/20 border-emerald-500/20',
    date: '11 fév. 2025', readTime: '6 min', emoji: '🌐',
    title: 'Quel hébergeur WordPress choisir en 2025 ? Guide complet',
    intro: 'Le choix de l\'hébergeur est l\'une des décisions les plus importantes pour votre site WordPress. Performance, support, prix… on a tout comparé.',
    sections: [
      { title: '🏆 o2switch — Le meilleur rapport qualité-prix', content: 'o2switch propose une offre unique illimitée à 7,99€/mois. Hébergé en France avec un support en français 7j/7, c\'est la référence pour les créateurs francophones.' },
      { title: '⚡ Kinsta — Le plus performant', content: 'Kinsta utilise l\'infrastructure Google Cloud et propose des performances hors normes. Avec CDN intégré et sauvegardes automatiques, c\'est l\'hébergeur premium pour les sites à fort trafic.' },
      { title: '💰 Hostinger — Le moins cher', content: 'Hostinger propose des offres à partir de 2,99€/mois avec LiteSpeed Cache intégré. Pour un blog ou site vitrine, difficile de faire mieux rapport qualité-prix.' },
      { title: '✅ Notre recommandation', content: 'Budget limité → Hostinger. PME et créateurs → o2switch. Site pro à fort trafic → Kinsta.' },
    ],
  },
  'antivirus-gratuit-vs-payant': {
    category: 'Antivirus', catColor: 'text-gray-600 bg-red-900/20 border-red-500/20',
    date: '4 fév. 2025', readTime: '5 min', emoji: '🦠',
    title: 'Antivirus gratuit vs payant : vraiment une différence en 2025 ?',
    intro: 'Windows Defender suffit-il ? Vaut-il vraiment la peine de payer pour un antivirus en 2025 ? On fait le point honnêtement.',
    sections: [
      { title: 'Windows Defender en 2025', content: 'Microsoft a considérablement amélioré Windows Defender. Il offre une protection de base solide contre les menaces courantes. Pour un usage basique, il peut suffire.' },
      { title: 'Ce que les antivirus payants apportent', content: 'Les solutions payantes ajoutent : protection avancée en temps réel, VPN intégré, gestionnaire de mots de passe, surveillance du dark web et support dédié.' },
      { title: '🏆 Bitdefender — Notre recommandation', content: 'Bitdefender Total Security offre la meilleure protection selon les tests indépendants AV-Test. Impact minimal sur les performances et interface intuitive.' },
      { title: '✅ Notre verdict', content: 'Données sensibles ou e-commerce : investissez dans un antivirus payant. Usage basique : Windows Defender + Malwarebytes Free est un duo efficace et gratuit.' },
    ],
  },
  'outils-ia-productivite': {
    category: 'IA', catColor: 'text-gray-600 bg-purple-900/20 border-purple-500/20',
    date: '28 jan. 2025', readTime: '7 min', emoji: '🤖',
    title: 'Top 5 outils IA pour booster votre productivité en 2025',
    intro: 'L\'IA a transformé la façon de travailler des créateurs et entrepreneurs. Voici les outils qui font vraiment la différence.',
    sections: [
      { title: '1. ClickUp AI — Gestion de projet boostée', content: 'ClickUp intègre l\'IA directement dans votre workflow : résumés de tâches automatiques, génération de sous-tâches, rédaction de descriptions de projet.' },
      { title: '2. Emergent — Agents IA autonomes', content: 'Emergent permet de créer des agents IA qui exécutent des tâches complexes de manière autonome : recherche web, analyse de données, génération de rapports.' },
      { title: '3. Notion AI — Rédaction et synthèse', content: 'Notion AI transforme votre base de connaissances en assistant intelligent. Résumez, rédigez, traduisez — le tout sans quitter Notion.' },
      { title: '✅ Notre sélection finale', content: 'Pour débuter : ClickUp AI ou Notion AI. Pour automatiser des processus complexes : Emergent. Commencez par identifier vos tâches répétitives et testez l\'IA progressivement.' },
    ],
  },
  'vpn-streaming-netflix': {
    category: 'VPN', catColor: 'text-gray-900 bg-blue-900/20 border-blue-500/20',
    date: '21 jan. 2025', readTime: '4 min', emoji: '📺',
    title: 'Les meilleurs VPN pour Netflix, Disney+ et le streaming en 2025',
    intro: 'Tous les VPN ne contournent pas les blocages géographiques de Netflix ou Disney+. On a testé les 10 principaux.',
    sections: [
      { title: 'Pourquoi les VPN sont bloqués', content: 'Netflix et Disney+ investissent massivement pour détecter les adresses IP des VPN. Les services qui contournent leurs restrictions doivent constamment renouveler leurs serveurs.' },
      { title: '🥇 NordVPN — Le plus fiable', content: 'NordVPN propose des serveurs optimisés streaming qui contournent Netflix US, UK, Japan et plus encore. Avec SmartPlay intégré, la configuration est automatique.' },
      { title: '🥈 ExpressVPN — La meilleure vitesse', content: 'Pour regarder en 4K sans buffer, ExpressVPN est imbattable. Ses serveurs optimisés offrent des débits constants même depuis des pays éloignés.' },
      { title: '✅ Conclusion', content: 'NordVPN et ExpressVPN sont les deux seuls VPN que nous recommandons sans réserve pour le streaming en 2025.' },
    ],
  },
  'hebergement-petit-budget': {
    category: 'Hébergement', catColor: 'text-gray-900 bg-emerald-900/20 border-emerald-500/20',
    date: '14 jan. 2025', readTime: '5 min', emoji: '💸',
    title: "Héberger son site pour moins de 3€/mois : c'est possible ?",
    intro: 'Budget serré mais envie d\'un site pro ? On a passé au crible les hébergeurs les plus abordables du marché.',
    sections: [
      { title: 'Ce qu\'on peut attendre à moins de 3€/mois', content: 'À ce prix : hébergement mutualisé, 1 à 5 sites, SSL gratuit, support basique. Performances correctes pour un trafic modéré (moins de 1 000 visites/jour).' },
      { title: '🏆 Hostinger — 2,99€/mois', content: 'Hostinger propose l\'offre la plus complète à ce prix : LiteSpeed cache, cPanel, migrations gratuites et support 24h/24. Performances étonnantes pour ce tarif.' },
      { title: 'IONOS — 1€/mois (1ère année)', content: 'IONOS propose une offre d\'appel à 1€/mois pour la première année. Bonne porte d\'entrée pour tester son projet à moindre coût.' },
      { title: '✅ Nos recommandations', content: 'Pour lancer un blog ou site vitrine avec budget minimal : Hostinger est notre N°1. Évitez les hébergeurs inconnus qui promettent l\'illimité pour 1€.' },
    ],
  },
};

export async function getStaticPaths() {
  return {
    paths: Object.keys(ARTICLES).map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = ARTICLES[params.slug] || null;
  return { props: { article, slug: params.slug } };
}

export default function ArticlePage({ article, slug }) {
  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <Link href="/blog" className="gradient-purple text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Retour au blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${article.title} — Thecreamai`}
        description={article.intro}
        canonical={`https://thecreamai.com/blog/${slug}`}
      />
      <Header />
      <main>
        <section className="relative py-16 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-6 max-w-3xl relative z-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-600 mb-8 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" /> Retour au blog
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${article.catColor}`}>{article.category}</span>
              <span className="text-gray-600 text-sm">{article.date} · {article.readTime} de lecture</span>
            </div>
            <div className="text-6xl mb-6">{article.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-purple-500 pl-5">{article.intro}</p>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-24 max-w-3xl">
          <div className="space-y-6">
            {article.sections.map((section, i) => (
              <div key={i} className="gradient-card rounded-2xl p-8">
                <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 pt-10 border-t border-purple-900/30 text-center">
            <Link href="/blog" className="gradient-card border border-purple-500/30 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:border-purple-500/60 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Voir tous les articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
