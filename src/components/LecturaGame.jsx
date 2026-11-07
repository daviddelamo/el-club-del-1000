import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, BookOpen, Volume2, Sparkles, CheckCircle2, MessageCircleHeart } from 'lucide-react';
import { LECTURA_MISSIONS } from '../data/lecturaData';
import { sound } from '../sounds';
import PetAvatar from './PetAvatar';

export default function LecturaGame({ onBack, onAddStar, pet }) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mission = LECTURA_MISSIONS[missionIndex];
  const currentQ = mission.questions[questionIndex];
  const isLastQuestionOfStory = questionIndex + 1 === mission.questions.length;

  // Optional voice narration using Web Speech API
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${mission.title}. ${mission.story}`);
      utterance.lang = 'es-ES';
      utterance.rate = 0.88; // Gentle kid-friendly pace
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const correct = idx === currentQ.correct;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      sound.success();
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.65 }
      });
      onAddStar();
    } else {
      sound.retry();
    }
  };

  const handleNext = () => {
    sound.pop();
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);

    // If there is another question in the same mission
    if (questionIndex + 1 < mission.questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Go to next mission
      setQuestionIndex(0);
      setMissionIndex((prev) => (prev + 1) % LECTURA_MISSIONS.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            if (isSpeaking && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            sound.pop();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-2xl shadow-sm border border-indigo-200 text-slate-700 font-bold active:scale-95 transition-all text-xs md:text-sm"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-600" />
          <span>Volver a Temas</span>
        </button>

        <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
          Historia {missionIndex + 1} de {LECTURA_MISSIONS.length}
        </span>
      </div>

      {/* Story Box */}
      <div className="bg-white rounded-3xl p-5 md:p-7 shadow-xl border-4 border-indigo-200 mb-6 relative overflow-hidden">
        {/* Top badge and Read Aloud button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {mission.tag}
          </span>

          {'speechSynthesis' in window && (
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-xs transition-all shadow-sm active:scale-95 ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border border-indigo-300'
              }`}
              title="Escuchar la historia en voz alta"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Pausar voz' : 'Escuchar historia'}</span>
            </button>
          )}
        </div>

        {/* Story Header */}
        <div className="flex items-center gap-3 mb-4">
          <PetAvatar petId={mission.petId} size="small" isHappy={isCorrect} />
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">
            {mission.title}
          </h2>
        </div>

        {/* Story Text (Large, high legibility for young readers) */}
        <div className="bg-amber-50/50 rounded-2xl p-4 md:p-5 border-2 border-amber-200/80 leading-relaxed text-slate-800 font-bold text-lg md:text-xl shadow-inner">
          {mission.story}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-xl border-4 border-indigo-200 mb-6">
        {/* Progress pills for the 3 questions of this story */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
              Pregunta {questionIndex + 1} de {mission.questions.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {mission.questions.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === questionIndex
                    ? 'bg-indigo-600 scale-125 ring-2 ring-indigo-300'
                    : i < questionIndex
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-xl md:text-2xl font-black text-slate-800 mb-4">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = 'bg-white hover:bg-indigo-50 border-indigo-200 text-slate-800';

            if (selectedOption !== null) {
              if (idx === currentQ.correct) {
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
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border-2 text-base md:text-lg font-black shadow-sm active:scale-98 transition-all text-left flex items-center justify-between touch-manipulation ${btnStyle}`}
              >
                <span>{opt}</span>
                {selectedOption !== null && idx === currentQ.correct && (
                  <CheckCircle2 className="w-5 h-5 ml-2 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Banner */}
      {showExplanation && (
        <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-indigo-200 animate-in fade-in zoom-in-95 duration-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 font-black text-lg">
            {isCorrect ? (
              <span className="text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-6 h-6" />
                ¡Excelente respuesta! +1 Estrella ⭐
              </span>
            ) : (
              <span className="text-rose-600">¡Volvamos a buscar en la lectura!</span>
            )}
          </div>

          <p className="text-sm md:text-base font-bold text-slate-700 bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
            {currentQ.explanation}
          </p>

          {/* Special reflection prompt when completing the story */}
          {isCorrect && isLastQuestionOfStory && mission.reflection && (
            <div className="mt-4 p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 font-black text-sm md:text-base text-left shadow-sm flex items-start gap-2.5">
              <MessageCircleHeart className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <p>{mission.reflection}</p>
            </div>
          )}

          <button
            onClick={handleNext}
            className="mt-5 px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 text-white font-black text-base rounded-2xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>
              {!isLastQuestionOfStory ? 'Siguiente Pregunta' : '🎉 ¡Siguiente Historia de Mascotas!'}
            </span>
            <span>➔</span>
          </button>
        </div>
      )}
    </div>
  );
}
