import React from 'react';
import { Sparkles, Volume2, Bookmark, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { speechManager } from '../utils/speech';

interface PhraseTooltipProps {
  phrase: {
    phrase: string;
    meaning: string;
    tip: string;
  } | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onSaveBookmark?: (phrase: string) => void;
  isBookmarked?: boolean;
}

export const PhraseTooltip: React.FC<PhraseTooltipProps> = ({
  phrase,
  position,
  onClose,
  onSaveBookmark,
  isBookmarked = false,
}) => {
  if (!phrase || !position) return null;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speechManager.speak(phrase.phrase, { rate: 0.9 });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 4 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          top: Math.min(position.y + 12, window.innerHeight - 200),
          left: Math.max(16, Math.min(position.x - 120, window.innerWidth - 320)),
        }}
        className="fixed z-50 w-72 md:w-80 rounded-2xl bg-white shadow-2xl border border-indigo-100 p-4 text-slate-800 backdrop-blur-lg"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>핵심 표현 팁</span>
          </div>
          <div className="flex items-center gap-1">
            {onSaveBookmark && (
              <button
                id="btn-save-phrase-bookmark"
                onClick={() => onSaveBookmark(phrase.phrase)}
                title="단어장에 저장"
                className={`p-1 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-amber-500 bg-amber-50'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            )}
            <button
              id="btn-close-phrase-tooltip"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-slate-900">{phrase.phrase}</h4>
            <button
              id="btn-phrase-speak"
              onClick={handleSpeak}
              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              title="발음 듣기"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm font-medium text-indigo-950 mt-0.5">{phrase.meaning}</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-indigo-700 block mb-0.5">💡 학습 팁</span>
          {phrase.tip}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
