export default function ToolCard({ tool }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">⯨</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-600">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="gradient-card rounded-2xl p-6 hover:scale-105 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/30 transition-all cursor-pointer group">
      {/* Header with Logo and Badge */}
      <div className="flex items-start justify-between mb-4">
        {tool.logo ? (
          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2">
            <img 
              src={tool.logo} 
              alt={tool.name} 
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="text-3xl">🛠️</span>';
                e.target.parentElement.classList.remove('bg-white');
                e.target.parentElement.classList.add('gradient-purple');
              }}
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl gradient-purple flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            🛠️
          </div>
        )}
        {tool.verified && (
          <span className="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
            ✓ Vérifié
          </span>
        )}
      </div>

      {/* Tool Name */}
      <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
        {tool.short || tool.highlight || tool.description || ''}
      </p>

      {/* Rating */}
      {tool.rating && (
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            {renderStars(tool.rating.value)}
          </div>
          <span className="text-sm text-gray-400 ml-2">
            {tool.rating.value} ({tool.rating.count})
          </span>
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(tool.categories || []).slice(0, 3).map((cat, idx) => (
          <span 
            key={idx}
            className="bg-purple-900/30 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Price and Trial */}
      <div className="flex items-center justify-between pt-4 border-t border-purple-900/30">
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
          {tool.price || 'Gratuit'}
        </div>
        {tool.trial && (
          <span className="text-xs text-green-400 font-semibold">
            ✓ Essai gratuit
          </span>
        )}
      </div>
    </div>
  );
}
