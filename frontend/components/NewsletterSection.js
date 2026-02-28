import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setEmail(''); }, 4000);
  };

  return (
    <section id="newsletter" className="py-20">
      <div className="container mx-auto px-6">
        <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/10 border border-purple-500/30 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/15 rounded-full filter blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Ne ratez aucun bon outil</h2>
            <p className="text-gray-900 mb-8 max-w-md mx-auto">Chaque semaine, recevez la sélection des meilleurs outils, offres exclusives et guides pratiques — directement dans votre boîte mail.</p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 bg-white border border-purple-500/30 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                />
                <button type="submit" className="gradient-purple text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                  S'abonner →
                </button>
              </form>
            ) : (
              <div className="text-gray-900 font-bold text-lg py-3">🎉 Merci ! Vous êtes bien inscrit(e) !</div>
            )}
            <p className="text-gray-600 text-xs mt-4">✅ Gratuit · Zéro spam · Désabonnement en 1 clic</p>
          </div>
        </div>
      </div>
    </section>
  );
}
