
import React from 'react';
import { ZODIAC_EMOJIS, KOREAN_YEAR_NAMES, ZODIAC_ORDER } from '../constants';
import { ZodiacSign } from '../types';

interface SamjaeSummaryProps {
  currentYear: number;
}

export const SamjaeSummary: React.FC<SamjaeSummaryProps> = ({ currentYear }) => {
  // Logic for 2025 (Eul-sa): Pig, Rabbit, Sheep enter Sam-jae
  const samjaeSigns: ZodiacSign[] = [ZodiacSign.Pig, ZodiacSign.Rabbit, ZodiacSign.Sheep];
  const yearName = KOREAN_YEAR_NAMES[currentYear] || `${currentYear}년`;

  return (
    <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
      <h4 className="text-amber-900 font-bold mb-3 flex items-center space-x-2">
        <span className="text-lg">✨</span>
        <span>{yearName}의 삼재띠</span>
      </h4>
      <p className="text-amber-800 text-sm mb-4 leading-relaxed font-light">
        올해는 <span className="font-bold">돼지, 토끼, 양띠</span>가 <b>들삼재(시작)</b>에 해당합니다. 
        변화의 시기이니 차분하게 한 해를 계획해보세요.
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        {samjaeSigns.map(sign => (
          <div key={sign} className="bg-white/60 rounded-2xl p-4 text-center border border-amber-200/50">
            <div className="text-3xl mb-1">{ZODIAC_EMOJIS[sign]}</div>
            <div className="text-xs font-bold text-amber-900">{sign}띠</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-amber-200/50">
        <p className="text-[11px] text-amber-700/70 leading-relaxed">
          <b>삼재(三災)란?</b><br/>
          9년 주기로 돌아오는 3년간의 조심스러운 시기입니다.<br/>
          들삼재(1년차), 눌삼재(2년차), 날삼재(3년차)로 나뉩니다.
        </p>
      </div>
    </div>
  );
};
