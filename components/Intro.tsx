import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-fade-in p-6">
      <div className="relative">
        <div className="absolute -inset-4 bg-rose-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="bg-white p-6 rounded-full shadow-lg relative z-10">
          <Heart className="w-12 h-12 text-rose-400 fill-rose-100" />
        </div>
      </div>
      
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-serif text-stone-800">InnerBloom</h1>
        <p className="text-stone-600 text-lg leading-relaxed">
          Little questions about yourself for understanding your hidden feelings.
        </p>
        <p className="text-stone-500 text-sm italic">
          A safe space to reconnect with your inner child ✨🧸
        </p>
      </div>

      <button
        onClick={onStart}
        className="group relative overflow-hidden bg-stone-800 text-stone-50 px-8 py-4 rounded-full font-medium tracking-wide transition-all hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          Start Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-orange-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default Intro;