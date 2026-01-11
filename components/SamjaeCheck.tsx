
import React, { useState } from 'react';

interface SamjaeCheckProps {
  onCheck: (year: number) => void;
}

export const SamjaeCheck: React.FC<SamjaeCheckProps> = ({ onCheck }) => {
  const [year, setYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numYear = parseInt(year);
    if (!isNaN(numYear) && numYear > 1900 && numYear <= new Date().getFullYear()) {
      onCheck(numYear);
    } else {
      alert('올바른 출생 연도를 입력해 주세요 (1900년 이후)');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="birthYear" className="block text-xs font-medium text-stone-400 mb-1 ml-1 uppercase tracking-wider">
            Birth Year
          </label>
          <input
            type="number"
            id="birthYear"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="예: 1990"
            className="w-full px-6 py-4 bg-stone-50 border-0 border-b-2 border-stone-200 text-xl font-bold text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-800 transition-all rounded-t-xl"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-stone-900 text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-stone-800 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
        >
          <span>나의 삼재 확인하기</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  );
};
