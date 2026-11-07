import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { LENGUA_QUESTIONS } from '../data/lenguaData';
import { sound } from '../sounds';
import PetAvatar from './PetAvatar';

export default function LenguaGame({ onBack, onAddStar, pet }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = LENGUA_QUESTIONS[currentIndex];

  const handleSelect = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);

    const correct = option.toLowerCase() === question.correct.toLowerCase();
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      sound.success();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 }
      });
      onAddStar();
    } else {
      sound.retry();
    }
  };

  const handleNext = () => {
    sound.pop();
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev + 1) % LENGUA_QUESTIONS.length);
  };

  return (
    <div className="max-w-2xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.pop();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-2xl shadow-sm border border-pink-200 text-slate-700 font-bold active:scale-95 transition-all text-xs md:text-sm"
        >
          <ArrowLeft className="w-4 h-4 text-pink-600" />
          <span>Volver a Temas</span>
        </button>

        <span className="text-xs font-black text-pink-700 bg-pink-100 px-3 py-1 rounded-full border border-pink-200">
          Pregunta {currentIndex + 1} de {LENGUA_QUESTIONS.length}
        </span>
      </div>

      {/* Hero header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-5 md:p-6 text-white shadow-lg mb-6 flex items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Lengua y Ortografía
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">Mascotas Ortográficas</h2>
          <p className="text-pink-100 text-xs md:text-sm font-semibold mt-0.5">
            Elige la letra correcta para completar la palabra y alimentar a tu mascota.
          </p>
        </div>
        <div className="hidden sm:block">
          <PetAvatar petId={pet?.id || 'cat'} size="small" isHappy={isCorrect} />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-pink-200 mb-6 text-center">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">
          Completa la frase:
        </span>

        <p className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-relaxed">
          {question.sentence}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {question.options.map((opt, idx) => {
          let btnStyle = 'bg-white hover:bg-pink-50 border-pink-200 text-slate-800';

          if (selectedOption !== null) {
            if (opt === question.correct) {
              btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102';
            } else if (opt === selectedOption) {
              btnStyle = 'bg-rose-500 border-rose-600 text-white';
            } else {
              btnStyle = 'bg-slate-100 border-slate-200 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleSelect(opt)}
              className={`p-6 rounded-3xl border-4 text-3xl md:text-4xl font-black shadow-md active:scale-95 transition-all text-center touch-manipulation ${btnStyle}`}
            >
              {opt.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {showExplanation && (
        <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-pink-200 animate-in fade-in zoom-in-95 duration-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 font-black text-lg">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-6 h-6" />
                ¡Muy bien! ¡Has ganado 1 estrella! ⭐
              </span>
            ) : (
              <span className="text-rose-600">¡Casi! No te preocupes, ¡vamos a aprender la regla!</span>
            )}
          </div>

          <p className="text-sm md:text-base font-bold text-slate-700 bg-pink-50 rounded-2xl p-4 border border-pink-200">
            {question.rule}
          </p>

          <button
            onClick={handleNext}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Siguiente Palabra</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
