import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Send, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  current: number;
  total: number;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, current, total, onAnswer }) => {
  const [text, setText] = useState('');
  
  // Reset text when question changes
  useEffect(() => {
    setText('');
  }, [question.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAnswer(text);
  };

  const handleOptionClick = (opt: string) => {
    if (opt === 'Other') {
      setText('');
    } else {
      setText(opt);
    }
  };

  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto animate-slide-up pb-24">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-stone-100 z-50">
        <div 
          className="h-full bg-rose-300 transition-all duration-500 ease-out rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Sparkles className="w-24 h-24 text-rose-400" />
        </div>

        <span className="text-xs font-bold tracking-widest text-rose-400 uppercase mb-4 block">
          Question {current + 1} of {total}
        </span>

        {question.scenario && (
          <div className="bg-sage-100/50 p-4 rounded-2xl mb-6 text-stone-600 text-sm leading-relaxed border border-sage-200/50">
            <span className="font-bold block mb-1 text-sage-500">Imagine this...</span>
            {question.scenario}
          </div>
        )}

        <h3 className="text-xl sm:text-2xl font-serif text-stone-800 leading-relaxed mb-8">
          {question.text}
        </h3>

        {question.options && (
          <div className="flex flex-wrap gap-2 mb-6">
            {question.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleOptionClick(opt)}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  text === opt 
                    ? 'bg-stone-800 text-white border-stone-800' 
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your thoughts here... safe space 🌱"
            className="w-full min-h-[120px] bg-white/50 border border-stone-200 rounded-2xl p-4 text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-200 resize-none transition-shadow"
            autoFocus
          />
          
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex items-center gap-2 bg-stone-800 text-stone-50 px-6 py-3 rounded-full font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-stone-700 hover:shadow-md active:scale-95"
            >
              Next <Send className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionCard;