export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden" data-testid="hero-section">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-block mb-6">
          <span className="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">
            Solutions professionnelles rapides
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-shadow">
          Libérez la puissance<br />de l'innovation IA
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Découvrez les meilleurs outils IA pour améliorer votre efficacité, 
          renforcer votre prise de décision et proposer des solutions 
          professionnelles plus intelligentes et plus rapides.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a href="#tools" className="gradient-purple text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:-translate-y-1 transition-all inline-block" data-testid="discover-tools-btn">
            Découvrir les outils
          </a>
        </div>
      </div>
    </section>
  );
}
