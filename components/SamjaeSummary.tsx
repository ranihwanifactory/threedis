
import React from 'react';
import { ZODIAC_EMOJIS, KOREAN_YEAR_NAMES } from '../constants';
import { ZodiacSign } from '../types';

interface SamjaeSummaryProps {
  currentYear: number;
}

export const SamjaeSummary: React.FC<SamjaeSummaryProps> = ({ currentYear }) => {
  // Logic for 2026 (Byeong-oh): Pig, Rabbit, Sheep are in their 2nd year (Nul-samjae)
  const samjaeSigns: ZodiacSign[] = [ZodiacSign.Pig, ZodiacSign.Rabbit, ZodiacSign.Sheep];
  const yearName = KOREAN_YEAR_NAMES[currentYear] || `${currentYear}년`;

  return (
    <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200">
      <h4 className="text-stone-800 font-bold mb-3 flex items-center space-x-2">
        <span className="text-lg">✨</span>
        <span>{yearName}의 삼재띠</span>
      </h4>
      <p className="text-stone-600 text-sm mb-4 leading-relaxed font-light">
        올해는 <span className="font-bold">돼지, 토끼, 양띠</span>가 <b>눌삼재(머무름)</b>에 해당합니다. 
        삼재의 기운이 머무는 시기이니 급격한 변화보다는 내실을 다지는 것이 좋습니다.
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        {samjaeSigns.map(sign => (
          <div key={sign} className="bg-white rounded-2xl p-4 text-center border border-stone-100 shadow-sm">
            <div className="text-3xl mb-1">{ZODIAC_EMOJIS[sign]}</div>
            <div className="text-xs font-bold text-stone-700">{sign}띠</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-stone-200">
        <div className="flex items-start space-x-2">
          <span className="text-xs">💡</span>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            <b>2026년 눌삼재 가이드</b><br/>
            눌삼재는 삼재의 둘째 해로, 운이 정체될 수 있습니다. 인내심을 갖고 주변 사람들과의 관계를 돈독히 하며 차분하게 보내시길 추천합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
