import React from 'react';
import { ArrowLeft, Sparkles, Lock, CheckCircle2, Star, BookOpen, Compass, Calculator } from 'lucide-react';
import { sound } from '../sounds';

export default function HubMenu({ currentModule, onSelectModule, onBack }) {
  const subjects = [
    {
      id: 'math',
      title: 'Matemáticas ABN',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500',
      modules: [
        {
          id: 'abn_1000',
          title: 'Amigos del 1000',
          desc: '¡El reto estrella! Descomposición y la regla 9-9-10',
          level: '2º Primaria',
          target: 1000,
          status: 'active',
          tag: '¡En juego!'
        },
        {
          id: 'abn_100',
          title: 'Amigos del 100',
          desc: 'Decenas exactas y números hasta 100',
          level: 'Repaso base',
          target: 100,
          status: 'active',
          tag: 'Disponible'
        },
        {
          id: 'abn_10',
          title: 'Amigos del 10',
          desc: 'La base de todo el método ABN',
          level: 'Fundamentos',
          target: 10,
          status: 'active',
          tag: 'Disponible'
        },
        {
          id: 'abn_rejilla',
          title: 'La Rejilla ABN (Sumas)',
          desc: 'Pasa cantidades descomponiendo a tu propio ritmo en la tabla de 3 columnas',
          level: '2º Primaria',
          status: 'active',
          tag: '¡Nuevo!'
        },
        {
          id: 'abn_mult',
          title: 'Tablas Extendidas (3x20, 4x50)',
          desc: 'El poder del cálculo mental con ceros',
          level: 'Próximamente',
          status: 'locked'
        }
      ]
    },
    {
      id: 'lang',
      title: 'Lengua y Lectura',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      modules: [
        {
          id: 'spelling',
          title: 'Mascotas Ortográficas (B/V, C/Z, G/J, R/RR)',
          desc: 'Completa las frases con la letra correcta para ganar estrellas',
          level: '2º Primaria',
          status: 'active',
          tag: '¡Nuevo!'
        },
        {
          id: 'reading',
          title: 'Misiones de Lectura Corta',
          desc: 'Preguntas de comprensión con retos divertidos',
          level: 'Próximamente',
          status: 'locked'
        }
      ]
    },
    {
      id: 'science',
      title: 'Ciencias y Entorno',
      icon: <Compass className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500',
      modules: [
        {
          id: 'animals_world',
          title: 'El Reino Animal (Ciencias Naturales)',
          desc: 'Vertebrados, ovíparos, vivíparos y alimentación',
          level: '2º Primaria',
          status: 'active',
          tag: '¡Nuevo!'
        }
      ]
    }
  ];

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

        <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          Centro de Aprendizaje
        </span>
      </div>

      {/* Hero header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black">Plan de Estudios Divertido</h2>
          <p className="text-amber-100 mt-2 max-w-xl font-medium text-sm md:text-base">
            Elige qué tema quieres practicar hoy con tus mascotas. Puedes saltar entre los Amigos del 1000, 100 y 10, o preparar nuevos temas cuando toque en el cole.
          </p>
        </div>
        <div className="absolute right-4 bottom-1 text-7xl md:text-8xl opacity-20 select-none">
          🎓
        </div>
      </div>

      {/* Subject blocks */}
      <div className="space-y-8">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white/90 rounded-3xl p-6 shadow-md border-2 border-amber-100">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${subject.color} text-white shadow-sm`}>
                {subject.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800">{subject.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.modules.map((mod) => {
                const isActive = mod.status === 'active';
                const isCurrent = currentModule === mod.id;

                return (
                  <div
                    key={mod.id}
                    onClick={() => {
                      if (isActive) {
                        sound.pop();
                        onSelectModule(mod.id, mod.target);
                      }
                    }}
                    className={`rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                      isActive
                        ? isCurrent
                          ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-md cursor-pointer'
                          : 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-amber-300 shadow-sm cursor-pointer hover:scale-102'
                        : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-black text-lg text-slate-800">{mod.title}</span>
                        {isActive ? (
                          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                            isCurrent
                              ? 'bg-amber-500 text-white'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {isCurrent ? 'En juego' : mod.tag}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" />
                            {mod.level}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-500 mt-1">{mod.desc}</p>
                    </div>

                    {isActive && (
                      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
                        <span>Practicar este tema</span>
                        <span>➔</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
