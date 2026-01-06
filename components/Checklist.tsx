import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CreatorMode } from '../types';

interface ChecklistProps {
  onStart: (mode: CreatorMode) => void;
}

const steps = [
  "Wywiad wstępny: Opowiedz o swoich celach, doświadczeniu i stanie zdrowia.",
  "Analiza AI: System przetworzy Twoje dane, uwzględniając przeciwwskazania.",
  "Generowanie Planu: Otrzymasz kompletny, spersonalizowany harmonogram.",
  "Przegląd i Akceptacja: Zapoznaj się z propozycją.",
  "Modyfikacja z Walidacją: Możesz poprosić o zmiany – AI sprawdzi ich bezpieczeństwo.",
  "Finalizacja: Zatwierdź ostateczną wersję planu."
];

export const Checklist: React.FC<ChecklistProps> = ({ onStart }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
        Twój Inteligentny Planer
      </h2>
      <p className="text-slate-600 mb-8 text-center">
        Zanim zaczniemy, zobacz jak wygląda proces tworzenia Twojego idealnego planu.
      </p>

      <div className="space-y-4 mb-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-slate-700 font-medium leading-relaxed">{step}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onStart(CreatorMode.WORKOUT)}
          className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-200"
        >
          Stwórz Plan Treningowy
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => onStart(CreatorMode.DIET)}
          className="group flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-emerald-200"
        >
          Stwórz Dietę
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};