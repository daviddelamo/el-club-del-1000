import React from 'react';
import { sound } from '../sounds';

export default function MultipleChoice({ options, foodIcon = '🦴', onSelect, disabled = false }) {
  const colors = [
    'from-amber-400 to-orange-400 border-amber-500 text-amber-950',
    'from-emerald-400 to-teal-400 border-emerald-500 text-emerald-950',
    'from-sky-400 to-blue-400 border-sky-500 text-sky-950',
    'from-pink-400 to-rose-400 border-pink-500 text-pink-950'
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 w-full max-w-lg mx-auto">
      {options.map((option, idx) => {
        const colorStyle = colors[idx % colors.length];

        return (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => {
              sound.pop();
              onSelect(option);
            }}
            className={`group relative bg-gradient-to-b ${colorStyle} border-b-4 rounded-3xl p-4 md:p-6 shadow-lg shadow-black/5 hover:brightness-105 active:scale-95 transition-all text-center flex flex-col items-center justify-center min-h-[96px] md:min-h-[110px] touch-manipulation`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl filter drop-shadow group-hover:scale-125 transition-transform">
                {foodIcon}
              </span>
              <span className="text-3xl md:text-4xl font-black tracking-tight">
                {option}
              </span>
            </div>
            <span className="text-xs font-bold opacity-75 mt-1">ración de energía</span>
          </button>
        );
      })}
    </div>
  );
}
