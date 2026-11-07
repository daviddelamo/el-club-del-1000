import React from 'react';
import { Delete, Check } from 'lucide-react';
import { sound } from '../sounds';

export default function Keypad({ value, onChange, onSubmit, disabled = false }) {
  const handleDigit = (digit) => {
    if (disabled) return;
    if (value.length >= 4) return; // Numbers won't exceed 1000
    sound.pop();
    onChange(value + digit);
  };

  const handleDelete = () => {
    if (disabled) return;
    sound.pop();
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    if (disabled) return;
    sound.pop();
    onChange('');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Display box */}
      <div className="bg-white border-4 border-amber-300 rounded-3xl p-3 mb-3 shadow-inner flex items-center justify-between px-6">
        <span className="text-sm font-bold text-slate-400">Tu respuesta:</span>
        <span className="text-4xl font-black text-slate-800 tracking-wider">
          {value || <span className="text-slate-300">___</span>}
        </span>
        {value.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
          >
            Borrar
          </button>
        )}
      </div>

      {/* Grid of keys */}
      <div className="grid grid-cols-3 gap-2.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleDigit(num.toString())}
            className="h-14 md:h-16 bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-amber-200 border-b-4 border-b-amber-300 rounded-2xl text-2xl md:text-3xl font-black text-slate-800 shadow-sm active:scale-95 transition-all flex items-center justify-center touch-manipulation"
          >
            {num}
          </button>
        ))}

        {/* Backspace button */}
        <button
          onClick={handleDelete}
          className="h-14 md:h-16 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 border-2 border-rose-200 border-b-4 border-b-rose-300 rounded-2xl text-rose-700 shadow-sm active:scale-95 transition-all flex items-center justify-center touch-manipulation"
          aria-label="Borrar cifra"
        >
          <Delete className="w-7 h-7" />
        </button>

        {/* 0 button */}
        <button
          onClick={() => handleDigit('0')}
          className="h-14 md:h-16 bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-amber-200 border-b-4 border-b-amber-300 rounded-2xl text-2xl md:text-3xl font-black text-slate-800 shadow-sm active:scale-95 transition-all flex items-center justify-center touch-manipulation"
        >
          0
        </button>

        {/* Submit button */}
        <button
          disabled={!value || disabled}
          onClick={() => {
            sound.pop();
            onSubmit();
          }}
          className={`h-14 md:h-16 border-b-4 rounded-2xl font-black text-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 touch-manipulation ${
            value && !disabled
              ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-600 text-white'
              : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
          }`}
          aria-label="Comprobar amigo"
        >
          <Check className="w-7 h-7 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
