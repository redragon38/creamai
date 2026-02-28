export default function WhySection() {
  const items = [
    { icon: '🔍', title: 'Sélection rigoureuse', desc: 'Chaque outil est testé manuellement selon des critères précis : performance, rapport qualité-prix, support et fiabilité.' },
    { icon: '⭐', title: 'Avis authentiques', desc: 'Les notes sont basées sur des milliers d\'avis réels. Pas de faux témoignages, pas de manipulation.' },
    { icon: '🚀', title: 'Mis à jour régulièrement', desc: 'Notre équipe surveille l\'évolution des outils pour vous garantir une information toujours à jour.' },
    { icon: '💡', title: 'Comparatifs détaillés', desc: 'Forces, faiblesses, prix — tout est là pour que vous preniez la bonne décision en un coup d\'œil.' },
  ];

  return (
    <section id="why" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-purple-900/30 border border-purple-500/30 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Des recommandations en qui<br />vous pouvez avoir confiance</h2>
          <p className="text-gray-900 max-w-xl mx-auto">Chaque outil est testé et sélectionné pour répondre aux besoins réels des créateurs et entrepreneurs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="gradient-card rounded-2xl p-6 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-2xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
