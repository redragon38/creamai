import { X, Star, ExternalLink, Check, AlertCircle, Users, Target } from 'lucide-react';
import { useEffect } from 'react';

export default function ToolModal({ tool, onClose }) {
  useEffect(() => {
<<<<<<< HEAD
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
=======
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
<<<<<<< HEAD
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!tool) return null;

  const renderStars = (rating) => [...Array(5)].map((_, i) => (
    <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
  ));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" data-testid="tool-modal">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — bottom sheet sur mobile, centré sur desktop */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Handle mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          data-testid="close-modal-btn"
          aria-label="Fermer"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Header */}
        <div className="p-5 sm:p-8 border-b border-gray-100">
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Logo */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
              {tool.logo ? (
                <img src={tool.logo} alt={tool.name} className="max-w-full max-h-full object-contain" loading="lazy" />
              ) : (
                <span className="text-3xl sm:text-4xl">🛠️</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap pr-10">
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900">{tool.name}</h2>
                {tool.verified && (
                  <span className="bg-green-50 border border-green-200 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0">✓ Vérifié</span>
                )}
              </div>

              {tool.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(tool.rating.value)}</div>
                  <span className="text-gray-500 text-xs sm:text-sm">{tool.rating.value}/5 ({tool.rating.count} avis)</span>
                </div>
              )}

              <p className="text-gray-600 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                {tool.highlight || tool.short}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {(tool.categories || []).map((cat, idx) => (
                  <span key={idx} className="bg-purple-50 border border-purple-200 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
<<<<<<< HEAD
        <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
          {tool.description && (
            <div>
              <h3 className="text-base sm:text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" /> Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{tool.description.replace(/__/g, '')}</p>
            </div>
          )}

          {tool.strengths?.length > 0 && (
            <div>
              <h3 className="text-base sm:text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> Points forts
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {tool.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{s.replace(/__/g, '')}</span>
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
                  </li>
                ))}
              </ul>
            </div>
          )}

<<<<<<< HEAD
          {tool.limitations?.length > 0 && (
            <div>
              <h3 className="text-base sm:text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" /> Limites
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {tool.limitations.map((l, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{l.replace(/__/g, '')}</span>
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
                  </li>
                ))}
              </ul>
            </div>
          )}

<<<<<<< HEAD
          {tool.idealFor?.length > 0 && (
            <div>
              <h3 className="text-base sm:text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" /> Idéal pour
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {tool.idealFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item.replace(/__/g, '')}</span>
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
                  </li>
                ))}
              </ul>
            </div>
          )}

<<<<<<< HEAD
          {tool.verdict && (
            <div className="bg-purple-50 rounded-xl p-4 sm:p-6 border border-purple-100">
              <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-gray-900">Notre verdict</h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{tool.verdict.replace(/__/g, '')}</p>
            </div>
          )}

          {tool.faq?.length > 0 && (
            <div>
              <h3 className="text-base sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Questions fréquentes</h3>
              <div className="space-y-3">
                {tool.faq.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-1.5 text-gray-900 text-sm sm:text-base">{item.q}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.a}</p>
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

<<<<<<< HEAD
        {/* Footer sticky sur mobile */}
        <div className="sticky bottom-0 p-4 sm:p-8 border-t border-gray-100 bg-white safe-bottom">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">{tool.price || 'Gratuit'}</div>
              {tool.trial && <span className="text-gray-500 text-xs sm:text-sm font-medium">✓ Essai gratuit disponible</span>}
            </div>
            <a
              href={tool.website || tool.affiliateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-purple text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all min-h-[52px]"
              data-testid="visit-website-btn"
            >
              <span>Visiter le site</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
