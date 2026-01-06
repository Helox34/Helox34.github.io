export type AppStep = 'checklist' | 'interview' | 'generating' | 'plan_view';

export enum CreatorMode {
  WORKOUT = 'workout',
  DIET = 'diet'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PlanItem {
  name: string;
  details: string; // Sets/Reps or Grams/Calories
  note?: string;
}

export interface PlanDay {
  dayName: string;
  items: PlanItem[];
  summary?: string;
}

export interface ProgressPoint {
  week: number;
  value: number; // The metric value
  type: 'projected' | 'actual';
}

export interface ProgressData {
  metricName: string; // e.g. "Waga Ciała" or "Wyciskanie Leżąc"
  unit: string; // e.g. "kg"
  dataPoints: ProgressPoint[];
}

export interface GeneratedPlan {
  title: string;
  description: string;
  mode: CreatorMode;
  schedule: PlanDay[];
  progress?: ProgressData; // Added optional progress data
}

export interface ModificationResult {
  approved: boolean;
  plan: GeneratedPlan | null;
  validationLog: string; // The short 1-2 sentence validation
  refusalReason?: string;
}
