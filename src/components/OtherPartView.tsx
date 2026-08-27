import React, { useState } from 'react';
import { LessonPart, LessonData } from '../types';
import { ALL_13_TYPES_DATA } from '../data/lessonData';
import workshopScheduleImg from '../assets/images/workshop_schedule_doc_1787807320823.jpg';
import { 
  Eye,
  EyeOff,
  User,
  Sparkles,
  BookOpen,
  FileText,
  ZoomIn,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { speechManager } from '../utils/speech';
import { InlineActionButtons } from './InlineActionButtons';

interface OtherPartViewProps {
  part: LessonPart;
  lesson: LessonData;
  isTGActive: boolean;
  isGlobalTranslationOpen?: boolean;
  isGuideOpen?: boolean;
  isMobileMode?: boolean;
  onToggleGuide?: () => void;
  onGoToMainDialogue?: () => void;
}

// Unified Tip Badge Component
export const TipBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md flex-shrink-0 tracking-tight">
    <Sparkles className="w-3 h-3 text-amber-600" />
    TIP
  </span>
);

export const OtherPartView: React.FC<OtherPartViewProps> = ({
  part,
  isTGActive,
  isGlobalTranslationOpen = false,
  isGuideOpen = false,
}) => {
  // Local item translation toggle state
  const [translations, setTranslations] = useState<Record<string, boolean>>({});
  
  // Audio playing state
  const [activePlayingKey, setActivePlayingKey] = useState<string | null>(null);

  // Hidden scripts reveal state for Type 13
  const [revealedScripts, setRevealedScripts] = useState<Record<string, boolean>>({});

  // Image modal state for Type 13 reference schedule
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleTrans = (key: string) => {
    setTranslations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleRevealScript = (key: string) => {
    setRevealedScripts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSpeak = (text: string, key?: string) => {
    if (key) setActivePlayingKey(key);
    speechManager.speak(text, {
      onEnd: () => {
        if (key) setActivePlayingKey(null);
      },
      onError: () => {
        if (key) setActivePlayingKey(null);
      }
    });
  };

  // Reusable bottom-right action buttons
  const renderActionButtons = (
    itemKey: string,
    speakText: string,
    hasTranslation: boolean = true,
    extraButton?: React.ReactNode
  ) => {
    const isTransOpen = isGlobalTranslationOpen || !!translations[itemKey];
    const isPlaying = activePlayingKey === itemKey;

    return (
      <InlineActionButtons
        idPrefix={itemKey}
        onSpeak={() => handleSpeak(speakText, itemKey)}
        isPlaying={isPlaying}
        onToggleTrans={hasTranslation ? () => toggleTrans(itemKey) : undefined}
        isTransOpen={isTransOpen}
        hasTranslation={hasTranslation}
        extraButton={extraButton}
      />
    );
  };

  return (
    <div className="space-y-3.5 pt-1">
      {/* ─────────────────────────────────────────────────────────────
          타입 01: 내용 소제목 / 번호 / 영문 / 한글해석 + TTS
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 1 && (
        <div>
          {ALL_13_TYPES_DATA.type01.sections.map((sec, secIdx) => (
            <div
              key={secIdx}
              className={secIdx > 0 ? 'mt-8 sm:mt-10' : ''}
            >
              {/* Section Subtitle - distinct header for the group */}
              <div className="flex items-center gap-2.5 px-1 mb-3">
                <span className="w-1.5 h-4 bg-[#5D4BE2] rounded-full flex-shrink-0" />
                <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight">
                  {sec.sectionTitle}
                </h4>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 gap-2.5">
                {sec.items.map((item) => {
                  const isTransOpen = isGlobalTranslationOpen || !!translations[`t1-${item.id}`];

                  return (
                    <div
                      key={item.id}
                      id={`type01-card-${item.id}`}
                      className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:border-[#5D4BE2]/30 transition-all flex flex-col justify-between gap-2.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EEEDFC] text-[#5D4BE2] font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                          {item.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <p className="text-[15px] sm:text-base font-semibold text-slate-800 leading-relaxed">
                              {item.en}
                            </p>
                            {item.ipa && (
                              <span className="text-xs font-mono font-normal text-stone-400">
                                {item.ipa}
                              </span>
                            )}
                          </div>

                          {isTransOpen && (
                            <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in">
                              {item.ko}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="flex justify-end pt-1 border-t border-stone-100/70">
                        {renderActionButtons(`t1-${item.id}`, item.en)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 02: 번호 / 영문 / 한글해석 + TTS
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 2 && (
        <div className="grid grid-cols-1 gap-2.5">
          {ALL_13_TYPES_DATA.type02.items.map((item, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t2-${item.id}`];

            return (
              <div
                key={item.id}
                id={`type02-card-${item.id}`}
                className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:border-[#5D4BE2]/30 transition-all flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EEEDFC] text-[#5D4BE2] font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] sm:text-base font-semibold text-slate-800 leading-relaxed whitespace-pre-line">
                      {item.en}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in whitespace-pre-line">
                        {item.ko}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-1 border-t border-stone-100/70">
                  {renderActionButtons(`t2-${item.id}`, item.en)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 03: 번호 / 영문(빈칸) / 한글해석 / 보기입력 (TIP)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 3 && (
        <div className="grid grid-cols-1 gap-3">
          {ALL_13_TYPES_DATA.type03.items.map((item, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t3-${item.id}`];

            return (
              <div
                key={item.id}
                id={`type03-card-${item.id}`}
                className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-2.5 hover:border-[#5D4BE2]/30 transition-all"
              >
                {/* Header: SubCategory badge if present */}
                {item.subCategory && (
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F4F2EE] text-stone-600 text-[11px] font-semibold tracking-tight">
                      {item.subCategory}
                    </span>
                  </div>
                )}

                {/* Main Content Row */}
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EEEDFC] text-[#5D4BE2] font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-[15px] sm:text-base font-semibold text-slate-800 leading-relaxed whitespace-pre-line">
                      {item.en}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-0.5 leading-relaxed animate-fade-in whitespace-pre-line">
                        {item.ko}
                      </p>
                    )}
                  </div>
                </div>

                {/* Refined Balanced TIP Box */}
                {item.tip && (
                  <div className="bg-[#FAF8F5] border border-stone-200/70 rounded-xl p-2.5 sm:p-3 flex items-start gap-2.5">
                    <TipBadge />
                    <div className="flex-1 text-xs sm:text-[13px] font-normal text-stone-700 leading-relaxed">
                      {item.tip.includes('\n') ? (
                        <div className="space-y-0.5">
                          {item.tip.split('\n').map((line, lIdx) => (
                            <div key={lIdx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                              <span>{line.replace(/^-\s*/, '')}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span>{item.tip}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Action Row */}
                <div className="flex justify-end pt-1 border-t border-stone-100/70">
                  {renderActionButtons(`t3-${item.id}`, item.en)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 04: 번호 / A영문 / A한글 / B영문 / B한글
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 4 && (
        <div className="space-y-3">
          {ALL_13_TYPES_DATA.type04.pairs.map((pair, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t4-${pair.id}`];

            return (
              <div
                key={pair.id}
                id={`type04-card-${pair.id}`}
                className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EEEDFC] text-[#5D4BE2] font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {index + 1}
                  </span>

                  <div className="flex-1 min-w-0 space-y-2.5">
                    {/* Speaker A */}
                    <div className="flex items-start gap-2.5">
                      <span className="w-5.5 h-5.5 rounded-md bg-indigo-100 text-[#5D4BE2] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        A
                      </span>
                      <div className="flex-1">
                        <p className="text-[14px] sm:text-[15px] font-semibold text-slate-800 leading-relaxed">
                          {pair.speakerA}
                        </p>
                        {isTransOpen && (
                          <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-0.5 leading-relaxed animate-fade-in">
                            {pair.speakerAKo}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Speaker B */}
                    <div className="flex items-start gap-2.5">
                      <span className="w-5.5 h-5.5 rounded-md bg-[#F4F2EE] text-stone-700 border border-stone-200/80 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        B
                      </span>
                      <div className="flex-1">
                        <p className="text-[14px] sm:text-[15px] font-semibold text-slate-800 leading-relaxed">
                          {pair.speakerB}
                        </p>
                        {isTransOpen && (
                          <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-0.5 leading-relaxed animate-fade-in">
                            {pair.speakerBKo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-1 border-t border-stone-100/70">
                  {renderActionButtons(`t4-${pair.id}`, `${pair.speakerA} ... ${pair.speakerB}`)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 05: 번호 / 빈줄(스피킹 밑줄) / TIP (Speak In a Sentence)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 5 && (
        <div className="grid grid-cols-1 gap-3">
          {ALL_13_TYPES_DATA.type05.items.map((item, index) => {
            return (
              <div
                key={item.id}
                id={`type05-card-${item.id}`}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EEEDFC] text-[#5D4BE2] font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {index + 1}
                  </span>

                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Speaking Line Area (스피킹 연습용 밑줄 영역) */}
                    <div className="pt-0.5 pb-2.5 border-b-2 border-stone-300 min-h-[32px] flex items-center">
                      {isTGActive && (
                        <div className="flex items-center gap-2 animate-fade-in">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            [TG 정답]
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-amber-950">
                            {item.model}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Unified TIP Box */}
                    <div className="bg-[#FAF8F5] border border-stone-200/70 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5">
                      <TipBadge />
                      <span className="text-xs sm:text-[13px] font-medium text-stone-700 leading-normal">
                        {item.tip}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 06: 대화문 내용 / 질문 리스트 묶음
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 6 && (
        <div className="space-y-3.5">
          {ALL_13_TYPES_DATA.type06.groups.map((group) => (
            <div
              key={group.id}
              id={`type06-group-${group.id}`}
              className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3"
            >
              {/* Group Title */}
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <span className="w-1.5 h-3.5 bg-[#5D4BE2] rounded-full" />
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight">
                  {group.title}
                </h4>
              </div>

              {/* Questions List */}
              <div className="space-y-2.5">
                {group.questions.map((q, qIdx) => {
                  const qKey = `t6-${group.id}-${qIdx}`;
                  const isTransOpen = isGlobalTranslationOpen || !!translations[qKey];

                  return (
                    <div
                      key={qIdx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-2.5 hover:border-[#5D4BE2]/30 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#5D4BE2] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                          {q.num}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                            {q.text}
                          </p>
                          {isTransOpen && (
                            <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in">
                              {q.ko}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end pt-1 border-t border-stone-100/70">
                        {renderActionButtons(qKey, q.text)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 07: 메신저형 대화 (서로 다른 컬러 아바타칩)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 7 && (
        <div className="space-y-3">
          {ALL_13_TYPES_DATA.type07.dialogue.map((turn) => {
            const isTutor = turn.speaker === 'tutor';
            const turnKey = `t7-${turn.id}`;
            const isTransOpen = isGlobalTranslationOpen || !!translations[turnKey];

            return (
              <div
                key={turn.id}
                id={`dialogue-turn-${turn.id}`}
                className={`flex flex-col gap-1 ${isTutor ? 'items-start' : 'items-end'}`}
              >
                {/* Speaker Header Chip with Avatar & Name */}
                <div className={`flex items-center gap-2 ${isTutor ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center shadow-2xs ${
                    isTutor
                      ? 'bg-[#EEEDFC] text-[#5D4BE2] border border-[#5D4BE2]/20'
                      : 'bg-stone-100 text-stone-700 border border-stone-300/80'
                  }`}>
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-xs font-bold ${
                    isTutor ? 'text-[#5D4BE2]' : 'text-slate-700'
                  }`}>
                    {turn.speakerName}
                  </span>
                </div>

                {/* Indented Speech Bubble */}
                <div className={`w-full max-w-xl ${isTutor ? 'pl-8 pr-2' : 'pr-8 pl-2'}`}>
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl border shadow-2xs space-y-2 transition-all ${
                      isTutor
                        ? 'bg-[#EEEDFC]/40 border-indigo-100/90 text-slate-900'
                        : 'bg-white border-stone-200/90 text-slate-900'
                    }`}
                  >
                    <p className="text-[14px] sm:text-[15px] font-semibold leading-relaxed whitespace-pre-line text-slate-800">
                      {turn.en}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 border-t border-stone-100 leading-relaxed animate-fade-in">
                        {turn.ko}
                      </p>
                    )}

                    {/* TG Note */}
                    {isTGActive && turn.tgNote && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium animate-fade-in leading-relaxed">
                        <span className="font-bold text-amber-800 block mb-0.5">[TG Note]</span>
                        {turn.tgNote}
                      </div>
                    )}

                    {/* Bottom Right Actions */}
                    <div className="flex justify-end pt-1 border-t border-stone-100/60">
                      {renderActionButtons(turnKey, turn.en)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 08: 단어, 예문 (Make your own Sentence)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 8 && (
        <div className="grid grid-cols-1 gap-3">
          {ALL_13_TYPES_DATA.type08.items.map((item, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t8-${item.id}`];

            return (
              <div
                key={item.id}
                id={`type08-card-${item.id}`}
                className="bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:border-[#5D4BE2]/30 transition-all flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#EEEDFC] text-[#5D4BE2] font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    {index + 1}
                  </span>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[15px] sm:text-base font-semibold text-slate-800 leading-relaxed">
                      {item.word}
                    </p>

                    {/* Example Sentence Box */}
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/60 space-y-1">
                      <p className="text-xs sm:text-[13px] font-normal text-stone-600 leading-relaxed italic">
                        {item.exampleEn}
                      </p>
                      {isTransOpen && (
                        <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] leading-relaxed animate-fade-in">
                          {item.exampleKo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-1 border-t border-stone-100/70">
                  {renderActionButtons(`t8-${item.id}`, `${item.word}. ${item.exampleEn}`)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 09: 보기설명, 예문 (Comprehension Check)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 9 && (
        <div className="space-y-3 sm:space-y-3.5">
          {ALL_13_TYPES_DATA.type09.tips.map((tip) => {
            const tipKey = `t9-${tip.id}`;

            return (
              <div
                key={tip.id}
                id={`type09-tip-${tip.id}`}
                className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3"
              >
                {/* Unified TIP Box (다른 페이지들과 동일하게 TIP 뱃지와 가이드 설명이 박스 안에 위치) */}
                <div className="bg-[#FAF8F5] border border-stone-200/70 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5">
                  <TipBadge />
                  <span className="text-xs sm:text-[13px] font-medium text-stone-700 leading-normal">
                    {tip.instruction}
                  </span>
                </div>

                {/* Example Sentences (카드의 메인 콘텐츠로 깔끔하게 노출) */}
                <div className="space-y-2 pl-1">
                  {tip.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" />
                      <p className="text-[15px] sm:text-base font-semibold text-slate-800 leading-relaxed">
                        {ex}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-1 border-t border-stone-100/70">
                  {renderActionButtons(tipKey, tip.examples.join(' . '))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 10: 본문내용, 질문 (Article Reading 1)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 10 && (
        <div className="space-y-4">
          {/* Article Passage Card (본문 지문: 읽기 자료 전용 카드) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-stone-200/80 text-stone-700 text-xs font-bold tracking-tight">
                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                  본문 지문 (Reading Passage)
                </span>
              </div>
              <span className="text-xs font-medium text-stone-400">Article</span>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
              <p className="text-[15px] sm:text-base font-normal text-slate-800 leading-relaxed whitespace-pre-line">
                {ALL_13_TYPES_DATA.type10.articleEn}
              </p>

              {(isGlobalTranslationOpen || !!translations['t10-article']) && (
                <div className="pt-2.5 border-t border-stone-100 text-xs sm:text-[13px] font-normal text-[#5D4BE2] leading-relaxed whitespace-pre-line animate-fade-in">
                  {ALL_13_TYPES_DATA.type10.articleKo}
                </div>
              )}

              <div className="flex justify-end pt-1 border-t border-stone-100/70">
                {renderActionButtons('t10-article', ALL_13_TYPES_DATA.type10.articleEn)}
              </div>
            </div>
          </div>

          {/* Question Section (문제 / 질문: 본문과 확연히 구분되는 인터랙티브 문항 카드) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2.5 px-1">
              <span className="w-1.5 h-4 bg-[#5D4BE2] rounded-full flex-shrink-0" />
              <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight">
                핵심 질문 (Comprehension Question)
              </h4>
            </div>

            <div className="bg-white border-2 border-[#5D4BE2]/35 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#5D4BE2] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                  Q
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                    {ALL_13_TYPES_DATA.type10.questionEn}
                  </p>

                  {(isGlobalTranslationOpen || !!translations['t10-question']) && (
                    <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in">
                      {ALL_13_TYPES_DATA.type10.questionKo}
                    </p>
                  )}
                </div>
              </div>

              {/* TG / Model Answer */}
              {isTGActive && (
                <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900 animate-fade-in leading-relaxed">
                  <span className="font-bold text-amber-800 block mb-0.5">[TG Model Answer]</span>
                  <p>{ALL_13_TYPES_DATA.type10.modelAnswerEn}</p>
                  <p className="text-amber-700 mt-1">{ALL_13_TYPES_DATA.type10.modelAnswerKo}</p>
                </div>
              )}

              <div className="flex justify-end pt-1 border-t border-stone-100/70">
                {renderActionButtons('t10-question', ALL_13_TYPES_DATA.type10.questionEn)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 11: 사진묘사 & 문장 & 브레인스토밍 가이드
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 11 && (
        <div className="space-y-3.5">
          {/* Part Subtitle (조화롭고 세련되게 다듬은 파트 소타이틀 칩) */}
          <div className="flex items-center gap-2 px-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EEEDFC]/80 border border-[#5D4BE2]/15 text-[#5D4BE2] text-xs sm:text-[13px] font-bold tracking-tight shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5D4BE2]" />
              {ALL_13_TYPES_DATA.type11.partSubheader}
            </span>
          </div>

          {/* Image Box */}
          <div className="rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-50 shadow-2xs">
            <img
              src={ALL_13_TYPES_DATA.type11.imageUrl}
              alt="Describe the picture context"
              className="w-full h-44 sm:h-60 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Sentences List Section with Unified Subtitle */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2.5 px-1">
              <span className="w-1.5 h-4 bg-[#5D4BE2] rounded-full flex-shrink-0" />
              <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight">
                문장 구조 익히기 (Grammar Practice)
              </h4>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ALL_13_TYPES_DATA.type11.sentences.map((sen, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 sm:p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/60 text-xs sm:text-[13px] font-medium text-slate-800 leading-relaxed"
                  >
                    {sen}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Brainstorming Guide Card */}
          {isGuideOpen && (
            <div className="bg-[#FFF8F0] border-2 border-amber-300/80 rounded-2xl p-4 shadow-xs space-y-3 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-white bg-amber-600 px-2 py-0.5 rounded-md">
                  Guide
                </span>
                <h4 className="text-xs sm:text-[13px] font-bold text-amber-900">
                  {ALL_13_TYPES_DATA.type11.brainstorming.title}
                </h4>
              </div>

              <div className="space-y-2">
                {ALL_13_TYPES_DATA.type11.brainstorming.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="bg-white/80 p-2.5 rounded-xl border border-amber-200/60 space-y-1">
                    <span className="text-xs font-bold text-amber-800 block">
                      {sec.label}
                    </span>
                    <ul className="list-disc list-inside text-xs font-normal text-stone-700 space-y-0.5 leading-relaxed">
                      {sec.items.map((it, itIdx) => (
                        <li key={itIdx}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 12: 문제 상황 지문, 질문, 답변가이드, 답변TG (TOEIC SPEAKING Part 3)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 12 && (
        <div className="space-y-4">
          {/* Part Subtitle */}
          <div className="flex items-center gap-2 px-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EEEDFC]/80 border border-[#5D4BE2]/15 text-[#5D4BE2] text-xs sm:text-[13px] font-bold tracking-tight shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5D4BE2]" />
              {ALL_13_TYPES_DATA.type12.partSubheader}
            </span>
          </div>

          {/* Scenario / Context Box (본문 상황 설명: 웜그레이 톤으로 배경 상황임을 명확히 표현) */}
          <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-4 sm:p-4.5 space-y-2 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-stone-200/80 text-stone-700 text-[11px] font-bold tracking-tight">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                Scenario & Directions
              </span>
            </div>
            <p className="text-[14px] sm:text-[15px] font-semibold text-slate-800 leading-relaxed">
              {ALL_13_TYPES_DATA.type12.scenarioEn}
            </p>
            <p className="text-xs font-normal text-stone-500 leading-relaxed">
              {ALL_13_TYPES_DATA.type12.scenarioKo}
            </p>
          </div>

          {/* Questions Section (질문 문항들: 개별 문항 카드로 명확한 위계와 생동감 부여) */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5 px-1">
              <span className="w-1.5 h-4 bg-[#5D4BE2] rounded-full flex-shrink-0" />
              <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight">
                Questions (Q5 ~ Q7)
              </h4>
            </div>

            <div className="space-y-3">
              {ALL_13_TYPES_DATA.type12.questions.map((q) => {
                const qKey = `t12-${q.id}`;
                const isTransOpen = isGlobalTranslationOpen || !!translations[qKey];

                return (
                  <div
                    key={q.id}
                    id={`type12-q-${q.id}`}
                    className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#5D4BE2] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                        {q.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                          {q.textEn}
                        </p>
                        {isTransOpen && (
                          <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in">
                            {q.textKo}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Answer Guide (Visible when Top ⇄ Guide Button is Active) */}
                    {isGuideOpen && (
                      <div className="bg-[#FFF8F0] border border-amber-300/80 rounded-xl p-2.5 sm:p-3 space-y-1 animate-fade-in leading-relaxed">
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                          답변 가이드 (Guide)
                        </span>
                        <p className="text-xs sm:text-[13px] font-medium text-amber-950">
                          {q.guideEn}
                        </p>
                        <p className="text-xs font-normal text-amber-800">
                          {q.guideKo}
                        </p>
                      </div>
                    )}

                    {/* TG Model Answer */}
                    {isTGActive && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 sm:p-3 space-y-1 animate-fade-in leading-relaxed">
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md inline-block">
                          [Model Answer]
                        </span>
                        <p className="text-xs sm:text-[13px] font-medium text-amber-950">
                          {q.tgModelAnswer}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end pt-1 border-t border-stone-100/70">
                      {renderActionButtons(qKey, q.textEn)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 13: 도표, 질문, 답변가이드, 답변TG, 숨김텍스트 (TOEIC SPEAKING Part 4)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 13 && (
        <div className="space-y-4">
          {/* Part Subtitle */}
          <div className="flex items-center gap-2 px-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#EEEDFC]/80 border border-[#5D4BE2]/15 text-[#5D4BE2] text-xs sm:text-[13px] font-bold tracking-tight shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5D4BE2]" />
              {ALL_13_TYPES_DATA.type13.partSubheader}
            </span>
          </div>

          {/* Directions Scenario (상황 지문: 웜그레이 톤 박스) */}
          <div className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-4 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-stone-200/80 text-stone-700 text-[11px] font-bold tracking-tight">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                Directions
              </span>
            </div>
            <p className="text-[14px] sm:text-[15px] font-semibold text-slate-800 leading-relaxed">
              {ALL_13_TYPES_DATA.type13.scenarioEn}
            </p>
            <p className="text-xs font-normal text-stone-500 leading-relaxed">
              {ALL_13_TYPES_DATA.type13.scenarioKo}
            </p>
          </div>

          {/* Schedule Image Component (핵심 본문 자료: 텍스트와 완벽히 차별화되는 실감형 문서 이미지) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-[#5D4BE2] rounded-full flex-shrink-0" />
                <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight">
                  참고 자료 (Schedule & Information)
                </h4>
              </div>
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="text-xs font-semibold text-[#5D4BE2] hover:text-[#4939C8] flex items-center gap-1 cursor-pointer transition-colors bg-[#EEEDFC]/70 hover:bg-[#EEEDFC] px-2.5 py-1 rounded-lg border border-[#5D4BE2]/20"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>크게 보기</span>
              </button>
            </div>

            {/* Document Image Display Card */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-2.5 sm:p-3.5 shadow-2xs space-y-2">
              <div 
                onClick={() => setIsImageModalOpen(true)}
                className="relative group rounded-xl overflow-hidden border border-stone-200/80 bg-stone-100/60 cursor-pointer aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center"
              >
                <img
                  src={workshopScheduleImg}
                  alt="2026 Social Network Media Workshop Schedule Document"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain sm:object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    클릭하여 확대
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-[11px] sm:text-xs text-stone-500">
                <span className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-stone-400" />
                  {ALL_13_TYPES_DATA.type13.tableTitle}
                </span>
                <span className="text-stone-400">Schedule Document</span>
              </div>
            </div>
          </div>

          {/* Full Screen Image Modal */}
          {isImageModalOpen && (
            <div 
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
              onClick={() => setIsImageModalOpen(false)}
            >
              <div 
                className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-stone-200 bg-[#FAF8F5]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5D4BE2]" />
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {ALL_13_TYPES_DATA.type13.tableTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsImageModalOpen(false)}
                    className="p-1.5 text-stone-500 hover:text-slate-900 hover:bg-stone-200/70 rounded-xl transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-auto p-3 sm:p-4 flex items-center justify-center bg-stone-900/5 min-h-[300px]">
                  <img
                    src={workshopScheduleImg}
                    alt="2026 Social Network Media Workshop Schedule Document Enlarge"
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] w-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hidden Question Cards (문제 영역: 번호 뱃지 및 숨김/보기 토글이 포함된 문항 카드) */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-4 bg-[#5D4BE2] rounded-full flex-shrink-0" />
                <h4 className="text-sm sm:text-[15px] font-bold text-slate-800 tracking-tight">
                  Questions (Q8 ~ Q10)
                </h4>
              </div>
              <span className="text-xs font-medium text-stone-400">
                음성 청취 후 답변
              </span>
            </div>

            <div className="space-y-3">
              {ALL_13_TYPES_DATA.type13.questions.map((q) => {
                const qKey = `t13-${q.id}`;
                const isRevealed = revealedScripts[q.id] || isTGActive;

                return (
                  <div
                    key={q.id}
                    id={`type13-q-${q.id}`}
                    className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#5D4BE2] text-white font-bold text-xs sm:text-[13px] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                          {q.number}
                        </span>

                        <div className="flex-1 min-w-0">
                          {/* If hidden (student view) */}
                          {!isRevealed ? (
                            <div className="flex items-center gap-2">
                              <p className="text-[14px] sm:text-[15px] font-medium text-stone-500 italic leading-relaxed">
                                {q.hiddenStudentText}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-0.5 animate-fade-in">
                              <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                                {q.actualQuestionEn}
                              </p>
                              <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] leading-relaxed">
                                {q.actualQuestionKo}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reveal Eye Button for Student */}
                      {!isTGActive && (
                        <button
                          onClick={() => toggleRevealScript(q.id)}
                          className="px-2.5 py-1 rounded-xl text-xs font-semibold border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center gap-1 cursor-pointer flex-shrink-0 transition-colors"
                          title="질문 텍스트 확인"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? '질문 숨김' : '질문 보기'}</span>
                        </button>
                      )}
                    </div>

                    {/* Answer Guide (Visible when Top ⇄ Guide Button is Active) */}
                    {isGuideOpen && (
                      <div className="bg-[#FFF8F0] border border-amber-300/80 rounded-xl p-2.5 sm:p-3 space-y-1 animate-fade-in leading-relaxed">
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                          답변 가이드 (Guide)
                        </span>
                        <p className="text-xs sm:text-[13px] font-medium text-amber-950">
                          {q.guideEn}
                        </p>
                        <p className="text-xs font-normal text-amber-800">
                          {q.guideKo}
                        </p>
                      </div>
                    )}

                    {/* TG Model Answer */}
                    {isTGActive && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 sm:p-3 space-y-1 animate-fade-in leading-relaxed">
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md inline-block">
                          [Model Answer]
                        </span>
                        <p className="text-xs sm:text-[13px] font-medium text-amber-950">
                          {q.tgModelAnswer}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end pt-1 border-t border-stone-100/70">
                      {renderActionButtons(qKey, q.actualQuestionEn)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
