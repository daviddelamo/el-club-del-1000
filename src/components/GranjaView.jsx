import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Star,
  Heart,
  Sparkles,
  Utensils,
  Lock,
  Smile,
  X,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { PETS, ACCESSORIES } from '../data/pets';
import PetAvatar from './PetAvatar';
import { sound } from '../sounds';

export default function GranjaView({
  stars,
  foodStock,
  onFeedPet,
  petFriendship,
  petAccessories,
  onEquipAccessory,
  selectedPetId,
  onSelectPet,
  onBack
}) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [floatingHeart, setFloatingHeart] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [activeTab, setActiveTab] = useState('prado'); // 'prado' | 'estanque' | 'bosque'
  const [petQuote, setPetQuote] = useState('');

  // Biomes grouping
  const biomes = {
    prado: {
      name: 'El Prado Soleado',
      icon: '🌿',
      desc: 'Donde corren y juegan los cachorros y amigos terrestres',
      pets: ['dog', 'cat', 'rabbit', 'fox', 'lion', 'hedgehog']
    },
    estanque: {
      name: 'El Estanque Termal',
      icon: '🌊',
      desc: 'Aguas cristalinas y baños tibios para nadar en paz',
      pets: ['turtle', 'dolphin', 'capybara']
    },
    bosque: {
      name: 'El Bosque Alto',
      icon: '🎋',
      desc: 'Árboles altos y cañas de bambú para descansar y observar',
      pets: ['panda', 'koala', 'owl', 'giraffe', 'elephant']
    }
  };

  // Open pet care modal
  const handleOpenPet = (pet) => {
    sound.pop();
    setSelectedPet(pet);
    setPetQuote(pet.phrase);
  };

  // Action: Feed the pet
  const handleFeed = () => {
    if (!selectedPet) return;
    if (foodStock <= 0) {
      sound.retry();
      setPetQuote('¡No quedan raciones en la cesta! Juega a matemáticas, lectura o ciencias para ganar más comida.');
      return;
    }

    sound.chomp();
    setIsEating(true);
    setFloatingHeart(true);
    setTimeout(() => setIsEating(false), 800);
    setTimeout(() => setFloatingHeart(false), 1200);

    const leveledUp = onFeedPet(selectedPet.id);
    if (leveledUp) {
      sound.levelUp();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
      setPetQuote(`🎉 ¡¡${selectedPet.name} ha subido de nivel de amistad contigo!! Te quiere un montón.`);
    } else {
      const tastyPhrases = [
        `¡Ñam ñam! ¡Qué rico está este ${selectedPet.food.toLowerCase()}!`,
        `¡Delicioso! Muchas gracias por alimentarme tan bien.`,
        `¡Qué sabroso! Ahora tengo energía para correr y aprender contigo.`
      ];
      setPetQuote(tastyPhrases[Math.floor(Math.random() * tastyPhrases.length)]);
    }
  };

  // Action: Pet/cuddle the pet
  const handlePetAction = () => {
    if (!selectedPet) return;
    sound.purr();
    setFloatingHeart(true);
    setTimeout(() => setFloatingHeart(false), 1000);

    const cuddles = [
      `¡Ronroneo de alegría! ¡Qué cosquillas más ricas!`,
      `¡Guau! Me encantan tus caricias con tanto cariño.`,
      `¡Tus mimos me llenan el corazón de alegría!`,
      `¡Eres mi mejor amiga de todo el mundo!`
    ];
    setPetQuote(cuddles[Math.floor(Math.random() * cuddles.length)]);
  };

  const currentPetFriendship = selectedPet ? (petFriendship[selectedPet.id] || { level: 1, exp: 0 }) : null;
  const currentPetAccessoryId = selectedPet ? petAccessories[selectedPet.id] : null;
  const currentPetAccessory = ACCESSORIES.find((a) => a.id === currentPetAccessoryId);

  return (
    <div className="max-w-5xl mx-auto p-3 md:p-6 pb-24 animate-in fade-in duration-300">
      {/* Top Navigation & Status Bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button
          onClick={() => {
            sound.pop();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-white rounded-2xl shadow-sm border border-emerald-300 text-slate-800 font-bold active:scale-95 transition-all text-xs md:text-sm"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>Volver a Estudiar</span>
        </button>

        {/* Resources: Food Basket & Stars */}
        <div className="flex items-center gap-3">
          {/* Food basket counter */}
          <div className="flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 text-amber-950 px-3.5 py-1.5 rounded-2xl font-black text-xs md:text-sm shadow-sm">
            <span className="text-lg">🧺</span>
            <span>{foodStock} Raciones</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-3.5 py-1.5 rounded-2xl font-black text-xs md:text-sm shadow-sm border border-amber-600/20">
            <Star className="w-4 h-4 fill-amber-950 text-amber-950" />
            <span>{stars} Estrellas</span>
          </div>
        </div>
      </div>

      {/* Hero Farm Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl p-5 md:p-7 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            La Granja Mágica
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-1">El Prado de tus Animalitos</h2>
          <p className="text-emerald-100 text-xs md:text-sm font-semibold mt-1">
            Toca a cualquier animal para darle de comer su comida favorita, hacerle mimos y subir vuestro nivel de amistad. ¡Gana comida y estrellas jugando!
          </p>
        </div>
        <div className="absolute right-4 bottom-2 text-6xl md:text-8xl opacity-25 select-none">
          🏡
        </div>
      </div>

      {/* Biome Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border-2 border-emerald-200 shadow-sm max-w-lg mx-auto">
        {Object.entries(biomes).map(([key, biome]) => (
          <button
            key={key}
            onClick={() => {
              sound.pop();
              setActiveTab(key);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === key
                ? 'bg-emerald-500 text-white shadow-md scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-emerald-50'
            }`}
          >
            <span>{biome.icon}</span>
            <span>{biome.name.split(' ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Active Biome Landscape */}
      <div className="relative rounded-3xl border-4 border-emerald-300 shadow-2xl overflow-hidden p-6 md:p-8 min-h-[380px] flex flex-col justify-between transition-colors duration-500 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100">
        {/* Sky decorative elements */}
        <div className="absolute top-4 left-6 text-3xl opacity-80 animate-pulse select-none">☀️</div>
        <div className="absolute top-6 right-16 text-3xl opacity-60 select-none">☁️</div>
        <div className="absolute top-12 left-1/3 text-2xl opacity-50 select-none">☁️</div>

        {/* Biome Title & Theme description */}
        <div className="relative z-10 bg-white/75 backdrop-blur-sm rounded-2xl p-3 border border-emerald-200 max-w-md mx-auto text-center shadow-sm mb-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">{biomes[activeTab].icon}</span>
            <h3 className="text-lg font-black text-slate-800">{biomes[activeTab].name}</h3>
          </div>
          <p className="text-xs font-semibold text-slate-600 mt-0.5">{biomes[activeTab].desc}</p>
        </div>

        {/* Animals roaming in this biome */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 my-auto">
          {biomes[activeTab].pets.map((petId) => {
            const pet = PETS.find((p) => p.id === petId);
            if (!pet) return null;

            const isUnlocked = stars >= pet.unlockedAtStars;
            const friendship = petFriendship[pet.id] || { level: 1, exp: 0 };
            const equippedAcc = ACCESSORIES.find((a) => a.id === petAccessories[pet.id]);

            return (
              <div
                key={pet.id}
                onClick={() => {
                  if (isUnlocked) {
                    handleOpenPet(pet);
                  }
                }}
                className={`relative rounded-3xl p-4 border-4 transition-all flex flex-col items-center text-center ${
                  isUnlocked
                    ? 'bg-white/95 border-emerald-300 hover:border-amber-400 shadow-lg cursor-pointer hover:scale-105 active:scale-95'
                    : 'bg-slate-200/80 border-slate-300 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Special 1000 stars Capibara badge */}
                {pet.id === 'capybara' && (
                  <span className="absolute -top-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap border border-amber-300">
                    {isUnlocked ? '✨ ¡Reina de la Granja!' : '👑 Gran Reto: 1000 ⭐'}
                  </span>
                )}

                {/* Pet Avatar */}
                <div className="my-2">
                  <PetAvatar
                    petId={pet.id}
                    size="normal"
                    isHappy={isUnlocked}
                    accessory={equippedAcc}
                  />
                </div>

                {/* Name & Info */}
                <div className="font-black text-base md:text-lg text-slate-800">{pet.name}</div>
                <div className="text-[11px] font-bold text-slate-500">{pet.species}</div>

                {/* Unlocked state: Friendship Hearts & Favorite food */}
                {isUnlocked ? (
                  <div className="mt-2 w-full">
                    {/* Heart meter */}
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((h) => (
                        <Heart
                          key={h}
                          className={`w-3.5 h-3.5 ${
                            h <= friendship.level
                              ? 'fill-rose-500 text-rose-500'
                              : 'fill-slate-200 text-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-[10px] font-black text-emerald-700 bg-emerald-50 rounded-xl py-0.5 px-2 border border-emerald-200 inline-flex items-center gap-1">
                      <span>Come:</span> {pet.foodIcon} {pet.food.split(' ')[0]}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 text-xs font-black text-slate-600 bg-slate-300/80 rounded-xl py-1 px-2.5 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>{pet.unlockedAtStars} ⭐</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ground grass texture decoration */}
        <div className="relative z-0 h-6 bg-emerald-400/30 rounded-full mt-4 flex items-center justify-around text-xs opacity-75 select-none">
          <span>🌸</span>
          <span>🌿</span>
          <span>🌼</span>
          <span>🌿</span>
          <span>🌸</span>
          <span>🌿</span>
          <span>🌼</span>
        </div>
      </div>

      {/* Interactive Pet Care Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 md:p-7 border-4 border-amber-300 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => {
                sound.pop();
                setSelectedPet(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
                Cuidando a tu amigo
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-1">
                {selectedPet.name} el {selectedPet.species}
              </h3>
            </div>

            {/* Big Animated Pet Avatar with Floating Hearts */}
            <div className="relative flex justify-center my-3">
              <div className={`transition-transform duration-300 ${isEating ? 'scale-115' : ''}`}>
                <PetAvatar
                  petId={selectedPet.id}
                  size="large"
                  isHappy={true}
                  accessory={currentPetAccessory}
                />
              </div>

              {/* Floating Heart animation */}
              {floatingHeart && (
                <div className="absolute top-0 text-4xl animate-bounce-gentle select-none pointer-events-none">
                  💖
                </div>
              )}
            </div>

            {/* Pet Speech Bubble Quote */}
            <div className="bg-amber-50 rounded-2xl p-3 border-2 border-amber-200 text-center mb-4 relative shadow-sm">
              <p className="text-xs md:text-sm font-extrabold text-amber-950">
                «{petQuote}»
              </p>
            </div>

            {/* Friendship Level & Progress Bar */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border-2 border-slate-200 mb-5">
              <div className="flex items-center justify-between text-xs font-black mb-1.5">
                <span className="flex items-center gap-1 text-rose-600">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>Amistad: Nivel {currentPetFriendship?.level || 1} de 5</span>
                </span>
                <span className="text-slate-500">
                  {currentPetFriendship?.exp || 0} / 100 EXP
                </span>
              </div>

              {/* EXP bar */}
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  style={{ width: `${currentPetFriendship?.exp || 0}%` }}
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Primary Care Actions (Alimentar y Acariciar) */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Button: Dar de comer */}
              <button
                onClick={handleFeed}
                className="p-4 bg-gradient-to-b from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 active:scale-95 text-amber-950 font-black rounded-2xl shadow-md border-b-4 border-amber-600 flex flex-col items-center justify-center transition-all touch-manipulation"
              >
                <div className="text-3xl filter drop-shadow mb-1">{selectedPet.foodIcon}</div>
                <div className="text-sm font-black">Dar de comer</div>
                <div className="text-[10px] font-bold opacity-80 mt-0.5">
                  Gasta 1 comida (Tienes {foodStock})
                </div>
              </button>

              {/* Button: Acariciar / Mimar */}
              <button
                onClick={handlePetAction}
                className="p-4 bg-gradient-to-b from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 active:scale-95 text-white font-black rounded-2xl shadow-md border-b-4 border-rose-600 flex flex-col items-center justify-center transition-all touch-manipulation"
              >
                <div className="text-3xl filter drop-shadow mb-1">💖</div>
                <div className="text-sm font-black">Hacer mimos</div>
                <div className="text-[10px] font-bold opacity-90 mt-0.5">
                  ¡Acaricia a {selectedPet.name}!
                </div>
              </button>
            </div>

            {/* Accessory Wardrobe for this specific pet */}
            <div>
              <span className="text-xs font-black uppercase text-slate-500 block mb-2">
                👑 Vestir a {selectedPet.name} con un accesorio:
              </span>

              <div className="flex flex-wrap gap-2">
                {/* None option */}
                <button
                  onClick={() => {
                    sound.pop();
                    onEquipAccessory(selectedPet.id, null);
                  }}
                  className={`px-3 py-1.5 rounded-xl border-2 text-xs font-bold transition-all ${
                    currentPetAccessoryId === null
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300'
                  }`}
                >
                  Sin accesorio
                </button>

                {/* Unlocked accessories */}
                {ACCESSORIES.filter((a) => stars >= a.requiredStars).map((acc) => {
                  const isSelected = currentPetAccessoryId === acc.id;

                  return (
                    <button
                      key={acc.id}
                      onClick={() => {
                        sound.pop();
                        onEquipAccessory(selectedPet.id, acc.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-amber-100 border-amber-400 text-amber-950 font-black shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <span>{acc.icon}</span>
                      <span>{acc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Set as Active Study Companion */}
            {onSelectPet && (
              <div className="mt-5 pt-4 border-t-2 border-slate-100">
                {selectedPetId === selectedPet.id ? (
                  <div className="w-full py-2.5 px-4 bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-black rounded-2xl text-center text-xs md:text-sm flex items-center justify-center gap-2">
                    <span>✨</span>
                    <span>¡{selectedPet.name} es tu compañera de estudio actual!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      sound.pop();
                      onSelectPet(selectedPet.id);
                    }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-black rounded-2xl shadow-md transition-all text-xs md:text-sm flex items-center justify-center gap-2"
                  >
                    <span>🎒</span>
                    <span>Llevar a {selectedPet.name} a estudiar conmigo</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
