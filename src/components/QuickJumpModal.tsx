import React from 'react';
import { X, BookOpen, ChevronRight, Check } from 'lucide-react';
import { LessonPart } from '../types';

interface QuickJumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: LessonPart[];
  activePartId: number;
  onSelectPart: (id: number) => void;
}

export const QuickJumpModal: React.FC<QuickJumpModalProps> = ({
  isOpen,
  onClose,
  parts,
  activePartId,
  onSelectPart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 bg-[#5D4BE2] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold text-base tracking-tight">교재 파트 바로가기 ({parts.length} Parts)</h3>
          </div>
          <button
            id="btn-close-quick-jump"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-xl cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[65vh] overflow-y-auto space-y-1.5 custom-scrollbar">
          {parts.map((part) => {
            const isActive = part.id === activePartId;
            return (
              <button
                key={part.id}
                id={`modal-part-btn-${part.id}`}
                onClick={() => {
                  onSelectPart(part.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#EEEDFC] border border-[#5D4BE2]/30 text-[#5D4BE2] font-bold shadow-2xs'
                    : 'hover:bg-stone-50 text-stone-700 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-start gap-1">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                      isActive ? 'bg-[#5D4BE2] text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {part.partNumber}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-sm block">{part.title}</span>
                    <span className="text-xs text-stone-500 font-normal">{part.koreanTitle}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#5D4BE2]' : 'text-stone-400'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
