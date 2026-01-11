
import React, { useState, useEffect } from 'react';
import { getSamjaeAdvice } from '../geminiService';
import { ZodiacSign, SamjaeType } from '../types';

interface SamjaeAdviceProps {
  zodiac: ZodiacSign;
  type: SamjaeType;
  birthYear: number;
}

export const SamjaeAdvice: React.FC<SamjaeAdviceProps> = ({ zodiac, type, birthYear }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      const msg = await getSamjaeAdvice(zodiac, type, birthYear);
      setAdvice(msg);
      setLoading(false);
    };

    fetchAdvice();
  }, [zodiac, type, birthYear]);

  return (
    <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>

      <h4 className="text-stone-800 font-bold mb-4 flex items-center space-x-2">
        <span className="text-xl">🌙</span>
        <span>당신을 위한 지혜로운 조언</span>
      </h4>

      {loading ? (
        <div className="space-y-3 py-4">
          <div className="h-4 bg-stone-100 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-stone-100 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-stone-100 rounded w-5/6 animate-pulse"></div>
        </div>
      ) : (
        <p className="text-stone-600 text-sm leading-loose font-traditional whitespace-pre-line italic">
          "{advice}"
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <span className="text-[10px] text-stone-300">Powered by Gemini AI</span>
      </div>
    </div>
  );
};
