import React, { useState } from 'react';
import { ProgressData, ProgressPoint } from '../types';
import { PlusCircle, LineChart as ChartIcon, CheckCircle2 } from 'lucide-react';

interface ProgressChartProps {
  data: ProgressData;
  onAddDataPoint: (week: number, value: number) => void;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, onAddDataPoint }) => {
  const [newValue, setNewValue] = useState('');
  const [newWeek, setNewWeek] = useState('');
  const [validation, setValidation] = useState<string | null>(null);

  const points = data.dataPoints;
  
  // Calculate SVG dimensions and scales
  const width = 600;
  const height = 300;
  const padding = 40;

  const minX = Math.min(...points.map(p => p.week));
  const maxX = Math.max(...points.map(p => p.week), points.length > 0 ? points[points.length-1].week + 1 : 4);
  const minY = Math.min(...points.map(p => p.value)) * 0.9; // 10% buffer
  const maxY = Math.max(...points.map(p => p.value)) * 1.1;

  const xScale = (week: number) => ((week - minX) / (maxX - minX)) * (width - 2 * padding) + padding;
  const yScale = (value: number) => height - padding - ((value - minY) / (maxY - minY)) * (height - 2 * padding);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue || !newWeek) return;
    
    onAddDataPoint(Number(newWeek), Number(newValue));
    setValidation(`Wizualizacja zaktualizowana. Dodano punkt: Tydzień ${newWeek}, ${newValue}${data.unit}.`);
    setNewValue('');
    setNewWeek('');
    
    // Clear validation after 3s
    setTimeout(() => setValidation(null), 3000);
  };

  // Sort points to draw lines correctly
  const sortedPoints = [...points].sort((a, b) => a.week - b.week);
  
  // Separate projected and actual for styling
  const projectedPoints = sortedPoints.filter(p => p.type === 'projected');
  const actualPoints = sortedPoints.filter(p => p.type === 'actual');

  // Helper to build path string
  const buildPath = (pts: ProgressPoint[]) => {
    if (pts.length === 0) return '';
    const d = pts.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${xScale(p.week)} ${yScale(p.value)}`
    ).join(' ');
    return d;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <ChartIcon className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Progres: {data.metricName}</h3>
          <p className="text-sm text-slate-500">Śledzenie postępów względem planu</p>
        </div>
      </div>

      {validation && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm animate-pulse">
          <CheckCircle2 className="w-4 h-4" />
          {validation}
        </div>
      )}

      {/* SVG Chart */}
      <div className="w-full overflow-x-auto">
        <svg width="100%" height="300" viewBox={`0 0 ${width} ${height}`} className="bg-slate-50 rounded-lg border border-slate-100">
          {/* Grid Lines Y */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
             const yVal = minY + (maxY - minY) * t;
             const yPos = yScale(yVal);
             return (
               <g key={i}>
                 <line x1={padding} y1={yPos} x2={width - padding} y2={yPos} stroke="#e2e8f0" strokeDasharray="4" />
                 <text x={padding - 10} y={yPos + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                   {Math.round(yVal)}
                 </text>
               </g>
             );
          })}

          {/* X Axis Labels */}
          {sortedPoints.map((p, i) => (
            <text key={i} x={xScale(p.week)} y={height - padding + 20} textAnchor="middle" fontSize="10" fill="#64748b">
              Tydz {p.week}
            </text>
          ))}

          {/* Lines */}
          <path 
            d={buildPath(projectedPoints)} 
            fill="none" 
            stroke="#cbd5e1" 
            strokeWidth="3" 
            strokeDasharray="5,5" 
          />
          <path 
            d={buildPath(actualPoints)} 
            fill="none" 
            stroke="#4f46e5" 
            strokeWidth="3" 
          />

          {/* Points */}
          {sortedPoints.map((p, i) => (
            <circle
              key={i}
              cx={xScale(p.week)}
              cy={yScale(p.value)}
              r={p.type === 'actual' ? 6 : 4}
              fill={p.type === 'actual' ? '#4f46e5' : '#fff'}
              stroke={p.type === 'actual' ? '#fff' : '#cbd5e1'}
              strokeWidth={2}
              className="transition-all hover:r-8 cursor-pointer"
            >
              <title>{p.value} {data.unit} ({p.type === 'actual' ? 'Aktualny' : 'Projektowany'})</title>
            </circle>
          ))}
        </svg>
      </div>
      
      <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-1 bg-slate-300 border-b border-slate-300 border-dashed"></span>
          Prognoza AI
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-indigo-600 border border-white"></span>
          Twoje Wyniki
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAdd} className="mt-6 flex items-end gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Tydzień</label>
          <input
            type="number"
            min="0"
            max="52"
            value={newWeek}
            onChange={e => setNewWeek(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            placeholder="Nr"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Wynik ({data.unit})</label>
          <input
            type="number"
            step="0.1"
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            placeholder="Wartość"
            required
          />
        </div>
        <button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
};