import React from 'react';
import { Star, ArrowLeft, Lock, Sparkles, Heart } from 'lucide-react';
import { PETS, ACCESSORIES } from '../data/pets';
import PetAvatar from './PetAvatar';
import { sound } from '../sounds';

export default function SanctuaryView({
  stars,
  selectedPetId,
  onSelectPet,
  selectedAccessoryId,
  onSelectAccessory,
  onBack
}) {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-20 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            sound.pop();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-2xl shadow-sm border border-amber-200 text-slate-700 font-bold active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-amber-600" />
          <span>Volver al Juego</span>
        </button>

        <div className="flex items-center gap-2 bg-amber-400 text-amber-950 px-5 py-2 rounded-2xl shadow-md border-2 border-amber-500 font-black text-lg">
          <Star className="w-6 h-6 fill-amber-950 text-amber-950 animate-bounce-gentle" />
          <span>{stars} Estrellas</span>
        </div>
      </div>

      {/* Hero sanctuary header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            Refugio de Mascotas
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-2">El Parque de tus Amigos</h2>
          <p className="text-emerald-100 mt-1 max-w-lg font-medium text-sm md:text-base">
            Cada vez que practicas los amigos del 1000 ganas estrellas para cuidar y desbloquear a nuevas mascotas y accesorios geniales.
          </p>
        </div>
        <div className="absolute right-4 bottom-2 text-7xl md:text-8xl opacity-30 select-none">
          🐾
        </div>
      </div>

      {/* Section 1: Pets grid */}
      <div className="mb-8">
        <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span>🐾 Tus Mascotas</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PETS.map((pet) => {
            const isUnlocked = stars >= pet.unlockedAtStars;
            const isSelected = selectedPetId === pet.id;
            const activeAcc = isSelected
              ? ACCESSORIES.find((a) => a.id === selectedAccessoryId)
              : null;

            return (
              <div
                key={pet.id}
                onClick={() => {
                  if (isUnlocked) {
                    sound.pop();
                    onSelectPet(pet.id);
                  }
                }}
                className={`relative rounded-3xl p-4 border-4 transition-all ${
                  isUnlocked
                    ? isSelected
                      ? 'bg-white border-amber-400 shadow-xl scale-105 cursor-pointer ring-4 ring-amber-300/50'
                      : 'bg-white/80 border-white hover:border-amber-200 shadow-md cursor-pointer hover:scale-102'
                    : 'bg-slate-200/80 border-slate-300 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Capibara 1000 stars ultimate prize badge */}
                {pet.id === 'capybara' && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap ${
                    isUnlocked
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 border border-amber-300 animate-bounce-gentle'
                      : 'bg-amber-700 text-amber-100 border border-amber-500'
                  }`}>
                    {isUnlocked ? '✨ ¡Reina de las 1000 Estrellas!' : '👑 Gran Reto: 1000 ⭐'}
                  </span>
                )}

                {/* Active companion badge */}
                {isSelected && pet.id !== 'capybara' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-black px-3 py-0.5 rounded-full shadow-md">
                    ¡Compañero activo!
                  </span>
                )}

                {/* Pet avatar */}
                <div className="flex justify-center mb-2 mt-2">
                  <PetAvatar
                    petId={pet.id}
                    size="normal"
                    isHappy={isSelected}
                    accessory={activeAcc}
                  />
                </div>

                <div className="text-center">
                  <div className="font-black text-lg text-slate-800">{pet.name}</div>
                  <div className="text-xs font-bold text-slate-500">{pet.species}</div>

                  {isUnlocked ? (
                    <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-xl py-1 px-2 border border-emerald-200 flex items-center justify-center gap-1">
                      <span>Come:</span> {pet.foodIcon} {pet.food}
                    </div>
                  ) : (
                    <div className="mt-2 text-xs font-black text-slate-600 bg-slate-300/80 rounded-xl py-1 px-2 flex items-center justify-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{pet.unlockedAtStars} estrellas</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Accessories wardrobe */}
      <div>
        <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <span>👑 Accesorios del Armario</span>
          <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            Para tu mascota activa
          </span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Option: No accessory */}
          <button
            onClick={() => {
              sound.pop();
              onSelectAccessory(null);
            }}
            className={`p-3 rounded-2xl border-2 text-center transition-all ${
              selectedAccessoryId === null
                ? 'bg-amber-100 border-amber-400 font-black'
                : 'bg-white border-slate-200 hover:border-amber-200'
            }`}
          >
            <div className="text-3xl mb-1">❌</div>
            <div className="text-xs font-bold text-slate-700">Sin accesorio</div>
          </button>

          {ACCESSORIES.map((acc) => {
            const isUnlocked = stars >= acc.requiredStars;
            const isSelected = selectedAccessoryId === acc.id;

            return (
              <button
                key={acc.id}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    sound.pop();
                    onSelectAccessory(acc.id);
                  }
                }}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  isUnlocked
                    ? isSelected
                      ? 'bg-amber-100 border-amber-400 shadow-md font-black scale-105'
                      : 'bg-white border-slate-200 hover:border-amber-200 hover:scale-102'
                    : 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl mb-1 filter drop-shadow">{acc.icon}</div>
                <div className="text-xs font-bold text-slate-800 truncate">{acc.name}</div>
                <div className="text-[10px] font-bold text-slate-500 mt-1">
                  {isUnlocked ? (
                    <span className="text-emerald-600 font-extrabold">Desbloqueado</span>
                  ) : (
                    <span>⭐ {acc.requiredStars} estrellas</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
