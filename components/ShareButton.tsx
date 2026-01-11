
import React, { useState } from 'react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ 
  title = "운세똑똑 | 2026년 삼재 계산기", 
  text = "2026년 병오년 나의 삼재 여부를 확인해보세요!", 
  url = window.location.href 
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard error:", err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-all active:scale-95"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span className="text-xs font-medium">{copied ? '링크 복사됨!' : '공유하기'}</span>
    </button>
  );
};
