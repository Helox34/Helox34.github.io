import React, { useState } from 'react';
import { GeneratedPlan, ModificationResult, ProgressPoint } from '../types';
import { modifyPlanWithAI } from '../services/geminiService';
import { ProgressChart } from './ProgressChart';
import { Edit2, CheckCircle, AlertTriangle, Loader2, Dumbbell, Utensils, Calendar, TrendingUp } from 'lucide-react';

interface PlanDisplayProps {
  plan: GeneratedPlan;
  onUpdatePlan: (newPlan: GeneratedPlan) => void;
}

export const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, onUpdatePlan }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'progress'>('schedule');
  const [modificationRequest, setModificationRequest] = useState('');
  const [isModifying, setIsModifying] = useState(false);
  const [validationMsg, setValidationMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleModify = async () => {
    if (!modificationRequest.trim()) return;

    setIsModifying(true);
    setValidationMsg(null);

    try {
      const result: ModificationResult = await modifyPlanWithAI(plan, modificationRequest);

      if (result.approved && result.plan) {
        onUpdatePlan(result.plan);
        setValidationMsg({ text: result.validationLog, type: 'success' });
        setModificationRequest('');
      } else {
        setValidationMsg({ 
          text: result.refusalReason ? `${result.validationLog} (Powód: ${result.refusalReason})` : result.validationLog, 
          type: 'error' 
        });
      }
    } catch (e) {
      setValidationMsg({ text: "Wystąpił błąd podczas komunikacji z AI.", type: 'error' });
    } finally {
      setIsModifying(false);
    }
  };

  const handleAddProgressPoint = (week: number, value: number) => {
    if (!plan.progress) return;

    const newPoint: ProgressPoint = { week, value, type: 'actual' };
    
    // Remove existing point for same week if exists (overwrite)
    const updatedPoints = plan.progress.dataPoints.filter(p => !(p.week === week && p.type === 'actual'));
    updatedPoints.push(newPoint);

    const updatedPlan: GeneratedPlan = {
      ...plan,
      progress: {
        ...plan.progress,
        dataPoints: updatedPoints
      }
    };

    onUpdatePlan(updatedPlan);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{plan.title}</h1>
          <p className="text-slate-500 mt-1">{plan.description}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-slate-600 font-medium">
          {plan.mode === 'workout' ? <Dumbbell className="w-5 h-5" /> : <Utensils className="w-5 h-5" />}
          {plan.mode === 'workout' ? 'Plan Treningowy' : 'Plan Dietetyczny'}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 px-2 flex items-center gap-2 font-medium transition-colors ${
            activeTab === 'schedule' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Harmonogram
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`pb-3 px-2 flex items-center gap-2 font-medium transition-colors ${
            activeTab === 'progress' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Postępy
        </button>
      </div>

      {/* Validation Message (General) */}
      {validationMsg && (
        <div className={`rounded-xl p-4 flex items-start gap-3 border ${
          validationMsg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {validationMsg.type === 'success' ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <AlertTriangle className="w-5 h-5 mt-0.5" />}
          <div>
            <p className="font-semibold">{validationMsg.type === 'success' ? 'Walidacja pomyślna' : 'Zmiana odrzucona'}</p>
            <p className="text-sm opacity-90">{validationMsg.text}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'schedule' ? (
          /* Plan Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {plan.schedule.map((day, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-slate-50 border-b border-slate-100 p-4">
                  <h3 className="font-bold text-slate-700">{day.dayName}</h3>
                  {day.summary && <p className="text-xs text-slate-500 mt-1">{day.summary}</p>}
                </div>
                <div className="p-4 space-y-4">
                  {day.items.map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-medium text-slate-800 text-sm">{item.name}</span>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md whitespace-nowrap">
                          {item.details}
                        </span>
                      </div>
                      {item.note && (
                        <p className="text-xs text-slate-400 mt-1 italic">{item.note}</p>
                      )}
                      {i < day.items.length - 1 && <hr className="my-3 border-slate-100" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Progress Chart Section */
          <div className="max-w-3xl mx-auto">
             {plan.progress ? (
               <ProgressChart 
                 data={plan.progress} 
                 onAddDataPoint={handleAddProgressPoint}
               />
             ) : (
               <div className="text-center p-12 text-slate-500 bg-white rounded-xl border border-slate-200">
                 Brak danych o postępach dla tego planu.
               </div>
             )}
          </div>
        )}
      </div>

      {/* Floating Modification Bar - Only visible on Schedule tab generally, but let's keep it global */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto flex gap-3 items-center">
          <div className="relative flex-1">
            <Edit2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={modificationRequest}
              onChange={(e) => setModificationRequest(e.target.value)}
              placeholder="Np. Zamień poniedziałkowy trening na lżejszy..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isModifying}
            />
          </div>
          <button
            onClick={handleModify}
            disabled={isModifying || !modificationRequest.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {isModifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analiza...
              </>
            ) : (
              "Zatwierdź zmianę"
            )}
          </button>
        </div>
      </div>

    </div>
  );
};