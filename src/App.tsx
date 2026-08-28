import React, { useState, useEffect } from 'react';
import { LESSON_01, COURSE_LESSONS } from './data/lessonData';
import { DialogueSentence } from './types';
import { Header } from './components/Header';
import { SidebarPartList } from './components/SidebarPartList';
import { DialogueBubble } from './components/DialogueBubble';
import { TeacherGuidePanel } from './components/TeacherGuidePanel';
import { BottomPlayerBar } from './components/BottomPlayerBar';
import { OtherPartView } from './components/OtherPartView';
import { QuickJumpModal } from './components/QuickJumpModal';
import { BookCoverLessonListView } from './components/BookCoverLessonListView';
import { speechManager } from './utils/speech';
import { Smartphone, Tablet, Laptop, ArrowLeftRight, BookOpen, Layers, Globe } from 'lucide-react';


export default function App() {
  // Navigation View Mode: 'lesson' (Part 1~13 Viewer) or 'course_cover' (Textbook Cover & Lesson List)
  const [currentView, setCurrentView] = useState<'lesson' | 'course_cover'>('lesson');
  const [currentLessonId, setCurrentLessonId] = useState(1);

  // Lesson state
  const [lesson] = useState(LESSON_01);
  const [activePartId, setActivePartId] = useState(1); // Default to Part 1 (Vocabulary) as requested!
  const [completedPartIds, setCompletedPartIds] = useState<number[]>([]);

  // Responsive device view mode for PC preview
  const [pcDeviceMode, setPcDeviceMode] = useState<'tablet' | 'mobile' | 'fluid'>('tablet');

  // Audio Playback state for individual sentences
  const [activePlayingSentenceId, setActivePlayingSentenceId] = useState<string | null>(null);

  // Modals & Part-level Action states
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [isPartTranslationOpen, setIsPartTranslationOpen] = useState(false);
  const [isPartGuideOpen, setIsPartGuideOpen] = useState(false);

  // Reset part-level action states on part navigation
  useEffect(() => {
    setIsPartTranslationOpen(false);
    setIsPartGuideOpen(false);
  }, [activePartId]);

  // Handle single sentence audio playback
  const handlePlaySentenceAudio = (sentence: DialogueSentence) => {
    setActivePlayingSentenceId(sentence.id);
    speechManager.speak(sentence.en, {
      rate: 1.0,
      onEnd: () => setActivePlayingSentenceId(null),
      onError: () => setActivePlayingSentenceId(null),
    });
  };

  // Part navigation
  const handlePrevPart = () => {
    if (activePartId > 1) {
      setActivePartId(activePartId - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPart = () => {
    if (activePartId < lesson.parts.length) {
      if (!completedPartIds.includes(activePartId)) {
        setCompletedPartIds([...completedPartIds, activePartId]);
      }
      setActivePartId(activePartId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPart = lesson.parts.find(p => p.id === activePartId) || lesson.parts[0];
  const activeLessonInfo = COURSE_LESSONS.find(l => l.id === currentLessonId) || COURSE_LESSONS[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
      

      {/* ─────────────────────────────────────────────────────────────
          VIEW 1: 교재표지 & 레슨 리스트 (Course Cover & Lesson List)
      ─────────────────────────────────────────────────────────────── */}
      {currentView === 'course_cover' ? (
        <div className={`w-full flex-1 mx-auto ${
          pcDeviceMode === 'mobile' ? 'max-w-[460px] px-2' : pcDeviceMode === 'tablet' ? 'max-w-2xl px-4' : 'max-w-4xl px-4 sm:px-6'
        }`}>
          <BookCoverLessonListView
            currentLessonId={currentLessonId}
            onSelectLesson={(lessonId) => {
              setCurrentLessonId(lessonId);
              setCurrentView('lesson');
              setActivePartId(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToLesson={() => {
              setCurrentView('lesson');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            VIEW 2: 레슨 학습 화면 (13 Lesson Types Interactive Viewer)
        ─────────────────────────────────────────────────────────────── */
        <>
          {/* Header Component (Matching User Image: < back cursor & 교재보기 button both open 교재표지/목차) */}
          <Header
            lesson={{
              ...lesson,
              lessonNumber: `Lesson ${activeLessonInfo.lessonNumber}`,
              title: activeLessonInfo.title,
              koreanTitle: activeLessonInfo.koreanTitle
            }}
            activePartId={activePartId}
            isTGActive={isTeacherGuideOpen}
            onToggleTG={() => setIsTeacherGuideOpen(!isTeacherGuideOpen)}
            onOpenBookCover={() => {
              setCurrentView('course_cover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main Workspace Layout (Sidebar Navigation + Main Content Area) */}
          <div className={`flex-1 w-full max-w-7xl mx-auto ${
            pcDeviceMode === 'mobile' ? 'px-3 py-3' : 'px-4 sm:px-6 lg:px-8 py-4 sm:py-6'
          }`}>
            <div className={`flex gap-6 lg:gap-8 items-start justify-center ${
              pcDeviceMode === 'mobile' ? 'max-w-[460px] mx-auto w-full' : 'w-full'
            }`}>
              
              {/* Left Sidebar Navigation (Visible on Tablet and PC - Hidden on Mobile 1-depth) */}
              {pcDeviceMode !== 'mobile' && (
                <div className="hidden md:block">
                  <SidebarPartList
                    parts={lesson.parts}
                    activePartId={activePartId}
                    completedPartIds={completedPartIds}
                    onSelectPart={(id) => {
                      setActivePartId(id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}

              {/* Right Main Content Canvas */}
              <main className="flex-1 min-w-0 max-w-3xl w-full flex flex-col pb-24">
                
                {/* Top Purple Hero Card (Background Layer) */}
                <div className={`relative z-0 bg-[#5D4BE2] text-white ${
                  pcDeviceMode === 'mobile'
                    ? 'pt-5 pb-10 px-5 rounded-t-[28px] rounded-b-xl shadow-xs'
                    : 'pt-6 pb-12 px-6 sm:px-8 rounded-t-[32px] sm:rounded-t-[36px] rounded-b-2xl shadow-xs'
                }`}>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 bg-white/20 backdrop-blur-xs rounded-md text-[11px] font-bold uppercase tracking-wider">
                        {currentPart.partNumber}
                      </span>
                    </div>
                    <span className="text-xs text-indigo-200 font-medium md:hidden">
                      {activePartId} / {lesson.parts.length}
                    </span>
                  </div>

                  <h2 className={`font-bold tracking-tight text-white mb-1.5 ${
                    pcDeviceMode === 'mobile' ? 'text-2xl' : 'text-2xl sm:text-3xl'
                  }`}>
                    {currentPart.title}
                  </h2>

                  <p className="text-white/90 text-xs sm:text-sm font-normal leading-relaxed">
                    {currentPart.description}
                  </p>

                  {/* Part Hero Action Toggle Button (Globe Icon) */}
                  {currentPart.headerActionType === 'translation' && (
                    <div className="mt-3.5 flex items-center">
                      <button
                        id="btn-hero-toggle-trans"
                        type="button"
                        onClick={() => setIsPartTranslationOpen(!isPartTranslationOpen)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                          isPartTranslationOpen
                            ? 'bg-white text-[#5D4BE2] shadow-md ring-2 ring-white/60'
                            : 'bg-white/90 hover:bg-white text-[#5D4BE2] hover:shadow-md'
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>{isPartTranslationOpen ? '영문' : '해석'}</span>
                      </button>
                    </div>
                  )}

                  {currentPart.headerActionType === 'guide' && (
                    <div className="mt-3.5 flex items-center">
                      <button
                        id="btn-hero-toggle-guide"
                        type="button"
                        onClick={() => setIsPartGuideOpen(!isPartGuideOpen)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                          isPartGuideOpen
                            ? 'bg-white text-[#5D4BE2] shadow-md ring-2 ring-white/60'
                            : 'bg-white/90 hover:bg-white text-[#5D4BE2] hover:shadow-md'
                        }`}
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{isPartGuideOpen ? 'Hide' : 'Guide'}</span>
                      </button>
                    </div>
                  )}

                  {/* Teacher Guide (TG) Top Notice Banner */}
                  {isTeacherGuideOpen && currentPart.tgGuide && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/20 border border-amber-300/40 text-amber-100 text-xs font-medium backdrop-blur-xs animate-fade-in space-y-1">
                      <span className="font-extrabold text-amber-300 block tracking-tight">
                        *[TG] 수업 진행 가이드
                      </span>
                      <p className="leading-relaxed">{currentPart.tgGuide}</p>
                    </div>
                  )}
                </div>

                {/* White Content Sheet in Foreground Layer Overlapping the Background Hero */}
                <div 
                  id="main-content-area" 
                  className="relative z-10 bg-white rounded-[28px] sm:rounded-[32px] -mt-6 sm:-mt-7 p-5 sm:p-7 flex-1 border border-stone-200/80 shadow-md"
                >
                  {/* 13 Lesson Part Types View */}
                  <OtherPartView
                    part={currentPart}
                    lesson={lesson}
                    isTGActive={isTeacherGuideOpen}
                    isGlobalTranslationOpen={isPartTranslationOpen}
                    isGuideOpen={isPartGuideOpen}
                    isMobileMode={pcDeviceMode === 'mobile'}
                    onToggleGuide={() => setIsPartGuideOpen(!isPartGuideOpen)}
                    onGoToMainDialogue={() => setActivePartId(7)}
                  />
                </div>
              </main>
            </div>
          </div>

          {/* Floating Bottom Navigation Dock (Visible only in Mobile mode or on small mobile screens) */}
          {(pcDeviceMode === 'mobile' || pcDeviceMode === 'tablet') ? (
            <BottomPlayerBar
              activePartId={activePartId}
              totalParts={lesson.parts.length}
              onPrevPart={handlePrevPart}
              onNextPart={handleNextPart}
              onTogglePartListModal={() => setIsQuickJumpOpen(true)}
            />
          ) : (
            <div className="md:hidden">
              <BottomPlayerBar
                activePartId={activePartId}
                totalParts={lesson.parts.length}
                onPrevPart={handlePrevPart}
                onNextPart={handleNextPart}
                onTogglePartListModal={() => setIsQuickJumpOpen(true)}
              />
            </div>
          )}

          {/* Quick Jump / Part Curriculum Drawer Modal */}
          <QuickJumpModal
            isOpen={isQuickJumpOpen}
            onClose={() => setIsQuickJumpOpen(false)}
            parts={lesson.parts}
            activePartId={activePartId}
            onSelectPart={(id) => {
              setActivePartId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Teacher Guide Panel (Drawer) */}
          <TeacherGuidePanel
            isOpen={isTeacherGuideOpen}
            onClose={() => setIsTeacherGuideOpen(false)}
            lesson={lesson}
            activePart={currentPart}
          />
        </>
      )}
    </div>
  );
}


