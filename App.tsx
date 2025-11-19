import React, { useState, useEffect } from 'react';
import { SessionState, VibeType, AnalysisResult, Question } from './types';
import { getSessionQuestions } from './data/questions';
import { generateAnalysis } from './services/geminiService';

import Intro from './components/Intro';
import VibeCheck from './components/VibeCheck';
import QuestionCard from './components/QuestionCard';
import Results from './components/Results';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [session, setSession] = useState<SessionState>({
    step: 'intro',
    answers: {},
    selectedQuestions: [],
    currentQuestionIndex: 0,
    vibes: [],
    analysis: null,
  });

  // Initialize questions on mount (but don't start yet)
  useEffect(() => {
    const questions = getSessionQuestions();
    setSession(prev => ({ ...prev, selectedQuestions: questions }));
  }, []);

  const handleStart = () => {
    setSession(prev => ({ ...prev, step: 'vibe-start' }));
  };

  const handleVibeSelect = (vibe: VibeType) => {
    const newVibes = [...session.vibes, { 
      stage: session.step === 'vibe-start' ? 'start' : session.step === 'vibe-middle' ? 'middle' : 'end', 
      vibe, 
      timestamp: Date.now() 
    }];

    let nextStep = session.step;
    if (session.step === 'vibe-start') nextStep = 'questions-1';
    else if (session.step === 'vibe-middle') nextStep = 'questions-2';
    else if (session.step === 'vibe-end') {
        handleAnalysis(newVibes);
        return;
    }

    setSession(prev => ({
      ...prev,
      vibes: newVibes as any, // Type assertion for simplicity in transition
      step: nextStep as any,
    }));
  };

  const handleAnswer = (text: string) => {
    const currentQ = session.selectedQuestions[session.currentQuestionIndex];
    const newAnswers = { ...session.answers, [currentQ.id]: text };
    
    const nextIndex = session.currentQuestionIndex + 1;
    
    // Logic for mid-point vibe check (after 6 questions)
    if (nextIndex === 6 && session.step === 'questions-1') {
        setSession(prev => ({
            ...prev,
            answers: newAnswers,
            currentQuestionIndex: nextIndex,
            step: 'vibe-middle'
        }));
        return;
    }

    // Logic for end-point vibe check (after 12 questions)
    if (nextIndex >= 12) {
        setSession(prev => ({
            ...prev,
            answers: newAnswers,
            step: 'vibe-end'
        }));
        return;
    }

    // Just next question
    setSession(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: nextIndex
    }));
  };

  const handleAnalysis = async (finalVibes: any) => {
    setSession(prev => ({ ...prev, vibes: finalVibes, step: 'analyzing' }));
    
    // Construct state for API
    const fullState: SessionState = {
        ...session,
        vibes: finalVibes
    };

    try {
        const result = await generateAnalysis(fullState);
        setSession(prev => ({ ...prev, analysis: result, step: 'results' }));
    } catch (e) {
        console.error(e);
        // Could add error state handling here
    }
  };

  const handleRestart = () => {
    setSession({
        step: 'intro',
        answers: {},
        selectedQuestions: getSessionQuestions(),
        currentQuestionIndex: 0,
        vibes: [],
        analysis: null,
    });
  };

  return (
    <div className="min-h-screen font-sans text-stone-800 selection:bg-rose-200 selection:text-rose-900 pb-8">
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        
        {/* Logo / Header */}
        {session.step !== 'intro' && (
            <header className="flex justify-between items-center mb-8 opacity-50">
                <h1 className="font-serif text-lg text-stone-500">InnerBloom</h1>
                <div className="text-xs bg-stone-200 px-2 py-1 rounded text-stone-500">Beta</div>
            </header>
        )}

        {session.step === 'intro' && (
          <Intro onStart={handleStart} />
        )}

        {(session.step === 'vibe-start' || session.step === 'vibe-middle' || session.step === 'vibe-end') && (
          <VibeCheck 
            stage={session.step === 'vibe-start' ? 'start' : session.step === 'vibe-middle' ? 'middle' : 'end'} 
            onSelect={handleVibeSelect} 
          />
        )}

        {(session.step === 'questions-1' || session.step === 'questions-2') && (
          <QuestionCard
            question={session.selectedQuestions[session.currentQuestionIndex]}
            current={session.currentQuestionIndex}
            total={12}
            onAnswer={handleAnswer}
          />
        )}

        {session.step === 'analyzing' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-fade-in">
            <div className="relative">
                <div className="absolute -inset-4 bg-rose-200/50 rounded-full blur-xl animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-rose-400 animate-spin relative z-10" />
            </div>
            <p className="text-stone-500 text-lg font-serif animate-pulse">Brewing your tea & thoughts... 🫖</p>
          </div>
        )}

        {session.step === 'results' && session.analysis && (
          <Results analysis={session.analysis} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
};

export default App;