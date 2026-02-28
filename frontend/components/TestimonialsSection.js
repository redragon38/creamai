export default function TestimonialsSection() {
  const testimonials = [
    { stars: 5, text: "Grâce à Thecreamai, j'ai trouvé le bon hébergeur en 10 minutes. Les comparatifs sont clairs et les avis fiables. Je recommande !", name: "Sarah M.", role: "Freelance Web Designer", initial: "S", color: "from-purple-600 to-pink-500" },
    { stars: 5, text: "Le meilleur site pour comparer les VPN. J'ai passé des heures ailleurs sans décision — ici en 5 min c'était réglé.", name: "Thomas K.", role: "Développeur & Digital Nomad", initial: "T", color: "from-blue-600 to-purple-600" },
    { stars: 5, text: "J'utilise Thecreamai comme référence avant chaque achat d'outil IA. La sélection est sérieuse et les notes honnêtes.", name: "Amélie R.", role: "Créatrice de contenu", initial: "A", color: "from-pink-600 to-purple-600" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ce qu'en disent nos lecteurs</h2>
          <p className="text-gray-400 max-w-lg mx-auto">Des entrepreneurs et créateurs qui ont trouvé les bons outils grâce à Thecreamai.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="gradient-card rounded-2xl p-6 hover:-translate-y-2 hover:border-purple-500/50 transition-all">
              <div className="text-yellow-400 text-lg mb-4">{'★'.repeat(t.stars)}</div>
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
  );
}
