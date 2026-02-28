import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <SEO title="Page non trouvée — Thecreamai" description="Cette page n'existe pas." noindex />
      <Header />
      <main className="container mx-auto px-6 py-32 text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-gray-900 text-xl mb-10">Cette page n'existe pas ou a été déplacée.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="gradient-purple text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-purple-500/40 hover:-translate-y-0.5 transition-all">← Retour à l'accueil</Link>
          <Link href="/outils" className="gradient-card border border-purple-500/30 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:border-purple-500/60 hover:-translate-y-0.5 transition-all">Voir les outils</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
