import React from 'react';
import { X, Bookmark, Volume2, Trash2 } from 'lucide-react';
import { speechManager } from '../utils/speech';

interface VocabularyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedPhrases: string[];
  onRemovePhrase: (phrase: string) => void;
}

export const VocabularyDrawer: React.FC<VocabularyDrawerProps> = ({
  isOpen,
  onClose,
  savedPhrases,
  onRemovePhrase,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-left">
      <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 fill-current text-amber-300" />
          <h3 className="font-bold text-sm">나만의 저장 단어장</h3>
        </div>
        <button
          id="btn-close-vocab-drawer"
          onClick={onClose}
          className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {savedPhrases.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            <Bookmark className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p>저장된 핵심 표현이 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">
              대화 중 강조된 표현을 클릭하여 단어장에 추가해보세요.
            </p>
          </div>
        ) : (
          savedPhrases.map((phrase, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-slate-800">{phrase}</span>
              <div className="flex items-center gap-1">
                <button
                  id={`btn-play-saved-${idx}`}
                  onClick={() => speechManager.speak(phrase)}
                  className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  id={`btn-remove-saved-${idx}`}
                  onClick={() => onRemovePhrase(phrase)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
