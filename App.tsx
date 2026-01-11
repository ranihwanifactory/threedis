
import React, { useState, useEffect } from 'react';
import { SamjaeHero } from './components/SamjaeHero';
import { SamjaeCheck } from './components/SamjaeCheck';
import { SamjaeAdvice } from './components/SamjaeAdvice';
import { SamjaeSummary } from './components/SamjaeSummary';
import { ShareButton } from './components/ShareButton';
import { SamjaeResult, SamjaeType } from './types';
import { getSamjaeStatus, getZodiacFromYear, KOREAN_YEAR_NAMES } from './constants';

const CURRENT_YEAR = 2026;

const App: React.FC = () => {
  const [result, setResult] = useState<SamjaeResult | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });
    
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleCheck = (year: number) => {
    const status = getSamjaeStatus(year, CURRENT_YEAR);
    setResult({
      isSamjae: status.isSamjae,
      type: status.type,
      zodiac: getZodiacFromYear(year),
      birthYear: year,
      yearName: KOREAN_YEAR_NAMES[CURRENT_YEAR] || `${CURRENT_YEAR}년`
    });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-12 bg-stone-50">
      <div className="w-full max-w-md bg-white min-h-screen shadow-lg flex flex-col">
        {/* Header/Hero Section */}
        <SamjaeHero />

        <main className="flex-grow px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <ShareButton 
              text={result ? `${result.birthYear}년생 ${result.zodiac}띠, 2026년 운세똑똑 결과 확인!` : undefined}
            />
            {deferredPrompt && !isInstalled && (
              <button 
                onClick={handleInstall}
                className="text-xs font-bold text-red-700 underline underline-offset-4"
              >
                앱 설치하기
              </button>
            )}
          </div>

          {!result ? (
            <>
              <SamjaeCheck onCheck={handleCheck} />
              <div className="mt-12">
                <SamjaeSummary currentYear={CURRENT_YEAR} />
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-stone-100 rounded-3xl p-8 text-center shadow-sm">
                <p className="text-stone-500 text-sm mb-2">{result.birthYear}년생 {result.zodiac}띠</p>
                <h3 className="text-2xl font-bold mb-4">
                  {result.isSamjae ? (
                    <span className="text-red-500">
                      올해 <span className="underline underline-offset-4 decoration-red-200">{result.type}</span> 기간이에요
                    </span>
                  ) : (
                    <span className="text-green-600">올해 삼재에 해당하지 않아요!</span>
                  )}
                </h3>
                
                {result.isSamjae ? (
                   <p className="text-stone-600 leading-relaxed mb-6">
                    {result.type}는 삼재의 {result.type === SamjaeType.Deul ? '시작' : result.type === SamjaeType.Nul ? '중간' : '마지막'} 단계입니다.
                    차분하게 자신을 돌아보며 지내기 좋은 시기예요.
                  </p>
                ) : (
                  <p className="text-stone-600 leading-relaxed mb-6">
                    마음 편안히 계획하신 일들을 차근차근 이뤄가시길 응원합니다.
                  </p>
                )}

                <button 
                  onClick={handleReset}
                  className="px-6 py-2 rounded-full border border-stone-200 text-stone-500 text-sm hover:bg-stone-100 transition-colors"
                >
                  다른 연생 확인하기
                </button>
              </div>

              {result.isSamjae && (
                <SamjaeAdvice 
                  zodiac={result.zodiac} 
                  type={result.type} 
                  birthYear={result.birthYear} 
                />
              )}
            </div>
          )}
        </main>

        <footer className="py-6 px-6 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-400 font-light">
            삼재는 전통적인 풍습일 뿐, 당신의 운명은 스스로의 노력으로 만들어가는 것입니다. <br/>
            언제나 당신의 하루를 응원합니다.
          </p>
          {!isInstalled && (
            <p className="mt-4 text-[10px] text-stone-300">
              * 홈 화면에 추가하면 앱처럼 사용할 수 있어요!
            </p>
          )}
        </footer>
      </div>
    </div>
  );
};

export default App;
