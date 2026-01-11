
import React from 'react';

export const SamjaeHero: React.FC = () => {
  return (
    <div className="relative h-64 bg-[#fdfcf9] flex flex-col items-center justify-center overflow-hidden border-b border-stone-100">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#8b4513" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="z-10 text-center">
        <div className="mb-2 inline-block px-3 py-1 rounded-full bg-red-700 text-white text-[10px] tracking-widest font-bold">
          2026 BYEONG-OH YEAR
        </div>
        <h1 className="text-4xl font-traditional font-bold text-stone-800 tracking-tight mb-2">
          운세똑똑
        </h1>
        <p className="text-stone-500 text-sm font-light">병오년 삼재 확인과 따뜻한 위로</p>
      </div>

      <div className="absolute -bottom-4 float-animation">
         <span className="text-6xl">🐴</span>
      </div>
    </div>
  );
};
