import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu
} from 'lucide-react';

interface BottomPlayerBarProps {
  activePartId: number;
  totalParts: number;
  onPrevPart: () => void;
  onNextPart: () => void;
  onTogglePartListModal: () => void;
}

export const BottomPlayerBar: React.FC<BottomPlayerBarProps> = ({
  activePartId,
  totalParts,
  onPrevPart,
  onNextPart,
  onTogglePartListModal,
}) => {
  const isFirst = activePartId <= 1;
  const isLast = activePartId >= totalParts;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center pointer-events-none">
      {/* Floating 3-Button Navigation Dock */}
      <div className="pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-xl border border-stone-200/80">
        {/* Prev Button */}
        <button
          id="btn-bottom-prev"
          onClick={onPrevPart}
          disabled={isFirst}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-xs ${
            isFirst
              ? 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300 active:scale-95'
          }`}
          title="이전 단계로 이동"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Center Menu / List Button */}
        <button
          id="btn-bottom-menu"
          onClick={onTogglePartListModal}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#5D4BE2] hover:bg-[#4C3BCE] text-white flex items-center justify-center shadow-md shadow-[#5D4BE2]/30 transition-all active:scale-95 cursor-pointer"
          title="파트 목록 (전체 단계)"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Next Button */}
        <button
          id="btn-bottom-next"
          onClick={onNextPart}
          disabled={isLast}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-xs ${
            isLast
              ? 'bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300 active:scale-95'
          }`}
          title="다음 단계로 이동"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
