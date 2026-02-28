import fs from 'fs';
import path from 'path';
import Top10Page from '../components/Top10Page';

const META = {
  label: 'Hébergement Web',
  catFilter: 'Hébergement web',
  icon: '🌐',
  color: 'from-emerald-600 to-green-400',
  colorLight: 'from-emerald-50 to-green-50',
  border: 'border-emerald-200',
  badge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  desc: 'Les meilleurs hébergeurs web pour lancer et gérer vos projets en ligne en 2025.',
};

const OTHERS = [
  { href: '/top-10-intelligence-artificielle', label: 'Top 10 IA', icon: '🤖' },
  { href: '/top-10-vpn', label: 'Top 10 VPN', icon: '🛡️' },
  { href: '/top-10-antivirus', label: 'Top 10 Antivirus', icon: '🦠' },
];

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'tools.json');
  const allTools = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tools = allTools
    .filter(t => (t.categories || []).includes(META.catFilter))
    .sort((a, b) => (b.rating?.value || 0) - (a.rating?.value || 0))
    .slice(0, 10);
  return { props: { tools } };
}

export default function Top10Hebergement({ tools }) {
  return (
    <Top10Page
      tools={tools}
      meta={META}
      others={OTHERS}
      seo={{
        title: 'Top 10 Hébergement Web 2025 — Classement & Comparatif',
        description: `Découvrez le Top 10 des meilleurs hébergeurs web en 2025. ${META.desc}`,
        canonical: 'https://thecreamai.com/top-10-hebergement-web',
        keywords: 'top 10 hebergement web, meilleur hebergeur 2025, comparatif hebergement',
      }}
    />
  );
}
