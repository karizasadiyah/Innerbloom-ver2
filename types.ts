export enum QuestionCategory {
  SOCRATIC = 'Socratic',
  GROUNDING = 'Grounding',
  AMU = 'AMU', // Awareness, Mindfulness, Understanding
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  options?: string[]; // For suggested multiple choice options (input is still text)
  scenario?: string; // For scenario-based context
}

export type VibeType = 'happy' | 'content' | 'neutral' | 'anxious' | 'sad';

export interface VibeCheckResult {
  stage: 'start' | 'middle' | 'end';
  vibe: VibeType;
  timestamp: number;
}

export interface AnalysisResult {
  summary: string;
  deepInsight: string;
  healingEraRoadmap: string[];
  realityCheck: string;
  interactiveLifePath: {
    feelings: string;
    triggers: string;
    coping: string;
    steps: string;
  };
  chartData: {
    sadness: number;
    anxiety: number;
    selfLove: number;
    awareness: number;
    innerChildHealing: number;
  };
}

export interface SessionState {
  step: 'intro' | 'vibe-start' | 'questions-1' | 'vibe-middle' | 'questions-2' | 'vibe-end' | 'analyzing' | 'results';
  answers: Record<string, string>;
  selectedQuestions: Question[];
  currentQuestionIndex: number;
  vibes: VibeCheckResult[];
  analysis: AnalysisResult | null;
}