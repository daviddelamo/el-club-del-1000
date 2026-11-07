import React from 'react';
import { Sparkles, HelpCircle, X, CheckCircle2 } from 'lucide-react';

export default function AbnVisualizer({ exercise, onClose }) {
  if (!exercise) return null;

  const { target, num1, answer, breakdown } = exercise;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 md:p-8 border-4 border-amber-300 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Cerrar pista"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Método ABN
            </span>
            <h3 className="text-2xl font-black text-slate-800">
              ¡El Superpoder de los Amigos del {target}!
            </h3>
          </div>
        </div>

        {/* Visual progress bar of 1000 */}
        <div className="bg-slate-100 p-4 rounded-2xl mb-6">
          <div className="flex justify-between text-sm font-black mb-2">
            <span className="text-amber-600">Tenemos: {num1}</span>
            <span className="text-emerald-600">Falta: {answer}</span>
            <span className="text-indigo-600">Meta: {target}</span>
          </div>
          <div className="h-7 bg-slate-200 rounded-full overflow-hidden flex p-1 shadow-inner">
            <div
              style={{ width: `${(num1 / target) * 100}%` }}
              className="bg-amber-400 rounded-l-full transition-all duration-500 flex items-center justify-center text-xs font-black text-amber-900"
            >
              {num1}
            </div>
            <div
              style={{ width: `${(answer / target) * 100}%` }}
              className="bg-emerald-400 rounded-r-full transition-all duration-500 flex items-center justify-center text-xs font-black text-emerald-900"
            >
              {answer}
            </div>
          </div>
        </div>

        {/* Step-by-step breakdown according to ABN pedagogy */}
        {breakdown.type === 'hundreds' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-center">
              <p className="text-sm text-blue-600 font-bold mb-1">Amigos del 10 en Centenas</p>
              <p className="text-xl font-black text-blue-800">
                {breakdown.cGiven} + <span className="underline decoration-emerald-500 decoration-4 text-emerald-600">{breakdown.cNeeded}</span> = 10
              </p>
              <p className="text-base text-slate-600 mt-2">
                Le añadimos los dos ceros: <br />
                <span className="font-extrabold text-blue-700">{num1}</span> +{' '}
                <span className="font-black text-emerald-600">{answer}</span> ={' '}
                <span className="font-extrabold text-indigo-700">1000</span>
              </p>
            </div>
          </div>
        )}

        {breakdown.type === 'hundredsAndTens' && (
          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-600 text-center">
              Dividimos en dos pasos sencillos:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 text-center">
                <span className="text-xs font-bold text-blue-600">1. Centenas suman 900</span>
                <p className="text-lg font-black text-blue-800 mt-1">
                  {breakdown.cGiven * 100} + <span className="text-emerald-600">{breakdown.cNeeded * 100}</span>
                </p>
                <p className="text-xs text-blue-500">= 900</p>
              </div>
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 text-center">
                <span className="text-xs font-bold text-rose-600">2. Decenas suman 100</span>
                <p className="text-lg font-black text-rose-800 mt-1">
                  {breakdown.dGiven * 10} + <span className="text-emerald-600">{breakdown.dNeeded * 10}</span>
                </p>
                <p className="text-xs text-rose-500">= 100</p>
              </div>
            </div>
            <div className="text-center bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800 font-bold text-sm">
              900 + 100 = ¡1000 perfecto! El amigo es <span className="text-xl font-black text-emerald-600">{answer}</span>
            </div>
          </div>
        )}

        {breakdown.type === 'fullABN' && (
          <div className="space-y-3">
            <div className="text-center mb-1">
              <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                La Regla de Oro ABN: 9 - 9 - 10
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Centenas suman 9 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3">
                <div className="text-xs font-black text-blue-600 uppercase">Centenas</div>
                <div className="text-xs text-slate-500 mb-1">suman 9</div>
                <div className="text-xl font-black text-blue-900">
                  {breakdown.cGiven} + <span className="text-emerald-600">{breakdown.cNeeded}</span> = 9
                </div>
                <div className="text-xs text-blue-700 font-bold mt-1">({breakdown.cNeeded * 100})</div>
              </div>

              {/* Decenas suman 9 */}
              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3">
                <div className="text-xs font-black text-rose-600 uppercase">Decenas</div>
                <div className="text-xs text-slate-500 mb-1">suman 9</div>
                <div className="text-xl font-black text-rose-900">
                  {breakdown.dGiven} + <span className="text-emerald-600">{breakdown.dNeeded}</span> = 9
                </div>
                <div className="text-xs text-rose-700 font-bold mt-1">({breakdown.dNeeded * 10})</div>
              </div>

              {/* Unidades suman 10 */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3">
                <div className="text-xs font-black text-emerald-600 uppercase">Unidades</div>
                <div className="text-xs text-slate-500 mb-1">suman 10</div>
                <div className="text-xl font-black text-emerald-900">
                  {breakdown.uGiven} + <span className="text-emerald-600 font-black">{breakdown.uNeeded}</span> = 10
                </div>
                <div className="text-xs text-emerald-700 font-bold mt-1">({breakdown.uNeeded})</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 via-rose-50 to-emerald-50 border-2 border-slate-200 rounded-2xl p-3 text-center">
              <p className="text-xs text-slate-600">
                900 (centenas) + 90 (decenas) + 10 (unidades) = <span className="font-black text-slate-800">1000</span>
              </p>
              <p className="text-sm font-bold text-slate-700 mt-1">
                Juntas las piezas: <span className="text-xl font-black text-emerald-600">{answer}</span>
              </p>
            </div>
          </div>
        )}

        {/* Got it button */}
        <button
          onClick={onClose}
          className="w-full mt-5 py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-white font-black text-lg rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all"
        >
          <CheckCircle2 className="w-6 h-6" />
          ¡Entendido, a por ello!
        </button>
      </div>
    </div>
  );
}
