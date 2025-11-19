import React from 'react';
import { AnalysisResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Share2, RefreshCcw, Heart, ArrowRight } from 'lucide-react';

interface ResultsProps {
  analysis: AnalysisResult;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ analysis, onRestart }) => {
  const chartData = [
    { name: 'Sadness', value: analysis.chartData.sadness, color: '#94a3b8' }, // slate-400
    { name: 'Anxiety', value: analysis.chartData.anxiety, color: '#f87171' }, // red-400
    { name: 'Self-Love', value: analysis.chartData.selfLove, color: '#fb7185' }, // rose-400
    { name: 'Awareness', value: analysis.chartData.awareness, color: '#fcd34d' }, // amber-300
    { name: 'Healing', value: analysis.chartData.innerChildHealing, color: '#4ade80' }, // green-400
  ];

  return (
    <div className="max-w-2xl mx-auto pb-12 animate-fade-in space-y-8">
      {/* Summary Card */}
      <div className="glass-card rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-purple-300 to-blue-300" />
        <h2 className="text-2xl font-serif text-stone-800 mb-4">Your Vibe Report ✨</h2>
        <p className="text-stone-600 leading-relaxed italic">"{analysis.summary}"</p>
      </div>

      {/* 5-Bar Chart */}
      <div className="bg-white/60 rounded-3xl p-6 shadow-sm border border-white">
        <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-6 text-center">Emotional Landscape</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis domain={[0, 4]} tickCount={5} tick={{ fontSize: 10, fill: '#78716c' }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deep Insight */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-stone-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-100" /> Deep Dive
        </h3>
        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 text-stone-700 leading-relaxed text-sm md:text-base">
          {analysis.deepInsight}
        </div>
      </div>

      {/* Reality Check */}
      <div className="bg-sage-100/50 border border-sage-200 p-6 rounded-2xl relative">
        <span className="absolute -top-3 left-6 bg-sage-200 text-sage-700 text-xs font-bold px-3 py-1 rounded-full">
          Gentle Reality Check
        </span>
        <p className="text-stone-700 mt-2 text-sm">
          {analysis.realityCheck}
        </p>
      </div>

      {/* Life Path Flow */}
      <div className="glass-card p-6 rounded-3xl">
        <h3 className="text-lg font-serif text-center mb-6 text-stone-800">Interactive Life Path</h3>
        <div className="space-y-4 relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-stone-200" />
            
            <div className="relative pl-10">
                <div className="absolute left-[11px] top-2 w-3 h-3 rounded-full bg-blue-300 border-2 border-white" />
                <span className="text-xs text-stone-400 uppercase block">Current Feeling</span>
                <p className="text-stone-700 font-medium">{analysis.interactiveLifePath.feelings}</p>
            </div>
            <div className="relative pl-10">
                <div className="absolute left-[11px] top-2 w-3 h-3 rounded-full bg-red-300 border-2 border-white" />
                <span className="text-xs text-stone-400 uppercase block">Trigger</span>
                <p className="text-stone-700 font-medium">{analysis.interactiveLifePath.triggers}</p>
            </div>
            <div className="relative pl-10">
                <div className="absolute left-[11px] top-2 w-3 h-3 rounded-full bg-amber-300 border-2 border-white" />
                <span className="text-xs text-stone-400 uppercase block">Coping Mechanism</span>
                <p className="text-stone-700 font-medium">{analysis.interactiveLifePath.coping}</p>
            </div>
            <div className="relative pl-10">
                <div className="absolute left-[11px] top-2 w-3 h-3 rounded-full bg-green-300 border-2 border-white" />
                <span className="text-xs text-stone-400 uppercase block">Next Step</span>
                <p className="text-stone-700 font-medium">{analysis.interactiveLifePath.steps}</p>
            </div>
        </div>
      </div>

      {/* Healing Era Roadmap */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-stone-800">Healing Era Roadmap</h3>
        <ul className="space-y-3">
            {analysis.healingEraRoadmap.map((step, i) => (
                <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-stone-50">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                    </span>
                    <span className="text-stone-700 text-sm">{step}</span>
                </li>
            ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center pt-8">
        <button 
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 bg-stone-200 text-stone-700 rounded-full font-medium hover:bg-stone-300 transition-colors"
        >
            <RefreshCcw className="w-4 h-4" /> Restart
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-rose-300 text-white rounded-full font-medium hover:bg-rose-400 transition-colors shadow-md shadow-rose-200">
            <Share2 className="w-4 h-4" /> Share Vibe
        </button>
      </div>
    </div>
  );
};

export default Results;