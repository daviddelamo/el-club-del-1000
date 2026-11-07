import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Sparkles, Check, RotateCcw, Plus, Trophy, Zap } from 'lucide-react';
import { sound } from '../sounds';
import PetAvatar from './PetAvatar';
import Keypad from './Keypad';

export default function AbnRejilla({ onBack, onAddStar, pet }) {
  // Problem state
  const [numA, setNumA] = useState(346);
  const [numB, setNumB] = useState(278);
  const [difficulty, setDifficulty] = useState(3); // 2 or 3 digits

  // Current progression in the grid
  // History is array of: { paso: number, queda: number, tengo: number }
  const [rows, setRows] = useState([]);
  const [currentQueda, setCurrentQueda] = useState(278);
  const [currentTengo, setCurrentTengo] = useState(346);
  const [inputVal, setInputVal] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Start new problem
  const startNewProblem = (diff = difficulty) => {
    let a, b;
    if (diff === 2) {
      a = Math.floor(Math.random() * 60) + 25; // 25-85
      b = Math.floor(Math.random() * 60) + 18; // 18-78
    } else {
      a = Math.floor(Math.random() * 500) + 150; // 150-650
      b = Math.floor(Math.random() * 400) + 120; // 120-520
    }
    setNumA(a);
    setNumB(b);
    setCurrentQueda(b);
    setCurrentTengo(a);
    setRows([]);
    setInputVal('');
    setIsCompleted(false);
    setErrorMessage('');
  };

  useEffect(() => {
    startNewProblem(difficulty);
  }, [difficulty]);

  // Handle transfer step
  const handleTransfer = (amountToTransfer) => {
    const amount = parseInt(amountToTransfer, 10);
    setErrorMessage('');

    if (isNaN(amount) || amount <= 0) {
      sound.retry();
      setErrorMessage('Introduce una cantidad mayor que cero.');
      return;
    }

    if (amount > currentQueda) {
      sound.retry();
      setErrorMessage(`No puedes pasar ${amount} porque solo te quedan ${currentQueda}.`);
      return;
    }

    sound.pop();
    const newQueda = currentQueda - amount;
    const newTengo = currentTengo + amount;

    const newRows = [...rows, { paso: amount, queda: newQueda, tengo: newTengo }];
    setRows(newRows);
    setCurrentQueda(newQueda);
    setCurrentTengo(newTengo);
    setInputVal('');

    // Check if finished
    if (newQueda === 0) {
      sound.success();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      setIsCompleted(true);
      onAddStar();
    }
  };

  // Quick suggestion chips based on what's left
  const getSuggestions = () => {
    const list = [];
    if (currentQueda >= 100) {
      const hundreds = Math.floor(currentQueda / 100) * 100;
      list.push(hundreds);
      if (hundreds > 100) list.push(100);
    }
    if (currentQueda >= 10) {
      const tens = Math.floor((currentQueda % 100) / 10) * 10;
      if (tens > 0 && !list.includes(tens)) list.push(tens);
    }
    const units = currentQueda % 10;
    if (units > 0 && !list.includes(units)) list.push(units);
    if (!list.includes(currentQueda) && currentQueda > 0) list.push(currentQueda);

    return list.slice(0, 4);
  };

  return (
    <div className="max-w-3xl mx-auto p-3 md:p-6 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            sound.pop();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-2xl shadow-sm border border-amber-200 text-slate-700 font-bold active:scale-95 transition-all text-xs md:text-sm"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>Volver a Temas</span>
        </button>

        {/* Difficulty switcher */}
        <div className="flex items-center bg-white border border-amber-300 rounded-2xl p-1 shadow-sm text-xs font-black">
          <button
            onClick={() => {
              sound.pop();
              setDifficulty(2);
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              difficulty === 2 ? 'bg-amber-400 text-amber-950 shadow-sm' : 'text-slate-500'
            }`}
          >
            2 Cifras
          </button>
          <button
            onClick={() => {
              sound.pop();
              setDifficulty(3);
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              difficulty === 3 ? 'bg-amber-400 text-amber-950 shadow-sm' : 'text-slate-500'
            }`}
          >
            3 Cifras
          </button>
        </div>
      </div>

      {/* Hero card */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-4 md:p-6 text-white shadow-lg mb-6 flex items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Suma ABN
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">La Rejilla Mágica</h2>
          <p className="text-amber-100 text-xs md:text-sm font-semibold mt-0.5">
            Pasa cantidades poco a poco del segundo montón al primero hasta que no quede nada.
          </p>
        </div>
        <div className="hidden sm:block">
          <PetAvatar petId={pet?.id || 'dog'} size="small" isHappy={isCompleted} />
        </div>
      </div>

      {/* Main calculation formula */}
      <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-amber-200 mb-6 text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operación:</span>
        <div className="text-3xl md:text-4xl font-black text-slate-800 tracking-wide mt-1">
          <span className="text-indigo-600">{numA}</span> + <span className="text-amber-600">{numB}</span>
          {isCompleted && (
            <span className="text-emerald-600 animate-in fade-in"> = {currentTengo} 🎉</span>
          )}
        </div>
      </div>

      {/* The 3-Column ABN Grid */}
      <div className="bg-white rounded-3xl shadow-xl border-4 border-amber-300 overflow-hidden mb-6">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-amber-100/80 border-b-2 border-amber-300 text-xs md:text-sm font-black text-amber-950">
              <th className="py-3 px-2 border-r-2 border-amber-200">
                ¿Cuánto paso? <br />
                <span className="text-[10px] font-bold text-amber-700 font-normal">(Cojo de {numB})</span>
              </th>
              <th className="py-3 px-2 border-r-2 border-amber-200">
                ¿Cuánto queda? <br />
                <span className="text-[10px] font-bold text-amber-700 font-normal">(Por sumar)</span>
              </th>
              <th className="py-3 px-2">
                ¿Cuánto tengo? <br />
                <span className="text-[10px] font-bold text-amber-700 font-normal">(Acumulado)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Initial row */}
            <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-bold text-sm md:text-base">
              <td className="py-2.5 px-2 border-r border-slate-100 text-slate-400">—</td>
              <td className="py-2.5 px-2 border-r border-slate-100 font-black text-amber-800">{numB}</td>
              <td className="py-2.5 px-2 font-black text-indigo-800">{numA}</td>
            </tr>

            {/* Dynamic transfer rows */}
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-amber-100 text-sm md:text-lg font-black animate-in fade-in">
                <td className="py-2.5 px-2 border-r border-amber-100 text-emerald-600 bg-emerald-50/30">
                  +{row.paso}
                </td>
                <td className="py-2.5 px-2 border-r border-amber-100 text-amber-700">
                  {row.queda === 0 ? (
                    <span className="text-emerald-600 font-black">¡0!</span>
                  ) : (
                    row.queda
                  )}
                </td>
                <td className="py-2.5 px-2 text-indigo-700 bg-indigo-50/20">
                  {row.tengo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Completion announcement */}
        {isCompleted && (
          <div className="bg-emerald-500 text-white p-5 text-center animate-in zoom-in-95">
            <h4 className="text-2xl font-black">¡Fantástico! Rejilla completada</h4>
            <p className="text-emerald-100 text-sm font-semibold mt-1">
              Resultado final: <span className="text-white text-xl font-black">{currentTengo}</span> en {rows.length} pasos. ¡Has ganado 1 estrella! ⭐
            </p>
            <button
              onClick={() => startNewProblem()}
              className="mt-4 px-6 py-2.5 bg-white text-emerald-800 font-black text-sm rounded-2xl shadow-md hover:bg-emerald-50 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Siguiente Suma ABN</span>
            </button>
          </div>
        )}
      </div>

      {/* Input section (active if not completed) */}
      {!isCompleted && (
        <div className="bg-white/95 rounded-3xl p-4 md:p-6 shadow-xl border-2 border-amber-200">
          <div className="text-center mb-3">
            <span className="text-xs font-bold text-slate-500">
              Quedan <strong className="text-amber-700">{currentQueda}</strong> por pasar. Elige cuánto quieres pasar ahora:
            </span>
          </div>

          {/* Quick suggestions chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {getSuggestions().map((sug, i) => (
              <button
                key={i}
                onClick={() => handleTransfer(sug)}
                className="px-4 py-2 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 border border-amber-300 rounded-2xl text-amber-950 font-black text-sm active:scale-95 transition-all shadow-sm flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-amber-700" />
                <span>Pasar {sug}</span>
              </button>
            ))}
          </div>

          {/* Keypad entry for custom amount */}
          <div className="max-w-xs mx-auto">
            {errorMessage && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2 mb-2 text-center">
                {errorMessage}
              </p>
            )}
            <Keypad
              value={inputVal}
              onChange={setInputVal}
              onSubmit={() => handleTransfer(inputVal)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
