import React from 'react';

export default function PetAvatar({ petId = 'dog', size = 'normal', isHappy = false, accessory = null }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const dimClass = isSmall ? 'w-16 h-16' : isLarge ? 'w-36 h-36 md:w-44 md:h-44' : 'w-24 h-24 md:w-28 md:h-28';

  return (
    <div className={`relative inline-flex items-center justify-center ${dimClass} transition-transform duration-300 ${isHappy ? 'animate-happy-jump' : ''}`}>
      {/* Accessory on top if present */}
      {accessory && (
        <span className="absolute -top-3 right-0 text-2xl md:text-3xl z-10 filter drop-shadow">
          {accessory.icon}
        </span>
      )}

      {/* SVG Pets */}
      {petId === 'dog' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Ears */}
          <ellipse cx="28" cy="42" rx="14" ry="24" fill="#b45309" transform="rotate(-15 28 42)" className="animate-ear-wiggle origin-top" />
          <ellipse cx="92" cy="42" rx="14" ry="24" fill="#b45309" transform="rotate(15 92 42)" className="animate-ear-wiggle origin-top" />
          {/* Head */}
          <circle cx="60" cy="65" r="38" fill="#f59e0b" />
          <ellipse cx="60" cy="50" rx="20" ry="12" fill="#fbbf24" />
          {/* Eyes */}
          <circle cx="48" cy="58" r="5" fill="#1e293b" />
          <circle cx="72" cy="58" r="5" fill="#1e293b" />
          <circle cx="50" cy="56" r="1.8" fill="#ffffff" />
          <circle cx="74" cy="56" r="1.8" fill="#ffffff" />
          {/* Snout */}
          <ellipse cx="60" cy="74" rx="16" ry="12" fill="#fef3c7" />
          <ellipse cx="60" cy="68" rx="6" ry="4" fill="#78350f" />
          {isHappy ? (
            <path d="M52 74 Q60 84 68 74" fill="#ef4444" stroke="#78350f" strokeWidth="2.5" />
          ) : (
            <path d="M53 74 Q60 80 67 74" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {/* Cheeks */}
          <circle cx="36" cy="68" r="4" fill="#f87171" opacity="0.5" />
          <circle cx="84" cy="68" r="4" fill="#f87171" opacity="0.5" />
        </svg>
      )}

      {petId === 'cat' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Ears */}
          <polygon points="30,55 42,20 60,40" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
          <polygon points="90,55 78,20 60,40" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
          {/* Head */}
          <circle cx="60" cy="66" r="36" fill="#fbcfe8" stroke="#f472b6" strokeWidth="3" />
          {/* Eyes */}
          <ellipse cx="48" cy="62" rx="4.5" ry="6" fill="#1e293b" />
          <ellipse cx="72" cy="62" rx="4.5" ry="6" fill="#1e293b" />
          <circle cx="49" cy="60" r="1.8" fill="#ffffff" />
          <circle cx="73" cy="60" r="1.8" fill="#ffffff" />
          {/* Whiskers */}
          <line x1="28" y1="68" x2="14" y2="66" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="73" x2="16" y2="76" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="68" x2="106" y2="66" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="73" x2="104" y2="76" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          {/* Nose & Mouth */}
          <polygon points="57,70 63,70 60,74" fill="#db2777" />
          <path d="M55 76 Q60 80 65 76" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="72" r="4" fill="#f43f5e" opacity="0.4" />
          <circle cx="80" cy="72" r="4" fill="#f43f5e" opacity="0.4" />
        </svg>
      )}

      {petId === 'rabbit' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Long Ears */}
          <ellipse cx="42" cy="28" rx="8" ry="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" className="animate-ear-wiggle" />
          <ellipse cx="42" cy="28" rx="4" ry="18" fill="#fbcfe8" />
          <ellipse cx="78" cy="28" rx="8" ry="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" className="animate-ear-wiggle" />
          <ellipse cx="78" cy="28" rx="4" ry="18" fill="#fbcfe8" />
          {/* Head */}
          <circle cx="60" cy="72" r="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="48" cy="68" r="4.5" fill="#475569" />
          <circle cx="72" cy="68" r="4.5" fill="#475569" />
          <circle cx="50" cy="66" r="1.5" fill="#ffffff" />
          <circle cx="74" cy="66" r="1.5" fill="#ffffff" />
          {/* Nose & Mouth */}
          <ellipse cx="60" cy="76" rx="3.5" ry="2.5" fill="#f472b6" />
          <path d="M56 80 Q60 84 64 80" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          {/* Teeth */}
          <rect x="58" y="80" width="4" height="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="38" cy="76" r="5" fill="#f472b6" opacity="0.3" />
          <circle cx="82" cy="76" r="5" fill="#f472b6" opacity="0.3" />
        </svg>
      )}

      {petId === 'panda' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Black Ears */}
          <circle cx="34" cy="38" r="14" fill="#1e293b" />
          <circle cx="86" cy="38" r="14" fill="#1e293b" />
          {/* White Head */}
          <circle cx="60" cy="68" r="36" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          {/* Eye Patches */}
          <ellipse cx="46" cy="64" rx="9" ry="11" fill="#1e293b" transform="rotate(-15 46 64)" />
          <ellipse cx="74" cy="64" rx="9" ry="11" fill="#1e293b" transform="rotate(15 74 64)" />
          {/* Eyes */}
          <circle cx="46" cy="64" r="3" fill="#ffffff" />
          <circle cx="74" cy="64" r="3" fill="#ffffff" />
          {/* Nose & Mouth */}
          <ellipse cx="60" cy="76" rx="6" ry="4" fill="#1e293b" />
          <path d="M55 82 Q60 86 65 82" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="36" cy="76" r="5" fill="#fb7185" opacity="0.4" />
          <circle cx="84" cy="76" r="5" fill="#fb7185" opacity="0.4" />
        </svg>
      )}

      {petId === 'fox' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Pointy Ears */}
          <polygon points="26,50 35,16 56,40" fill="#ea580c" />
          <polygon points="34,42 38,24 48,36" fill="#1e293b" />
          <polygon points="94,50 85,16 64,40" fill="#ea580c" />
          <polygon points="86,42 82,24 72,36" fill="#1e293b" />
          {/* Orange Head */}
          <ellipse cx="60" cy="66" rx="36" ry="32" fill="#f97316" />
          {/* White Cheek Tufts */}
          <path d="M30 68 Q44 86 60 86 Q76 86 90 68 Q75 60 60 70 Q45 60 30 68 Z" fill="#ffffff" />
          {/* Eyes */}
          <ellipse cx="47" cy="60" rx="4" ry="5" fill="#1e293b" />
          <ellipse cx="73" cy="60" rx="4" ry="5" fill="#1e293b" />
          <circle cx="49" cy="58" r="1.5" fill="#ffffff" />
          <circle cx="75" cy="58" r="1.5" fill="#ffffff" />
          {/* Cute Black Nose */}
          <polygon points="57,75 63,75 60,80" fill="#1e293b" />
        </svg>
      )}

      {petId === 'koala' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Fluffy Round Ears */}
          <circle cx="28" cy="46" r="18" fill="#94a3b8" />
          <circle cx="28" cy="46" r="11" fill="#f1f5f9" />
          <circle cx="92" cy="46" r="18" fill="#94a3b8" />
          <circle cx="92" cy="46" r="11" fill="#f1f5f9" />
          {/* Head */}
          <circle cx="60" cy="68" r="34" fill="#cbd5e1" />
          {/* Big Koala Nose */}
          <ellipse cx="60" cy="70" rx="9" ry="14" fill="#1e293b" />
          {/* Eyes */}
          <circle cx="44" cy="60" r="3.5" fill="#1e293b" />
          <circle cx="76" cy="60" r="3.5" fill="#1e293b" />
          <circle cx="45" cy="58" r="1.2" fill="#ffffff" />
          <circle cx="77" cy="58" r="1.2" fill="#ffffff" />
          <circle cx="36" cy="74" r="4" fill="#fb7185" opacity="0.4" />
          <circle cx="84" cy="74" r="4" fill="#fb7185" opacity="0.4" />
        </svg>
      )}
    </div>
  );
}
