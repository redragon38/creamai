import { Star, ExternalLink, Zap, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CAT_META = {
  'VPN':                       { icon: '🛡️', gradient: 'from-blue-500 to-cyan-400',    accent: '#3b82f6', softBg: '#eff6ff', softText: '#1d4ed8', border: '59,130,246'   },
  'Intelligence artificielle': { icon: '🤖', gradient: 'from-violet-500 to-purple-400', accent: '#7c3aed', softBg: '#f5f3ff', softText: '#5b21b6', border: '139,92,246'  },
  'Hébergement web':           { icon: '🌐', gradient: 'from-emerald-500 to-teal-400',  accent: '#059669', softBg: '#ecfdf5', softText: '#065f46', border: '16,185,129'  },
  'Antivirus':                 { icon: '🦠', gradient: 'from-rose-500 to-orange-400',   accent: '#dc2626', softBg: '#fff1f2', softText: '#9f1239', border: '239,68,68'   },
  'IA générative':             { icon: '✨', gradient: 'from-pink-500 to-violet-400',   accent: '#db2777', softBg: '#fdf2f8', softText: '#9d174d', border: '236,72,153'  },
};
const DEFAULT = { icon: '🛠️', gradient: 'from-purple-500 to-violet-400', accent: '#7c3aed', softBg: '#f5f3ff', softText: '#5b21b6', border: '139,92,246' };

function Stars({ val }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < Math.floor(val || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-100'}`} />
      ))}
    </div>
  );
}

export default function ToolCard({ tool }) {
  const router = useRouter();
  const cat = tool.categories?.[0];
  const m = CAT_META[cat] || DEFAULT;
  const url = tool.affiliateUrl || tool.website || tool.link || '#';

  return (
    <div
      className="group relative bg-white rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      style={{
        boxShadow: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(${m.border},0.06)`,
        border: `1px solid rgba(${m.border},0.12)`,
      }}
      onClick={() => router.push(`/tool/${tool.id}`)}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 12px 36px rgba(${m.border},0.2), 0 2px 8px rgba(0,0,0,0.06)`;
        e.currentTarget.style.borderColor = `rgba(${m.border},0.28)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(${m.border},0.06)`;
        e.currentTarget.style.borderColor = `rgba(${m.border},0.12)`;
      }}
    >
      {/* Barre top */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${m.gradient} flex-shrink-0`} />

      {/* Fond coloré subtil */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${m.softBg}90 0%, transparent 100%)` }} />

      <div className="relative p-5 sm:p-6 flex flex-col flex-1 gap-4">

        {/* Logo + badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="relative flex-shrink-0">
            <div
              className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
              style={{
                border: `1.5px solid rgba(${m.border},0.18)`,
                boxShadow: `0 4px 14px rgba(${m.border},0.14), 0 1px 3px rgba(0,0,0,0.06)`,
              }}
            >
              {tool.logo ? (
                <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-1.5" loading="lazy"
                  onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML=`<span style="font-size:24px">${m.icon}</span>`; }} />
              ) : <span style={{ fontSize: '24px' }}>{m.icon}</span>}
            </div>
            {tool.featured && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px]"
                style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', boxShadow: '0 2px 6px rgba(245,158,11,0.45)' }}>
                ★
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            {tool.verified && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ color:'#059669', background:'#ecfdf5', border:'1px solid #a7f3d0' }}>
                <Check className="w-2.5 h-2.5" /> Vérifié
              </span>
            )}
            {tool.trial && (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ color:'#0369a1', background:'#e0f2fe', border:'1px solid #bae6fd' }}>
                <Zap className="w-2.5 h-2.5" /> Essai gratuit
              </span>
            )}
          </div>
        </div>

        {/* Nom + prix */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold text-gray-900 leading-snug transition-colors duration-200 group-hover:text-gray-700">
            {tool.name}
          </h3>
          {tool.price && (
            <span className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
              style={{ color: m.softText, background: m.softBg, border: `1px solid rgba(${m.border},0.18)` }}>
              {tool.price}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1" style={{ lineHeight:'1.65' }}>
          {tool.short || tool.highlight || ''}
        </p>

        {/* Rating */}
        {tool.rating && (
          <div className="flex items-center gap-2">
            <Stars val={tool.rating.value} />
            <span className="text-xs font-bold" style={{ color: m.accent }}>{tool.rating.value}</span>
            <span className="text-[10px] text-gray-300">·</span>
            <span className="text-[10px] text-gray-400">{tool.rating.count} avis</span>
          </div>
        )}

        {/* Séparateur */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, rgba(${m.border},0.12), transparent)` }} />

        {/* Boutons */}
        <div className="flex gap-2">
          <Link
            href={`/tool/${tool.id}`}
            onClick={e => e.stopPropagation()}
            className="flex-1 py-2.5 rounded-xl font-semibold text-[11px] flex items-center justify-center gap-1.5 min-h-[40px] transition-all duration-200"
            style={{ color:'#6b7280', background:'#f9fafb', border:'1px solid #e5e7eb' }}
            onMouseEnter={e => { e.currentTarget.style.background='#f3f4f6'; e.currentTarget.style.color='#374151'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#f9fafb'; e.currentTarget.style.color='#6b7280'; }}
          >
            Voir la fiche
          </Link>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 py-2.5 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 min-h-[40px] text-white transition-all duration-200"
            style={{ background:`linear-gradient(135deg, ${m.accent}dd, ${m.accent})`, boxShadow:`0 4px 14px rgba(${m.border},0.28)` }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 7px 22px rgba(${m.border},0.42)`; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow=`0 4px 14px rgba(${m.border},0.28)`; e.currentTarget.style.transform=''; }}
          >
            Site officiel <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
