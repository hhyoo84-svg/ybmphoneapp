import React from 'react';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { LessonData } from '../types';

interface HeaderProps {
  lesson: LessonData;
  activePartId: number;
  isTGActive: boolean;
  onToggleTG: () => void;
  onOpenBookCover: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lesson,
  activePartId,
  isTGActive,
  onToggleTG,
  onOpenBookCover,
}) => {
  const totalParts = lesson.parts.length;
  const progressPercent = Math.round((activePartId / totalParts) * 100);
  const activePart = lesson.parts.find(p => p.id === activePartId);

  return (
    <header className="w-full bg-[#FAF8F5] border-b border-stone-200/70 z-20 select-none">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Back button + Course Info & Lesson Info */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            id="btn-nav-back"
            onClick={onOpenBookCover}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-200/60 hover:text-[#5D4BE2] active:scale-95 transition-all cursor-pointer flex-shrink-0"
            title="교재 표지 및 레슨 리스트"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="min-w-0 flex flex-col justify-center">
            {/* Course Title (PC Only) */}
            <span className="hidden sm:block text-[11px] font-bold text-stone-500 truncate tracking-tight">
              {lesson.courseName || '일상회화 Daily Life 초급'}
            </span>
            
            {/* Lesson Title Row */}
            <div className="flex items-center gap-2 truncate">
              <span className="font-black text-sm sm:text-base text-[#5D4BE2] tracking-tight flex-shrink-0">
                {activePart ? (activePart.typeLabel || `타입 ${String(activePart.typeNumber).padStart(2, '0')}`) : lesson.lessonNumber}
              </span>
              <span className="hidden sm:inline font-extrabold text-sm sm:text-base text-slate-900 tracking-tight truncate">
                {activePart ? activePart.title : lesson.title}
              </span>
            </div>
          </div>
        </div>

        {/* Right: TG Button & 교재보기 */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Teacher Guide Toggle Button */}
          <button
            id="btn-toggle-tg"
            onClick={onToggleTG}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
              isTGActive
                ? 'bg-[#5D4BE2] text-white border-[#5D4BE2] shadow-xs'
                : 'bg-white border-stone-200/90 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
            }`}
            title="강사용 티칭 가이드(TG) 토글"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isTGActive ? 'bg-white' : 'bg-emerald-500'}`} />
            <span>TG</span>
          </button>

          {/* Textbook Cover / Lesson List View Button */}
          <button
            id="btn-book-cover"
            onClick={onOpenBookCover}
            className="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold border border-stone-200/90 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:text-[#5D4BE2] transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            title="교재 표지 및 레슨 리스트 보기"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>교재보기</span>
          </button>
        </div>
      </div>

      {/* Progress Bar with Right Progress Count (e.g. 8 / 14) matching Image 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 flex items-center gap-3">
        <div className="flex-1 bg-[#EBE7DF] h-1 rounded-full overflow-hidden relative">
          <div 
            className="bg-[#5D4BE2] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-xs font-bold flex items-center gap-1 flex-shrink-0">
          <span className="text-[#5D4BE2] font-black">{activePartId}</span>
          <span className="text-stone-400">/</span>
          <span className="text-stone-400">{totalParts}</span>
        </div>
      </div>
    </header>
  );
};

