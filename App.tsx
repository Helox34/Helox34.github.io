import React, { useState } from 'react';
import { Checklist } from './components/Checklist';
import { Interview } from './components/Interview';
import { PlanDisplay } from './components/PlanDisplay';
import { AppStep, CreatorMode, ChatMessage, GeneratedPlan } from './types';
import { generateInitialPlan } from './services/geminiService';
import { Activity, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('checklist');
  const [mode, setMode] = useState<CreatorMode>(CreatorMode.WORKOUT);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);

  const startInterview = (selectedMode: CreatorMode) => {
    setMode(selectedMode);
    setStep('interview');
  };

  const finishInterview = async (finalHistory: ChatMessage[]) => {
    setHistory(finalHistory);
    setStep('generating');
    try {
      const generatedPlan = await generateInitialPlan(finalHistory, mode);
      setPlan(generatedPlan);
      setStep('plan_view');
    } catch (error) {
      console.error("Failed to generate plan:", error);
      alert("Nie udało się wygenerować planu. Spróbuj ponownie później.");
      setStep('interview'); // Go back to interview on fail
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg text-white">
            <Activity className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">FitPlan AI</span>
          <div className="ml-auto flex items-center gap-2">
            {step !== 'checklist' && (
              <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-full text-slate-500 uppercase tracking-wide">
                {step === 'interview' ? 'Wywiad' : step === 'generating' ? 'Generowanie' : 'Twój Plan'}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {step === 'checklist' && (
            <div className="mt-10 animate-fade-in">
              <Checklist onStart={startInterview} />
            </div>
          )}

          {step === 'interview' && (
            <div className="mt-6 animate-slide-up">
              <Interview mode={mode} onFinished={finishInterview} />
            </div>
          )}

          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 animate-pulse">
              <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6" />
              <h2 className="text-2xl font-semibold mb-2 text-slate-800">Analizuję Twoje odpowiedzi...</h2>
              <p>Tworzę idealnie dopasowany plan {mode === CreatorMode.WORKOUT ? 'treningowy' : 'dietetyczny'}.</p>
              <p className="text-sm mt-2 opacity-75">To może potrwać kilka sekund.</p>
            </div>
          )}

          {step === 'plan_view' && plan && (
            <div className="animate-fade-in">
              <PlanDisplay 
                plan={plan} 
                onUpdatePlan={(newPlan) => setPlan(newPlan)} 
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;