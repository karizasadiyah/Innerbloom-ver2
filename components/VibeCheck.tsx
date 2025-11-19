import React from 'react';
import { VibeType } from '../types';

interface VibeCheckProps {
  stage: 'start' | 'middle' | 'end';
  onSelect: (vibe: VibeType) => void;
}

const VibeCheck: React.FC<VibeCheckProps> = ({ stage, onSelect }) => {
  const options: { vibe: VibeType; emoji: string; label: string }[] = [
    { vibe: 'happy', emoji: '😄', label: 'Radiant' },
    { vibe: 'content', emoji: '🙂', label: 'Okay' },
    { vibe: 'neutral', emoji: '😐', label: 'Meh' },
    { vibe: 'anxious', emoji: '😟', label: 'Anxious' },
    { vibe: 'sad', emoji: '😢', label: 'Heavy' },
  ];

  const titles = {
    start: "How are we feeling right now?",
    middle: "Checking in... how's the heart?",
    end: "Last one! How do you feel after reflecting?",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-slide-up space-y-12">
      <h2 className="text-2xl font-serif text-stone-700 text-center max-w-xs">
        {titles[stage]} ✨
      </h2>

      <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full max-w-md">
        {options.map((opt) => (
          <button
            key={opt.vibe}
            onClick={() => onSelect(opt.vibe)}
            className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-2 focus:outline-none"
          >
            <span className="text-4xl sm:text-5xl filter grayscale transition-all group-hover:grayscale-0 group-active:scale-90 cursor-pointer">
              {opt.emoji}
            </span>
            <span className="text-xs text-stone-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VibeCheck;