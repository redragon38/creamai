import { Star, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ToolCard({ tool, onSelect }) {
  const router = useRouter();

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
    ));
  };

  const getEmoji = (cat) => ({ 'VPN': '🛡️', 'Intelligence artificielle': '🤖', 'Hébergement web': '🌐', 'Antivirus': '🦠' }[cat] || '🛠️');

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    router.push(`/tool/${tool.id}`);
  };

  const handleVisitSite = (e) => {
    e.stopPropagation();
    const url = tool.website || tool.affiliateUrl || tool.link;
    if (url) window.open(url, '_blank', 'noopener');
  };

  return (
    <div
      className="gradient-card rounded-2xl p-6 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all cursor-pointer group relative overflow-hidden"
      data-testid={`tool-card-${tool.id}`}
      onClick={handleCardClick}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none rounded-2xl" />

      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
          {tool.logo ? (
            <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-1.5"
              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="text-2xl">${getEmoji(tool.categories?.[0])}</span>`; }} />
          ) : (
            <span className="text-2xl">{getEmoji(tool.categories?.[0])}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 items-end">
          {tool.verified && <span className="bg-green-500/15 border border-green-500/25 text-green-400 px-2.5 py-0.5 rounded-full text-xs font-bold">✓ Vérifié</span>}
          {tool.featured && <span className="bg-yellow-500/15 border border-yellow-500/25 text-yellow-400 px-2.5 py-0.5 rounded-full text-xs font-bold">🏆 Top</span>}
          {tool.trial && <span className="bg-cyan-500/15 border border-cyan-500/25 text-cyan-400 px-2.5 py-0.5 rounded-full text-xs font-bold">🆓 Essai</span>}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{tool.name}</h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 min-h-[40px]">{tool.short || tool.highlight || tool.description || ''}</p>

      {tool.rating && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">{renderStars(tool.rating.value)}</div>
          <span className="text-xs text-gray-400">{tool.rating.value} ({tool.rating.count} avis)</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(tool.categories || []).slice(0, 2).map((cat, idx) => (
          <span key={idx} className="bg-purple-900/30 border border-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full text-xs font-medium">{cat}</span>
        ))}
        {tool.price && <span className="bg-green-900/20 border border-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full text-xs font-medium">{tool.price}</span>}
      </div>

      <div className="mt-4 pt-4 border-t border-purple-900/30">
        <button
          onClick={handleVisitSite}
          className="w-full gradient-purple text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all text-sm"
        >
          Voir le site <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
