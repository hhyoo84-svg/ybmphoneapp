import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { COURSE_INFO, COURSE_LESSONS } from '../data/lessonData';

interface BookCoverLessonListViewProps {
  currentLessonId: number;
  onSelectLesson: (lessonId: number) => void;
  onBackToLesson: () => void;
}

export const BookCoverLessonListView: React.FC<BookCoverLessonListViewProps> = ({
  currentLessonId,
  onSelectLesson,
  onBackToLesson,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] pb-16 font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 animate-fade-in">
      
      {/* ─────────────────────────────────────────────────────────────
          Top Hero / Textbook Cover Banner (교재 표지 영역)
      ─────────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#5240DB] via-[#5D4BE2] to-[#7B6DF0] rounded-b-[28px] sm:rounded-b-[36px] shadow-md text-white">
        
        {/* Soft Organic Background Curves (배경 은은한 곡선 웨이브 레이어) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <svg className="w-full h-full object-cover" viewBox="0 0 800 400" preserveAspectRatio="none" fill="none">
            <path
              d="M0 240C200 180 350 320 550 250C680 200 750 220 800 200V400H0V240Z"
              fill="white"
              fillOpacity="0.15"
            />
            <path
              d="M0 160C220 120 400 260 620 180C720 150 780 180 800 170V400H0V160Z"
              fill="white"
              fillOpacity="0.1"
            />
          </svg>
        </div>

        {/* Banner Inner Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12">
          
          {/* Top Bar: Back Button & Language Pill */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <button
              id="btn-cover-back"
              onClick={onBackToLesson}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs shadow-2xs"
              title="레슨 화면으로 돌아가기"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs sm:text-sm font-bold tracking-wide backdrop-blur-xs border border-white/10 select-none">
              EN
            </span>
          </div>

          {/* Textbook Metadata */}
          <div className="space-y-1.5 sm:space-y-2">
            <p className="text-white/85 text-xs sm:text-sm font-semibold tracking-tight">
              {COURSE_INFO.category}
            </p>

            <div className="pt-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-none">
                {COURSE_INFO.koreanTitle}
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mt-1">
                {COURSE_INFO.englishTitle}
              </h2>
            </div>

            <p className="text-white/90 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed pt-3 max-w-xl whitespace-pre-line">
              {COURSE_INFO.description}
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Lesson List Section (레슨 목록 영역)
      ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between px-2 mb-3 sm:mb-4">
          <h3 className="text-xs sm:text-[13px] font-bold tracking-widest text-stone-500 uppercase">
            LESSON LIST
          </h3>
          <span className="text-xs font-semibold text-stone-400">
            총 {COURSE_LESSONS.length}개 레슨
          </span>
        </div>

        {/* Lesson Items List */}
        <div className="space-y-2 sm:space-y-2.5">
          {COURSE_LESSONS.map((item) => {
            const isActive = item.id === currentLessonId;

            return (
              <button
                key={item.id}
                id={`lesson-list-item-${item.id}`}
                onClick={() => onSelectLesson(item.id)}
                className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#EEEDFC] border border-[#5D4BE2]/25 shadow-xs'
                    : 'bg-transparent hover:bg-white/80 border border-transparent hover:border-stone-200/70 hover:shadow-2xs'
                }`}
              >
                {/* Left: Number Badge + Titles */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Number Badge */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#5D4BE2] text-white shadow-2xs'
                        : 'text-stone-700 font-bold bg-transparent'
                    }`}
                  >
                    {item.lessonNumber}
                  </div>

                  {/* Title & Korean Title */}
                  <div className="min-w-0">
                    <h4
                      className={`text-[15px] sm:text-base font-bold tracking-tight truncate ${
                        isActive ? 'text-[#5D4BE2]' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-[13px] font-normal truncate mt-0.5 ${
                        isActive ? 'text-stone-600 font-medium' : 'text-stone-500'
                      }`}
                    >
                      {item.koreanTitle}
                    </p>
                  </div>
                </div>

                {/* Right: Dot Indicator */}
                <div className="flex items-center pl-3 flex-shrink-0">
                  <span
                    className={`rounded-full transition-all ${
                      isActive
                        ? 'w-2 h-2 bg-[#5D4BE2]'
                        : 'w-1.5 h-1.5 bg-stone-300 group-hover:bg-stone-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
