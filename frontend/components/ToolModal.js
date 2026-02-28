import { X, Star, ExternalLink, Check, AlertCircle, Users, Target } from 'lucide-react';
import { useEffect } from 'react';

export default function ToolModal({ tool, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-5 h-5 ${i < fullStars ? 'text-gray-900 fill-yellow-400' : 'text-gray-900'}`}
        />
      );
    }
    return stars;
  };

  if (!tool) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-testid="tool-modal"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-900 hover:text-gray-900 transition-colors z-10"
          data-testid="close-modal-btn"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-8 border-b border-purple-900/30">
          <div className="flex items-start gap-6">
            {tool.logo ? (
              <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center p-3 flex-shrink-0">
                <img 
                  src={tool.logo} 
                  alt={tool.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-2xl gradient-purple flex items-center justify-center text-4xl flex-shrink-0">
                🛠️
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">{tool.name}</h2>
                {tool.verified && (
                  <span className="bg-green-900/30 border border-green-500/30 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                    ✓ Vérifié
                  </span>
                )}
              </div>
              
              {tool.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(tool.rating.value)}</div>
                  <span className="text-gray-900">
                    {tool.rating.value}/5 ({tool.rating.count} avis)
                  </span>
                </div>
              )}
              
              <p className="text-gray-900 text-lg">
                {tool.highlight || tool.short}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {(tool.categories || []).map((cat, idx) => (
                  <span 
                    key={idx}
                    className="bg-purple-900/30 border border-purple-500/30 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Description */}
          {tool.description && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-900" />
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tool.description.replace(/__/g, '')}
              </p>
            </div>
          )}

          {/* Strengths */}
          {tool.strengths && tool.strengths.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-gray-900" />
                Points forts
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{strength.replace(/__/g, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Limitations */}
          {tool.limitations && tool.limitations.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-900" />
                Limites
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.limitations.map((limitation, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{limitation.replace(/__/g, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ideal For */}
          {tool.idealFor && tool.idealFor.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-900" />
                Idéal pour
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tool.idealFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900">{item.replace(/__/g, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verdict */}
          {tool.verdict && (
            <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4">Notre verdict</h3>
              <p className="text-gray-600 leading-relaxed">
                {tool.verdict.replace(/__/g, '')}
              </p>
            </div>
          )}

          {/* FAQ */}
          {tool.faq && tool.faq.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Questions fréquentes</h3>
              <div className="space-y-4">
                {tool.faq.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="bg-[#110822]/50 rounded-xl p-4">
                    <h4 className="font-semibold mb-2 text-gray-900">{item.q}</h4>
                    <p className="text-gray-600 text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-purple-900/30 bg-[#0a0118]/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {tool.price || 'Gratuit'}
              </div>
              {tool.trial && (
                <span className="text-gray-600 text-sm font-semibold">
                  ✓ Essai gratuit disponible
                </span>
              )}
            </div>
            <a 
              href={tool.website || tool.affiliateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-purple text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              data-testid="visit-website-btn"
            >
              <span>Visiter le site</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
