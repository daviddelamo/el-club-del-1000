import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { CIENCIAS_QUESTIONS } from '../data/cienciasData';
import { sound } from '../sounds';
import PetAvatar from './PetAvatar';

export default function CienciasGame({ onBack, onAddStar, pet }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = CIENCIAS_QUESTIONS[currentIndex];

  const handleSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const correct = idx === question.correct;
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
    setCurrentIndex((prev) => (prev + 1) % CIENCIAS_QUESTIONS.length);
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
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-2xl shadow-sm border border-emerald-200 text-slate-700 font-bold active:scale-95 transition-all text-xs md:text-sm"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>Volver a Temas</span>
        </button>

        <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Reto {currentIndex + 1} de {CIENCIAS_QUESTIONS.length}
        </span>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 md:p-6 text-white shadow-lg mb-6 flex items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Ciencias de la Naturaleza
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">El Reino Animal</h2>
          <p className="text-emerald-100 text-xs md:text-sm font-semibold mt-0.5">
            Descubre cómo nacen, viven y se alimentan los animales del planeta.
          </p>
        </div>
        <div className="text-5xl md:text-6xl filter drop-shadow">
          {question.icon}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-emerald-200 mb-6 text-center">
        <p className="text-xl md:text-2xl font-extrabold text-slate-800 leading-snug">
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt, idx) => {
          let btnStyle = 'bg-white hover:bg-emerald-50 border-emerald-200 text-slate-800';

          if (selectedOption !== null) {
            if (idx === question.correct) {
              btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-rose-500 border-rose-600 text-white';
            } else {
              btnStyle = 'bg-slate-100 border-slate-200 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleSelect(idx)}
              className={`w-full p-4 md:p-5 rounded-2xl border-2 text-lg md:text-xl font-black shadow-sm active:scale-98 transition-all text-center touch-manipulation ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Scientific Fact Banner */}
      {showExplanation && (
        <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-emerald-200 animate-in fade-in zoom-in-95 duration-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 font-black text-lg">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-6 h-6" />
                ¡Sabio de la Naturaleza! +1 Estrella ⭐
              </span>
            ) : (
              <span className="text-rose-600">¡Curiosidad para aprender!</span>
            )}
          </div>

          <p className="text-sm md:text-base font-bold text-slate-700 bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
            {question.fact}
          </p>

          <button
            onClick={handleNext}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black text-base rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Siguiente Animal</span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
