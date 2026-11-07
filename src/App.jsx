import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Star,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  Zap
} from 'lucide-react';

import { PETS, ACCESSORIES } from './data/pets';
import { generateExercise } from './data/abnEngine';
import { sound } from './sounds';
import PetAvatar from './components/PetAvatar';
import AbnVisualizer from './components/AbnVisualizer';
import Keypad from './components/Keypad';
import SanctuaryView from './components/SanctuaryView';
import HubMenu from './components/HubMenu';
import AbnRejilla from './components/AbnRejilla';
import LenguaGame from './components/LenguaGame';
import CienciasGame from './components/CienciasGame';

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

  // Game configuration
  const [target, setTarget] = useState(1000); // 1000, 100, 10
  const [currentModuleId, setCurrentModuleId] = useState('abn_1000');
  const [level, setLevel] = useState(1); // 1: Centenas, 2: Decenas, 3: Números completos
  const [muted, setMuted] = useState(false);

  // Active exercise & round state for Amigos
  const [exercise, setExercise] = useState(null);
  const [keypadValue, setKeypadValue] = useState('');
  const [showHint, setShowHint] = useState(false);
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

  // Load new exercise on start or change of level/target
  useEffect(() => {
    if (['abn_1000', 'abn_100', 'abn_10'].includes(currentModuleId)) {
      nextExercise();
    }
  }, [target, level, currentModuleId]);

  const nextExercise = () => {
    const ex = generateExercise(target, level);
    setExercise(ex);
    setKeypadValue('');
    setFeedback(null);
    setIsHappy(false);
  };

  const currentPet = PETS.find((p) => p.id === selectedPetId) || PETS[0];
  const activeAccessory = ACCESSORIES.find((a) => a.id === selectedAccessoryId);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'],
    });
  };

  // Handle player answer submission via keypad
  const checkAnswer = (userValue) => {
    const numericAnswer = parseInt(userValue, 10);
    if (isNaN(numericAnswer)) return;

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
          text: `¡Fantástico! ${exercise.num1} + ${exercise.answer} = ${exercise.target}`,
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
        text: `¡Casi! No te preocupes, pulsa el botón "Pista ABN" para ver el truco y probar otra vez.`,
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
      default:
        return `Amigos del ${target}`;
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
            onSelectModule={(modId, newTarget) => {
              setCurrentModuleId(modId);
              if (newTarget) setTarget(newTarget);
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

        {/* Default game: Amigos del 1000 / 100 / 10 with on-screen KEYPAD */}
        {currentView === 'game' &&
          ['abn_1000', 'abn_100', 'abn_10'].includes(currentModuleId) &&
          exercise && (
            <div className="max-w-xl mx-auto w-full flex flex-col items-center">
              {/* Level selector tabs (specifically for 1000) */}
              {target === 1000 && (
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
              )}

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
                    «¡Tengo <span className="text-amber-600 font-black text-lg">{exercise.num1}</span> y necesito llegar a <span className="text-indigo-600 font-black text-lg">{exercise.target}</span>!»
                  </p>

                  {streak > 1 && (
                    <div className="mt-2 flex items-center gap-1 text-xs font-black text-orange-600">
                      <Zap className="w-3.5 h-3.5 fill-orange-500" />
                      <span>¡Racha de {streak} aciertos!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* The Equation Card */}
              <div className="bg-white/95 rounded-3xl p-5 md:p-6 shadow-xl border-4 border-amber-300 w-full mb-4 text-center relative overflow-hidden">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Encuentra el amigo del {exercise.target}
                </span>

                {/* Equation display */}
                <div className="flex items-center justify-center gap-2 md:gap-4 my-2 flex-wrap">
                  <div className="bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-2xl px-4 py-2 text-3xl md:text-5xl font-black shadow-inner">
                    {exercise.num1}
                  </div>

                  <span className="text-2xl md:text-4xl font-black text-slate-400">+</span>

                  <div className="bg-emerald-50 border-2 border-dashed border-emerald-400 text-emerald-700 rounded-2xl px-4 py-2 text-3xl md:text-5xl font-black min-w-[90px] shadow-inner animate-pulse">
                    {feedback?.type === 'success' ? exercise.answer : (keypadValue || '?')}
                  </div>

                  <span className="text-2xl md:text-4xl font-black text-slate-400">=</span>

                  <div className="bg-indigo-50 border-2 border-indigo-300 text-indigo-900 rounded-2xl px-4 py-2 text-3xl md:text-5xl font-black shadow-inner">
                    {exercise.target}
                  </div>
                </div>

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

              {/* Pista ABN Button */}
              <div className="flex items-center justify-center w-full mb-3">
                <button
                  onClick={() => {
                    sound.hint();
                    setShowHint(true);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-amber-950 font-black rounded-2xl shadow-md border-2 border-amber-500 text-sm transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-950" />
                  <span>¡Ver Pista ABN mágica!</span>
                </button>
              </div>

              {/* Tablet On-screen Keypad */}
              <Keypad
                value={keypadValue}
                onChange={setKeypadValue}
                onSubmit={() => checkAnswer(keypadValue)}
                disabled={feedback?.type === 'success'}
              />
            </div>
          )}
      </main>

      {/* 3. ABN Visualizer Modal */}
      {showHint && exercise && (
        <AbnVisualizer
          exercise={exercise}
          onClose={() => setShowHint(false)}
        />
      )}

      {/* 4. Footer */}
      <footer className="text-center py-2 text-xs font-bold text-amber-800/70">
        El Club del 1000 • Método ABN para Tablet • Mascotas Felices 🐾
      </footer>
    </div>
  );
}
