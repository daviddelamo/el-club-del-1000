import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Star,
  Volume2,
  VolumeX,
  BookOpen,
  Zap,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

import { PETS, ACCESSORIES } from './data/pets';
import { generateExercise } from './data/abnEngine';
import { sound } from './sounds';
import PetAvatar from './components/PetAvatar';
import Keypad from './components/Keypad';
import SanctuaryView from './components/SanctuaryView';
import HubMenu from './components/HubMenu';
import AbnRejilla from './components/AbnRejilla';
import LenguaGame from './components/LenguaGame';
import CienciasGame from './components/CienciasGame';
import LecturaGame from './components/LecturaGame';

export default function App() {
  // Persistent state in localStorage
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('abn_stars');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [selectedPetId, setSelectedPetId] = useState(() => {
    return localStorage.getItem('abn_pet') || 'dog';
  });

  const [selectedAccessoryId, setSelectedAccessoryId] = useState(() => {
    return localStorage.getItem('abn_acc') || null;
  });

  // Current navigation view: 'game' | 'sanctuary' | 'hub'
  const [currentView, setCurrentView] = useState('game');

  // Game configuration - Amigos del 1000 exclusively
  const [currentModuleId, setCurrentModuleId] = useState('abn_1000');
  const [level, setLevel] = useState(2); // Default to Level 2 (Decenas)
  const [muted, setMuted] = useState(false);

  // Active exercise & 2-step input for Amigos del 1000 (Decenas first, then Centenas)
  const [exercise, setExercise] = useState(null);
  const [inputDecenas, setInputDecenas] = useState('');
  const [inputCentenas, setInputCentenas] = useState('');
  const [activeField, setActiveField] = useState('decenas'); // 'decenas' starts active!

  const [isHappy, setIsHappy] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('abn_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('abn_pet', selectedPetId);
  }, [selectedPetId]);

  useEffect(() => {
    if (selectedAccessoryId) {
      localStorage.setItem('abn_acc', selectedAccessoryId);
    } else {
      localStorage.removeItem('abn_acc');
    }
  }, [selectedAccessoryId]);

  // Load new exercise on start or change of level
  useEffect(() => {
    if (currentModuleId === 'abn_1000') {
      nextExercise();
    }
  }, [level, currentModuleId]);

  const nextExercise = () => {
    const ex = generateExercise(1000, level);
    setExercise(ex);
    setInputDecenas('');
    setInputCentenas('');
    setActiveField(level === 1 ? 'centenas' : 'decenas'); // Decenas first for levels 2 and 3!
    setFeedback(null);
    setIsHappy(false);
  };

  const currentPet = PETS.find((p) => p.id === selectedPetId) || PETS[0];
  const activeAccessory = ACCESSORIES.find((a) => a.id === selectedAccessoryId);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
    });
  };

  // Helper to compute composed friend answer
  const getComposedAnswer = () => {
    if (level === 1) {
      const c = parseInt(inputCentenas, 10);
      if (isNaN(c)) return '';
      return (c < 10 ? c * 100 : c).toString();
    }
    const d = parseInt(inputDecenas, 10);
    const c = parseInt(inputCentenas, 10);
    if (isNaN(d) && isNaN(c)) return '';
    const dVal = isNaN(d) ? 0 : d;
    const cVal = isNaN(c) ? 0 : (c < 10 ? c * 100 : c);
    return (cVal + dVal).toString();
  };

  // Handle player answer submission
  const checkAnswer = () => {
    let numericAnswer = 0;
    if (level === 1) {
      const c = parseInt(inputCentenas, 10);
      if (isNaN(c)) return;
      numericAnswer = c < 10 ? c * 100 : c;
    } else {
      const d = parseInt(inputDecenas, 10);
      const c = parseInt(inputCentenas, 10);
      if (isNaN(d) && isNaN(c)) return;
      const dVal = isNaN(d) ? 0 : d;
      const cVal = isNaN(c) ? 0 : (c < 10 ? c * 100 : c);
      numericAnswer = cVal + dVal;
    }

    if (numericAnswer === exercise.answer) {
      sound.success();
      triggerConfetti();
      setIsHappy(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setStars((prev) => prev + 1);

      if (newStreak % 5 === 0) {
        sound.cheer();
        setFeedback({
          type: 'success',
          text: `🎉 ¡Racha de ${newStreak}! ¡${currentPet.name} está súper feliz y llena de energía!`,
        });
      } else {
        setFeedback({
          type: 'success',
          text: `¡Fantástico! ${exercise.num1} + ${exercise.answer} = 1000`,
        });
      }

      setTimeout(() => {
        nextExercise();
      }, 1600);
    } else {
      sound.retry();
      setStreak(0);
      setFeedback({
        type: 'retry',
        text:
          level > 1
            ? `¡Casi! Piensa: a las decenas les faltan ${exercise.decenasPart} para la siguiente centena, y luego ${exercise.centenasPart} hasta el 1000.`
            : `¡Casi! Revisa cuántas centenas le faltan a ${exercise.num1} para llegar a 1000.`,
      });
    }
  };

  const handleToggleMute = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
  };

  const getModuleTitle = () => {
    switch (currentModuleId) {
      case 'abn_rejilla':
        return 'Rejilla ABN';
      case 'spelling':
        return 'Lengua y Ortografía';
      case 'animals_world':
        return 'Ciencias Naturales';
      case 'reading':
        return 'Lectura Corta';
      default:
        return 'Amigos del 1000';
    }
  };

  // Current active value for keypad
  const activeKeyValue = activeField === 'decenas' ? inputDecenas : inputCentenas;
  const handleKeypadChange = (newVal) => {
    if (activeField === 'decenas') {
      setInputDecenas(newVal);
    } else {
      setInputCentenas(newVal);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-800">
      {/* 1. Global Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b-2 border-amber-200 sticky top-0 z-40 px-3 md:px-6 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Hub Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.pop();
                setCurrentView('hub');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-2xl font-black text-amber-900 text-xs md:text-sm active:scale-95 transition-all shadow-sm"
              title="Ver materias y temas"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Temas</span>
            </button>

            <button
              onClick={() => {
                sound.pop();
                setCurrentView('sanctuary');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-2xl font-black text-emerald-900 text-xs md:text-sm active:scale-95 transition-all shadow-sm"
              title="Ver parque de mascotas"
            >
              <span>🐾 Refugio</span>
            </button>
          </div>

          {/* Active module pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <span className="text-xs font-bold text-slate-500">Materia:</span>
            <span className="text-xs font-black text-amber-800 uppercase tracking-wide">
              {getModuleTitle()}
            </span>
          </div>

          {/* Stars & Sound Toggle */}
          <div className="flex items-center gap-2">
            <div
              onClick={() => {
                sound.pop();
                setCurrentView('sanctuary');
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-3.5 py-1.5 rounded-2xl font-black text-sm md:text-base shadow-sm border border-amber-600/20 cursor-pointer active:scale-95 transition-transform"
            >
              <Star className="w-5 h-5 fill-amber-950 text-amber-950" />
              <span>{stars}</span>
            </div>

            <button
              onClick={handleToggleMute}
              className="p-2 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 active:scale-95 transition-all"
              aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-amber-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Router */}
      <main className="flex-1 flex flex-col justify-center px-3 py-4 md:py-6">
        {currentView === 'hub' && (
          <HubMenu
            currentModule={currentModuleId}
            onSelectModule={(modId) => {
              setCurrentModuleId(modId);
              setCurrentView('game');
            }}
            onBack={() => setCurrentView('game')}
          />
        )}

        {currentView === 'sanctuary' && (
          <SanctuaryView
            stars={stars}
            selectedPetId={selectedPetId}
            onSelectPet={setSelectedPetId}
            selectedAccessoryId={selectedAccessoryId}
            onSelectAccessory={setSelectedAccessoryId}
            onBack={() => setCurrentView('game')}
          />
        )}

        {currentView === 'game' && currentModuleId === 'abn_rejilla' && (
          <AbnRejilla
            onBack={() => setCurrentView('hub')}
            onAddStar={() => setStars((s) => s + 1)}
            pet={currentPet}
          />
        )}

        {currentView === 'game' && currentModuleId === 'spelling' && (
          <LenguaGame
            onBack={() => setCurrentView('hub')}
            onAddStar={() => setStars((s) => s + 1)}
            pet={currentPet}
          />
        )}

        {currentView === 'game' && currentModuleId === 'animals_world' && (
          <CienciasGame
            onBack={() => setCurrentView('hub')}
            onAddStar={() => setStars((s) => s + 1)}
            pet={currentPet}
          />
        )}

        {currentView === 'game' && currentModuleId === 'reading' && (
          <LecturaGame
            onBack={() => setCurrentView('hub')}
            onAddStar={() => setStars((s) => s + 1)}
            pet={currentPet}
          />
        )}

        {/* Amigos del 1000 - Decenas First Input Flow */}
        {currentView === 'game' && currentModuleId === 'abn_1000' && exercise && (
          <div className="max-w-xl mx-auto w-full flex flex-col items-center">
            {/* Level selector tabs */}
            <div className="flex items-center justify-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-amber-200 mb-4 shadow-sm w-full max-w-md">
              <button
                onClick={() => {
                  sound.pop();
                  setLevel(1);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
                  level === 1
                    ? 'bg-amber-400 text-amber-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🟢 Centenas
              </button>
              <button
                onClick={() => {
                  sound.pop();
                  setLevel(2);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
                  level === 2
                    ? 'bg-amber-400 text-amber-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🟡 Decenas
              </button>
              <button
                onClick={() => {
                  sound.pop();
                  setLevel(3);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all ${
                  level === 3
                    ? 'bg-amber-400 text-amber-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔴 Todo el 1000
              </button>
            </div>

            {/* Pet and speech bubble */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 w-full px-2">
              <div
                onClick={() => {
                  sound.pop();
                  setCurrentView('sanctuary');
                }}
                className="cursor-pointer group flex flex-col items-center"
                title="Toca para cambiar de mascota"
              >
                <PetAvatar
                  petId={currentPet.id}
                  size="normal"
                  isHappy={isHappy}
                  accessory={activeAccessory}
                />
                <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full mt-1 border border-amber-200 group-hover:scale-105 transition-transform">
                  🐾 {currentPet.name}
                </span>
              </div>

              {/* Friendly dialogue card */}
              <div className="relative bg-white border-2 border-amber-300 rounded-3xl p-4 shadow-md max-w-sm flex-1 text-center sm:text-left">
                <div className="hidden sm:block absolute -left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b-2 border-l-2 border-amber-300 transform rotate-45" />

                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Misión de energía:
                </p>
                <p className="text-sm md:text-base font-extrabold text-slate-800 mt-0.5">
                  «¡Tengo <span className="text-amber-600 font-black text-lg">{exercise.num1}</span> y necesito llegar a <span className="text-indigo-600 font-black text-lg">1000</span>!»
                </p>

                {streak > 1 && (
                  <div className="mt-2 flex items-center gap-1 text-xs font-black text-orange-600">
                    <Zap className="w-3.5 h-3.5 fill-orange-500" />
                    <span>¡Racha de {streak} aciertos!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Equation Card */}
            <div className="bg-white/95 rounded-3xl p-5 md:p-6 shadow-xl border-4 border-amber-300 w-full mb-4 text-center relative overflow-hidden">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Amigos del 1000
              </span>

              {/* Equation display */}
              <div className="flex items-center justify-center gap-2 md:gap-4 my-2 flex-wrap">
                <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-2xl px-4 py-2 text-3xl md:text-5xl font-black shadow-inner">
                  {exercise.num1}
                </div>

                <span className="text-2xl md:text-4xl font-black text-slate-400">+</span>

                <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 text-emerald-700 rounded-2xl px-4 py-2 text-3xl md:text-5xl font-black min-w-[90px] shadow-inner">
                  {feedback?.type === 'success' ? exercise.answer : (getComposedAnswer() || '?')}
                </div>

                <span className="text-2xl md:text-4xl font-black text-slate-400">=</span>

                <div className="bg-indigo-50 border-2 border-indigo-300 text-indigo-900 rounded-2xl px-4 py-2 text-3xl md:text-5xl font-black shadow-inner">
                  1000
                </div>
              </div>

              {/* 2-Step Input Boxes: Decenas first, then Centenas */}
              {level > 1 ? (
                <div className="mt-4 bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200">
                  <div className="text-xs font-black text-slate-600 mb-2.5 flex items-center justify-center gap-2">
                    <span className="text-rose-700 font-extrabold bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                      1º Decenas que faltan
                    </span>
                    <span className="text-slate-400">➔</span>
                    <span className="text-blue-700 font-extrabold bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                      2º Centenas hasta 1000
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    {/* Box 1: Decenas (Active first!) */}
                    <div
                      onClick={() => {
                        sound.pop();
                        setActiveField('decenas');
                      }}
                      className={`p-3 rounded-2xl border-4 text-center cursor-pointer transition-all ${
                        activeField === 'decenas'
                          ? 'bg-rose-50 border-rose-500 shadow-lg scale-102 ring-4 ring-rose-200'
                          : 'bg-white border-slate-200 hover:border-rose-300'
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase text-rose-700 block">
                        1º Decenas
                      </span>
                      <span className="text-3xl font-black text-slate-800">
                        {inputDecenas || <span className="text-slate-300">__</span>}
                      </span>
                      {activeField === 'decenas' && (
                        <span className="text-[10px] font-bold text-rose-600 block mt-0.5">
                          ● Escribiendo
                        </span>
                      )}
                    </div>

                    {/* Box 2: Centenas */}
                    <div
                      onClick={() => {
                        sound.pop();
                        setActiveField('centenas');
                      }}
                      className={`p-3 rounded-2xl border-4 text-center cursor-pointer transition-all ${
                        activeField === 'centenas'
                          ? 'bg-blue-50 border-blue-500 shadow-lg scale-102 ring-4 ring-blue-200'
                          : 'bg-white border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <span className="text-[11px] font-black uppercase text-blue-700 block">
                        2º Centenas
                      </span>
                      <span className="text-3xl font-black text-slate-800">
                        {inputCentenas || <span className="text-slate-300">___</span>}
                      </span>
                      {activeField === 'centenas' && (
                        <span className="text-[10px] font-bold text-blue-600 block mt-0.5">
                          ● Escribiendo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Switch button */}
                  <div className="flex justify-center mt-3">
                    <button
                      onClick={() => {
                        sound.pop();
                        setActiveField(activeField === 'decenas' ? 'centenas' : 'decenas');
                      }}
                      className="text-xs font-black text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full transition-all active:scale-95 shadow-sm inline-flex items-center gap-1.5"
                    >
                      {activeField === 'decenas' ? (
                        <>
                          <span>Listo las decenas, pasar a: 🔵 Centenas</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Volver a corregir: 🔴 Decenas</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Level 1: Only Centenas */
                <div className="mt-3 bg-blue-50/50 p-3 rounded-2xl border border-blue-200 text-center max-w-xs mx-auto">
                  <span className="text-xs font-black text-blue-700 uppercase">
                    Centenas que faltan hasta 1000:
                  </span>
                  <div className="text-3xl font-black text-blue-900 mt-1">
                    {inputCentenas || <span className="text-slate-300">___</span>}
                  </div>
                </div>
              )}

              {/* Feedback banner */}
              {feedback && (
                <div
                  className={`mt-3 py-2 px-4 rounded-2xl text-xs md:text-sm font-black animate-in fade-in zoom-in-95 duration-200 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}
                >
                  {feedback.text}
                </div>
              )}
            </div>

            {/* Tablet On-screen Keypad */}
            <Keypad
              value={activeKeyValue}
              onChange={handleKeypadChange}
              onSubmit={checkAnswer}
              disabled={feedback?.type === 'success'}
              hideDisplay={true}
              submitEnabled={getComposedAnswer().length > 0}
            />
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="text-center py-2 text-xs font-bold text-amber-800/70">
        El Club del 1000 • Método ABN para Tablet • Mascotas Felices 🐾
      </footer>
    </div>
  );
}
