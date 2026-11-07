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
          <ellipse cx="28" cy="42" rx="14" ry="24" fill="#b45309" transform="rotate(-15 28 42)" className="animate-ear-wiggle origin-top" />
          <ellipse cx="92" cy="42" rx="14" ry="24" fill="#b45309" transform="rotate(15 92 42)" className="animate-ear-wiggle origin-top" />
          <circle cx="60" cy="65" r="38" fill="#f59e0b" />
          <ellipse cx="60" cy="50" rx="20" ry="12" fill="#fbbf24" />
          <circle cx="48" cy="58" r="5" fill="#1e293b" />
          <circle cx="72" cy="58" r="5" fill="#1e293b" />
          <circle cx="50" cy="56" r="1.8" fill="#ffffff" />
          <circle cx="74" cy="56" r="1.8" fill="#ffffff" />
          <ellipse cx="60" cy="74" rx="16" ry="12" fill="#fef3c7" />
          <ellipse cx="60" cy="68" rx="6" ry="4" fill="#78350f" />
          {isHappy ? (
            <path d="M52 74 Q60 84 68 74" fill="#ef4444" stroke="#78350f" strokeWidth="2.5" />
          ) : (
            <path d="M53 74 Q60 80 67 74" fill="none" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
          )}
          <circle cx="36" cy="68" r="4" fill="#f87171" opacity="0.5" />
          <circle cx="84" cy="68" r="4" fill="#f87171" opacity="0.5" />
        </svg>
      )}

      {petId === 'cat' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <polygon points="30,55 42,20 60,40" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
          <polygon points="90,55 78,20 60,40" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
          <circle cx="60" cy="66" r="36" fill="#fbcfe8" stroke="#f472b6" strokeWidth="3" />
          <ellipse cx="48" cy="62" rx="4.5" ry="6" fill="#1e293b" />
          <ellipse cx="72" cy="62" rx="4.5" ry="6" fill="#1e293b" />
          <circle cx="49" cy="60" r="1.8" fill="#ffffff" />
          <circle cx="73" cy="60" r="1.8" fill="#ffffff" />
          <line x1="28" y1="68" x2="14" y2="66" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="73" x2="16" y2="76" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="68" x2="106" y2="66" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="73" x2="104" y2="76" stroke="#9d174d" strokeWidth="2" strokeLinecap="round" />
          <polygon points="57,70 63,70 60,74" fill="#db2777" />
          <path d="M55 76 Q60 80 65 76" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="72" r="4" fill="#f43f5e" opacity="0.4" />
          <circle cx="80" cy="72" r="4" fill="#f43f5e" opacity="0.4" />
        </svg>
      )}

      {petId === 'rabbit' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <ellipse cx="42" cy="28" rx="8" ry="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" className="animate-ear-wiggle" />
          <ellipse cx="42" cy="28" rx="4" ry="18" fill="#fbcfe8" />
          <ellipse cx="78" cy="28" rx="8" ry="24" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" className="animate-ear-wiggle" />
          <ellipse cx="78" cy="28" rx="4" ry="18" fill="#fbcfe8" />
          <circle cx="60" cy="72" r="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="48" cy="68" r="4.5" fill="#475569" />
          <circle cx="72" cy="68" r="4.5" fill="#475569" />
          <circle cx="50" cy="66" r="1.5" fill="#ffffff" />
          <circle cx="74" cy="66" r="1.5" fill="#ffffff" />
          <ellipse cx="60" cy="76" rx="3.5" ry="2.5" fill="#f472b6" />
          <path d="M56 80 Q60 84 64 80" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <rect x="58" y="80" width="4" height="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="38" cy="76" r="5" fill="#f472b6" opacity="0.3" />
          <circle cx="82" cy="76" r="5" fill="#f472b6" opacity="0.3" />
        </svg>
      )}

      {petId === 'panda' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <circle cx="34" cy="38" r="14" fill="#1e293b" />
          <circle cx="86" cy="38" r="14" fill="#1e293b" />
          <circle cx="60" cy="68" r="36" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <ellipse cx="46" cy="64" rx="9" ry="11" fill="#1e293b" transform="rotate(-15 46 64)" />
          <ellipse cx="74" cy="64" rx="9" ry="11" fill="#1e293b" transform="rotate(15 74 64)" />
          <circle cx="46" cy="64" r="3" fill="#ffffff" />
          <circle cx="74" cy="64" r="3" fill="#ffffff" />
          <ellipse cx="60" cy="76" rx="6" ry="4" fill="#1e293b" />
          <path d="M55 82 Q60 86 65 82" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="36" cy="76" r="5" fill="#fb7185" opacity="0.4" />
          <circle cx="84" cy="76" r="5" fill="#fb7185" opacity="0.4" />
        </svg>
      )}

      {petId === 'fox' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <polygon points="26,50 35,16 56,40" fill="#ea580c" />
          <polygon points="34,42 38,24 48,36" fill="#1e293b" />
          <polygon points="94,50 85,16 64,40" fill="#ea580c" />
          <polygon points="86,42 82,24 72,36" fill="#1e293b" />
          <ellipse cx="60" cy="66" rx="36" ry="32" fill="#f97316" />
          <path d="M30 68 Q44 86 60 86 Q76 86 90 68 Q75 60 60 70 Q45 60 30 68 Z" fill="#ffffff" />
          <ellipse cx="47" cy="60" rx="4" ry="5" fill="#1e293b" />
          <ellipse cx="73" cy="60" rx="4" ry="5" fill="#1e293b" />
          <circle cx="49" cy="58" r="1.5" fill="#ffffff" />
          <circle cx="75" cy="58" r="1.5" fill="#ffffff" />
          <polygon points="57,75 63,75 60,80" fill="#1e293b" />
        </svg>
      )}

      {petId === 'koala' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          <circle cx="28" cy="46" r="18" fill="#94a3b8" />
          <circle cx="28" cy="46" r="11" fill="#f1f5f9" />
          <circle cx="92" cy="46" r="18" fill="#94a3b8" />
          <circle cx="92" cy="46" r="11" fill="#f1f5f9" />
          <circle cx="60" cy="68" r="34" fill="#cbd5e1" />
          <ellipse cx="60" cy="70" rx="9" ry="14" fill="#1e293b" />
          <circle cx="44" cy="60" r="3.5" fill="#1e293b" />
          <circle cx="76" cy="60" r="3.5" fill="#1e293b" />
          <circle cx="45" cy="58" r="1.2" fill="#ffffff" />
          <circle cx="77" cy="58" r="1.2" fill="#ffffff" />
          <circle cx="36" cy="74" r="4" fill="#fb7185" opacity="0.4" />
          <circle cx="84" cy="74" r="4" fill="#fb7185" opacity="0.4" />
        </svg>
      )}

      {petId === 'lion' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Big fluffy mane */}
          <circle cx="60" cy="62" r="46" fill="#d97706" />
          <circle cx="32" cy="36" r="14" fill="#b45309" />
          <circle cx="88" cy="36" r="14" fill="#b45309" />
          <circle cx="32" cy="36" r="8" fill="#fbbf24" />
          <circle cx="88" cy="36" r="8" fill="#fbbf24" />
          {/* Face */}
          <circle cx="60" cy="64" r="32" fill="#fbbf24" />
          <circle cx="48" cy="58" r="4.5" fill="#1e293b" />
          <circle cx="72" cy="58" r="4.5" fill="#1e293b" />
          <circle cx="50" cy="56" r="1.5" fill="#ffffff" />
          <circle cx="74" cy="56" r="1.5" fill="#ffffff" />
          {/* Snout */}
          <ellipse cx="60" cy="72" rx="14" ry="10" fill="#fef3c7" />
          <polygon points="56,67 64,67 60,72" fill="#78350f" />
          <path d="M55 74 Q60 78 65 74" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {petId === 'dolphin' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Curved dolphin body */}
          <path d="M20 75 Q40 30 75 40 Q105 50 110 65 Q95 62 85 70 Q60 85 35 85 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          {/* White belly */}
          <path d="M35 85 Q60 85 85 70 Q70 78 50 82 Z" fill="#f0f9ff" />
          {/* Dorsal fin */}
          <path d="M55 35 Q65 18 78 30 Q68 34 62 38 Z" fill="#0284c7" />
          {/* Flipper */}
          <path d="M50 68 Q58 80 48 84 Q44 76 50 68 Z" fill="#0284c7" />
          {/* Eye & smile */}
          <circle cx="85" cy="56" r="3.5" fill="#0f172a" />
          <circle cx="86" cy="55" r="1.2" fill="#ffffff" />
          <path d="M96 64 Q102 67 98 70" fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {petId === 'owl' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Owl body & ear tufts */}
          <polygon points="34,42 38,18 52,36" fill="#6d28d9" />
          <polygon points="86,42 82,18 68,36" fill="#6d28d9" />
          <ellipse cx="60" cy="65" rx="36" ry="40" fill="#8b5cf6" />
          {/* Big Wise Eyes */}
          <circle cx="44" cy="54" r="15" fill="#fef08a" stroke="#6d28d9" strokeWidth="2.5" />
          <circle cx="76" cy="54" r="15" fill="#fef08a" stroke="#6d28d9" strokeWidth="2.5" />
          <circle cx="44" cy="54" r="7" fill="#1e293b" />
          <circle cx="76" cy="54" r="7" fill="#1e293b" />
          <circle cx="46" cy="51" r="2.5" fill="#ffffff" />
          <circle cx="78" cy="51" r="2.5" fill="#ffffff" />
          {/* Beak */}
          <polygon points="56,64 64,64 60,74" fill="#f59e0b" />
          {/* Chest feathers */}
          <path d="M50 82 Q60 88 70 82" fill="none" stroke="#ddd6fe" strokeWidth="2" strokeLinecap="round" />
          <path d="M53 90 Q60 96 67 90" fill="none" stroke="#ddd6fe" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {petId === 'turtle' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Shell */}
          <ellipse cx="60" cy="65" rx="38" ry="32" fill="#10b981" stroke="#047857" strokeWidth="3" />
          {/* Shell pattern */}
          <polygon points="60,45 74,54 74,72 60,81 46,72 46,54" fill="#34d399" stroke="#047857" strokeWidth="2" />
          {/* Flippers */}
          <ellipse cx="28" cy="48" rx="8" ry="14" fill="#059669" transform="rotate(-30 28 48)" />
          <ellipse cx="92" cy="48" rx="8" ry="14" fill="#059669" transform="rotate(30 92 48)" />
          <ellipse cx="32" cy="82" rx="7" ry="10" fill="#059669" transform="rotate(30 32 82)" />
          <ellipse cx="88" cy="82" rx="7" ry="10" fill="#059669" transform="rotate(-30 88 82)" />
          {/* Head */}
          <circle cx="60" cy="30" r="14" fill="#34d399" stroke="#047857" strokeWidth="2" />
          <circle cx="55" cy="27" r="2.5" fill="#1e293b" />
          <circle cx="65" cy="27" r="2.5" fill="#1e293b" />
          <path d="M57 34 Q60 38 63 34" fill="none" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      {petId === 'hedgehog' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Spikes */}
          <circle cx="60" cy="58" r="42" fill="#78350f" />
          <polygon points="20,50 30,30 40,48" fill="#451a03" />
          <polygon points="40,24 55,10 65,24" fill="#451a03" />
          <polygon points="70,18 85,15 88,32" fill="#451a03" />
          <polygon points="90,32 105,42 94,55" fill="#451a03" />
          {/* Face */}
          <circle cx="60" cy="68" r="30" fill="#fde68a" />
          <circle cx="48" cy="64" r="3.5" fill="#1e293b" />
          <circle cx="72" cy="64" r="3.5" fill="#1e293b" />
          <circle cx="50" cy="62" r="1.2" fill="#ffffff" />
          <circle cx="74" cy="62" r="1.2" fill="#ffffff" />
          <ellipse cx="60" cy="74" rx="4" ry="3" fill="#1e293b" />
          <path d="M56 80 Q60 84 64 80" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="72" r="4" fill="#f87171" opacity="0.4" />
          <circle cx="80" cy="72" r="4" fill="#f87171" opacity="0.4" />
        </svg>
      )}

      {petId === 'penguin' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Body */}
          <ellipse cx="60" cy="65" rx="36" ry="42" fill="#0f172a" />
          {/* White Belly */}
          <ellipse cx="60" cy="70" rx="24" ry="32" fill="#f8fafc" />
          {/* Eyes */}
          <circle cx="48" cy="50" r="4.5" fill="#0f172a" />
          <circle cx="72" cy="50" r="4.5" fill="#0f172a" />
          <circle cx="49" cy="48" r="1.5" fill="#ffffff" />
          <circle cx="73" cy="48" r="1.5" fill="#ffffff" />
          {/* Orange Beak */}
          <polygon points="54,56 66,56 60,66" fill="#f97316" />
          {/* Orange Feet */}
          <ellipse cx="46" cy="104" rx="10" ry="5" fill="#f97316" />
          <ellipse cx="74" cy="104" rx="10" ry="5" fill="#f97316" />
        </svg>
      )}

      {petId === 'giraffe' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Ossicones (horns) */}
          <line x1="48" y1="36" x2="44" y2="18" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          <circle cx="44" cy="18" r="4.5" fill="#78350f" />
          <line x1="72" y1="36" x2="76" y2="18" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          <circle cx="76" cy="18" r="4.5" fill="#78350f" />
          {/* Ears */}
          <ellipse cx="32" cy="42" rx="10" ry="5" fill="#eab308" transform="rotate(-20 32 42)" />
          <ellipse cx="88" cy="42" rx="10" ry="5" fill="#eab308" transform="rotate(20 88 42)" />
          {/* Head & Neck */}
          <rect x="50" y="70" width="20" height="40" fill="#facc15" />
          <circle cx="60" cy="85" r="5" fill="#b45309" />
          <ellipse cx="60" cy="56" rx="26" ry="24" fill="#facc15" />
          {/* Spots on face */}
          <circle cx="44" cy="46" r="3.5" fill="#b45309" />
          <circle cx="76" cy="46" r="3.5" fill="#b45309" />
          {/* Eyes */}
          <ellipse cx="48" cy="54" rx="4" ry="5" fill="#1e293b" />
          <ellipse cx="72" cy="54" rx="4" ry="5" fill="#1e293b" />
          <circle cx="49" cy="52" r="1.5" fill="#ffffff" />
          <circle cx="73" cy="52" r="1.5" fill="#ffffff" />
          {/* Snout */}
          <ellipse cx="60" cy="68" rx="14" ry="9" fill="#fef08a" />
          <circle cx="56" cy="67" r="2" fill="#78350f" />
          <circle cx="64" cy="67" r="2" fill="#78350f" />
        </svg>
      )}

      {petId === 'elephant' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Big Ears */}
          <circle cx="26" cy="55" r="22" fill="#94a3b8" />
          <circle cx="26" cy="55" r="14" fill="#fbcfe8" />
          <circle cx="94" cy="55" r="22" fill="#94a3b8" />
          <circle cx="94" cy="55" r="14" fill="#fbcfe8" />
          {/* Head */}
          <circle cx="60" cy="62" r="32" fill="#cbd5e1" />
          {/* Eyes */}
          <circle cx="46" cy="54" r="3.5" fill="#1e293b" />
          <circle cx="74" cy="54" r="3.5" fill="#1e293b" />
          <circle cx="47" cy="52" r="1.2" fill="#ffffff" />
          <circle cx="75" cy="52" r="1.2" fill="#ffffff" />
          {/* Trunk curved up for good luck */}
          <path d="M54 68 Q56 94 68 96 Q78 96 74 84 Q70 78 64 68 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
        </svg>
      )}

      {/* 👑 CAPYBARA ZEN - 1000 ESTRELLAS REINA DEL 1000 */}
      {petId === 'capybara' && (
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl">
          {/* Golden glow aura for 1000 stars */}
          <circle cx="60" cy="65" r="50" fill="#fef08a" opacity="0.35" className="animate-pulse" />
          {/* Small Round Ears */}
          <circle cx="34" cy="40" r="9" fill="#78350f" />
          <circle cx="34" cy="40" r="5" fill="#a16207" />
          <circle cx="86" cy="40" r="9" fill="#78350f" />
          <circle cx="86" cy="40" r="5" fill="#a16207" />
          {/* Iconic Square-ish Head */}
          <rect x="30" y="44" width="60" height="52" rx="22" fill="#a16207" />
          <ellipse cx="60" cy="52" rx="26" ry="12" fill="#ca8a04" opacity="0.5" />
          {/* Calm/Zen Peaceful Eyes ^_^ */}
          <path d="M42 56 Q48 50 54 56" fill="none" stroke="#3e1a00" strokeWidth="3" strokeLinecap="round" />
          <path d="M66 56 Q72 50 78 56" fill="none" stroke="#3e1a00" strokeWidth="3" strokeLinecap="round" />
          {/* Big Cute Flat Snout */}
          <ellipse cx="60" cy="74" rx="16" ry="12" fill="#78350f" />
          <ellipse cx="54" cy="72" rx="3" ry="2" fill="#2d1200" />
          <ellipse cx="66" cy="72" rx="3" ry="2" fill="#2d1200" />
          {/* Serene Zen Smile */}
          <path d="M54 80 Q60 85 66 80" fill="none" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="38" cy="68" r="5" fill="#f87171" opacity="0.5" />
          <circle cx="82" cy="68" r="5" fill="#f87171" opacity="0.5" />
          {/* Signature Orange on head (onsen style!) with little green leaf */}
          <circle cx="60" cy="30" r="11" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          <path d="M60 19 Q66 14 68 18 Q62 20 60 19 Z" fill="#22c55e" />
          {/* Sparkling Stars */}
          <text x="20" y="32" fontSize="12">✨</text>
          <text x="92" y="32" fontSize="12">✨</text>
        </svg>
      )}
    </div>
  );
}
