import React from 'react';
import { BookOpen, AlertCircle, HelpCircle, CheckCircle2, X, Sparkles } from 'lucide-react';
import { LessonData, LessonPart } from '../types';

interface TeacherGuidePanelProps {
  lesson: LessonData;
  isOpen: boolean;
  onClose: () => void;
  activePart?: LessonPart;
}

export const TeacherGuidePanel: React.FC<TeacherGuidePanelProps> = ({ 
  lesson, 
  isOpen, 
  onClose,
  activePart
}) => {
  if (!isOpen || !lesson) return null;

  const teacherGuide = lesson.teacherGuide || {
    lessonGoals: [],
    warmupQuestions: [],
    pronunciationAlerts: [],
    expansionActivities: []
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-slide-left">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm">TG · Teacher's Guide</span>
              <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-bold">강사용 지도서</span>
            </div>
            <p className="text-xs text-amber-100">{lesson.lessonNumber}: {lesson.title}</p>
          </div>
        </div>
        <button
          id="btn-close-tg-panel"
          onClick={onClose}
          className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-slate-800 text-sm">
        {/* Active Part Context Banner */}
        {activePart && (
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl">
            <span className="text-[11px] font-bold text-amber-800 block">현재 학습 파트</span>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              {activePart.partNumber}. {activePart.title}
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">{activePart.description}</p>
          </div>
        )}

        {/* Lesson Goals */}
        {teacherGuide.lessonGoals && teacherGuide.lessonGoals.length > 0 && (
          <div>
            <h4 className="flex items-center gap-1.5 font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider text-amber-800">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>수업 목표 (Lesson Objectives)</span>
            </h4>
            <ul className="space-y-1.5 bg-amber-50/60 border border-amber-200/70 p-3 rounded-xl text-xs text-slate-700">
              {teacherGuide.lessonGoals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pronunciation & Phonetics Alerts */}
        {teacherGuide.pronunciationAlerts && teacherGuide.pronunciationAlerts.length > 0 && (
          <div>
            <h4 className="flex items-center gap-1.5 font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>발음 & 연음 주의 포인트</span>
            </h4>
            <div className="space-y-2">
              {teacherGuide.pronunciationAlerts.map((item, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <span className="font-bold text-indigo-700 block mb-0.5">{item.word}</span>
                  <p className="text-slate-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warm-up & Follow-up Questions */}
        {teacherGuide.warmupQuestions && teacherGuide.warmupQuestions.length > 0 && (
          <div>
            <h4 className="flex items-center gap-1.5 font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider text-amber-800">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>추천 유도 질문 (Prompt Questions)</span>
            </h4>
            <div className="space-y-2">
              {teacherGuide.warmupQuestions.map((q, idx) => (
                <div key={idx} className="p-2.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-slate-700">
                  <span className="font-semibold text-indigo-900 block mb-0.5">Q{idx + 1}. {q}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expansion Activities */}
        {teacherGuide.expansionActivities && teacherGuide.expansionActivities.length > 0 && (
          <div>
            <h4 className="flex items-center gap-1.5 font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>확장 롤플레잉 및 팁</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {teacherGuide.expansionActivities.map((act, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
