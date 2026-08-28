import React, { useState } from 'react';
import { LessonPart, LessonData } from '../types';
import { ALL_13_TYPES_DATA } from '../data/lessonData';
import workshopScheduleImg from '../assets/images/workshop_schedule_doc_1787807320823.jpg';
import { 
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  FileText,
  ZoomIn,
  X,
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

// Unified Minimal Tip Component
export const TipBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded flex-shrink-0 tracking-tight">
    <Sparkles className="w-3 h-3 text-amber-600" />
    TIP
  </span>
);

// Consistent Number / Identifier Chip Component (Clean border chip matching user request)
export const NumberChip: React.FC<{ value: string | number; isSpeaker?: boolean }> = ({ value, isSpeaker = false }) => (
  <span className={`inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-bold rounded-lg border flex-shrink-0 select-none ${
    isSpeaker && String(value).toUpperCase() === 'B'
      ? 'bg-stone-50 border-stone-200 text-stone-600'
      : 'bg-[#EEEDFC] border-[#5D4BE2]/30 text-[#5D4BE2]'
  }`}>
    {value}
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
    <div className="space-y-4 pt-0.5">
      {/* ─────────────────────────────────────────────────────────────
          타입 01: 발음 & 읽기 (Pronunciation & Reading)
          - 단어 중심: 18px font-bold text-slate-900
          - 넘버링: 보더/칩 형태
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 1 && (
        <div className="space-y-6">
          {ALL_13_TYPES_DATA.type01.sections.map((sec, secIdx) => (
            <div key={secIdx} className={secIdx > 0 ? 'mt-6 pt-4 border-t border-stone-100' : ''}>
              {/* De-emphasized Soft Subtitle */}
              <div className="flex items-center gap-1.5 px-0.5 mb-2.5">
                <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
                <h4 className="text-xs sm:text-[13px] font-medium text-stone-500 tracking-tight">
                  {sec.sectionTitle}
                </h4>
              </div>

              {/* Clean Flat Item Rows */}
              <div className="divide-y divide-stone-100">
                {sec.items.map((item) => {
                  const isTransOpen = isGlobalTranslationOpen || !!translations[`t1-${item.id}`];

                  return (
                    <div
                      key={item.id}
                      id={`type01-item-${item.id}`}
                      className="py-3.5 first:pt-1 last:pb-1 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start gap-3">
                        {/* Number as border chip */}
                        <NumberChip value={item.id} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            {/* Word Type standard: 18px bold */}
                            <p className="text-[17px] sm:text-[18px] font-bold text-slate-900 leading-snug">
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

                        {/* Inline Actions */}
                        <div className="flex-shrink-0 pt-0.5">
                          {renderActionButtons(`t1-${item.id}`, item.en)}
                        </div>
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
          타입 02: 어휘 (Vocabulary & Simple Q)
          - 단어 중심: 18px font-bold text-slate-900
          - 넘버링: 보더/칩 형태
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 2 && (
        <div className="divide-y divide-stone-100">
          {ALL_13_TYPES_DATA.type02.items.map((item, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t2-${item.id}`];

            return (
              <div
                key={item.id}
                id={`type02-item-${item.id}`}
                className="py-3.5 first:pt-1 last:pb-1 flex flex-col justify-between gap-2"
              >
                <div className="flex items-start gap-3">
                  {/* Number as border chip */}
                  <NumberChip value={index + 1} />

                  <div className="flex-1 min-w-0">
                    {/* Word Type standard: 18px bold */}
                    <p className="text-[17px] sm:text-[18px] font-bold text-slate-900 leading-snug whitespace-pre-line tracking-tight">
                      {item.en}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in whitespace-pre-line">
                        {item.ko}
                      </p>
                    )}
                  </div>

                  {/* Inline Actions */}
                  <div className="flex-shrink-0 pt-0.5">
                    {renderActionButtons(`t2-${item.id}`, item.en)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 03: 패턴 드릴 (Pattern Drill)
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
          - 넘버링: 보더/칩 형태
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 3 && (
        <div className="divide-y divide-stone-100">
          {ALL_13_TYPES_DATA.type03.items.map((item, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t3-${item.id}`];

            return (
              <div
                key={item.id}
                id={`type03-item-${item.id}`}
                className="py-4 first:pt-1 last:pb-1 space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  {/* Number as border chip */}
                  <NumberChip value={index + 1} />

                  <div className="flex-1 min-w-0 space-y-1">
                    {item.subCategory && (
                      <span className="text-[11px] font-semibold text-stone-400 block">
                        {item.subCategory}
                      </span>
                    )}

                    {/* Sentence standard: 15px/16px font-semibold */}
                    <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                      {item.en}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-0.5 leading-relaxed animate-fade-in whitespace-pre-line">
                        {item.ko}
                      </p>
                    )}

                    {/* Minimal TIP row */}
                    {item.tip && (
                      <div className="mt-2 pt-1.5 flex items-start gap-2 text-xs sm:text-[13px] text-stone-600">
                        <TipBadge />
                        <div className="flex-1 leading-relaxed">
                          {item.tip.includes('\n') ? (
                            <div className="space-y-0.5">
                              {item.tip.split('\n').map((line, lIdx) => (
                                <div key={lIdx} className="flex items-center gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
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
                  </div>

                  {/* Inline Actions */}
                  <div className="flex-shrink-0 pt-0.5">
                    {renderActionButtons(`t3-${item.id}`, item.en)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 04: Q&A Warm-up (A/B Pair)
          - A/B 화자: 보더/칩 형태
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 4 && (
        <div className="divide-y divide-stone-100">
          {ALL_13_TYPES_DATA.type04.pairs.map((pair, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t4-${pair.id}`];

            return (
              <div
                key={pair.id}
                id={`type04-item-${pair.id}`}
                className="py-4 first:pt-1 last:pb-1 space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  {/* Pair Number chip */}
                  <NumberChip value={index + 1} />

                  <div className="flex-1 min-w-0 space-y-2.5">
                    {/* Speaker A - Chip */}
                    <div className="flex items-start gap-2.5">
                      <NumberChip value="A" isSpeaker />
                      <div className="flex-1">
                        <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                          {pair.speakerA}
                        </p>
                        {isTransOpen && (
                          <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-0.5 leading-relaxed animate-fade-in">
                            {pair.speakerAKo}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Speaker B - Chip */}
                    <div className="flex items-start gap-2.5">
                      <NumberChip value="B" isSpeaker />
                      <div className="flex-1">
                        <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
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

                  {/* Inline Actions */}
                  <div className="flex-shrink-0 pt-0.5">
                    {renderActionButtons(`t4-${pair.id}`, `${pair.speakerA} ... ${pair.speakerB}`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 05: 문장으로 말하기 (Speak In a Sentence)
          - 넘버링: 보더/칩 형태
          - 패딩값 및 간격 통일
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 5 && (
        <div className="divide-y divide-stone-100">
          {ALL_13_TYPES_DATA.type05.items.map((item, index) => {
            return (
              <div
                key={item.id}
                id={`type05-item-${item.id}`}
                className="py-4 first:pt-1 last:pb-1 space-y-2.5"
              >
                <div className="flex items-start gap-3">
                  {/* Number as border chip */}
                  <NumberChip value={index + 1} />

                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Speaking Line Area */}
                    <div className="pt-0.5 pb-2 border-b border-stone-300 min-h-[28px] flex items-center">
                      {isTGActive && (
                        <div className="flex items-center gap-2 animate-fade-in">
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                            [TG 정답]
                          </span>
                          <span className="text-xs sm:text-sm font-semibold text-amber-950">
                            {item.model}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Minimal TIP Row */}
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] text-stone-600">
                      <TipBadge />
                      <span className="font-medium text-stone-700 leading-normal">
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
          타입 06: 주제 대화 질문 (Talking About The Topic)
          - Q1, Q2: 보더/칩 형태
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 6 && (
        <div className="space-y-6">
          {ALL_13_TYPES_DATA.type06.groups.map((group, gIdx) => (
            <div key={group.id} className={gIdx > 0 ? 'mt-6 pt-4 border-t border-stone-100' : ''}>
              {/* De-emphasized Soft Subtitle */}
              <div className="flex items-center gap-1.5 px-0.5 mb-2.5">
                <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
                <h4 className="text-xs sm:text-[13px] font-medium text-stone-500 tracking-tight">
                  {group.title}
                </h4>
              </div>

              {/* Questions List */}
              <div className="divide-y divide-stone-100">
                {group.questions.map((q, qIdx) => {
                  const qKey = `t6-${group.id}-${qIdx}`;
                  const isTransOpen = isGlobalTranslationOpen || !!translations[qKey];

                  return (
                    <div
                      key={qIdx}
                      className="py-3.5 first:pt-1 last:pb-1 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start gap-3">
                        {/* Q1, Q2 as border chip */}
                        <NumberChip value={q.num} />
                        
                        <div className="flex-1 min-w-0">
                          {/* Sentence standard: 15px/16px font-semibold */}
                          <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                            {q.text}
                          </p>
                          {isTransOpen && (
                            <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in">
                              {q.ko}
                            </p>
                          )}
                        </div>

                        {/* Inline Actions */}
                        <div className="flex-shrink-0 pt-0.5">
                          {renderActionButtons(qKey, q.text)}
                        </div>
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
          타입 07: 메신저형 대화 (Dialogue Speaking)
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 7 && (
        <div className="space-y-3.5">
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
                {/* Speaker Header */}
                <div className={`flex items-center gap-1.5 ${isTutor ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className={`text-xs font-bold ${
                    isTutor ? 'text-[#5D4BE2]' : 'text-stone-600'
                  }`}>
                    {turn.speakerName}
                  </span>
                </div>

                {/* Speech Bubble */}
                <div className={`w-full max-w-xl ${isTutor ? 'pr-6' : 'pl-6'}`}>
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl transition-all ${
                      isTutor
                        ? 'bg-[#F2F0FD] text-slate-900'
                        : 'bg-stone-100/80 text-slate-900'
                    }`}
                  >
                    {/* Sentence standard: 15px/16px font-semibold */}
                    <p className="text-[15px] sm:text-base font-semibold leading-relaxed whitespace-pre-line text-slate-900">
                      {turn.en}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1.5 leading-relaxed animate-fade-in">
                        {turn.ko}
                      </p>
                    )}

                    {/* TG Note */}
                    {isTGActive && turn.tgNote && (
                      <div className="mt-2 p-2 rounded-lg bg-amber-50 text-amber-900 text-xs font-medium animate-fade-in leading-relaxed">
                        <span className="font-bold text-amber-800 block mb-0.5">[TG Note]</span>
                        {turn.tgNote}
                      </div>
                    )}

                    {/* Bottom Right Actions */}
                    <div className="flex justify-end pt-1">
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
          - 단어: 18px font-bold, 예문: 15px font-normal
          - 넘버링: 보더/칩 형태
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 8 && (
        <div className="divide-y divide-stone-100">
          {ALL_13_TYPES_DATA.type08.items.map((item, index) => {
            const isTransOpen = isGlobalTranslationOpen || !!translations[`t8-${item.id}`];

            return (
              <div
                key={item.id}
                id={`type08-item-${item.id}`}
                className="py-3.5 first:pt-1 last:pb-1 space-y-1.5"
              >
                <div className="flex items-start gap-3">
                  {/* Number as border chip */}
                  <NumberChip value={index + 1} />

                  <div className="flex-1 min-w-0 space-y-1">
                    {/* Word Type standard: 18px bold */}
                    <p className="text-[17px] sm:text-[18px] font-bold text-slate-900 leading-snug">
                      {item.word}
                    </p>

                    {/* Example Sentence standard */}
                    <p className="text-[14px] sm:text-[15px] font-normal text-stone-700 leading-relaxed">
                      {item.exampleEn}
                    </p>

                    {isTransOpen && (
                      <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] leading-relaxed animate-fade-in">
                        {item.exampleKo}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0 pt-0.5">
                    {renderActionButtons(`t8-${item.id}`, `${item.word}. ${item.exampleEn}`)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 09: 보기설명, 예문 (Comprehension Check)
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 9 && (
        <div className="space-y-4">
          {ALL_13_TYPES_DATA.type09.tips.map((tip) => {
            const tipKey = `t9-${tip.id}`;

            return (
              <div
                key={tip.id}
                id={`type09-tip-${tip.id}`}
                className="space-y-3"
              >
                {/* Minimal Instruction */}
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-stone-600">
                  <TipBadge />
                  <span className="font-medium text-stone-700 leading-normal">
                    {tip.instruction}
                  </span>
                </div>

                {/* Example Sentences */}
                <div className="divide-y divide-stone-100">
                  {tip.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="py-2.5 first:pt-1 last:pb-1 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5D4BE2] mt-2.5 flex-shrink-0" />
                      <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed flex-1">
                        {ex}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-1">
                  {renderActionButtons(tipKey, tip.examples.join(' . '))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 10: 본문내용, 질문 (Article Reading)
          - 질문: Q. 칩 형태 + 15px/16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 10 && (
        <div className="space-y-5">
          {/* Article Passage */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 px-0.5">
              <BookOpen className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs font-medium text-stone-400">Reading Passage</span>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 space-y-3">
              <p className="text-[15px] sm:text-base font-normal text-slate-800 leading-relaxed whitespace-pre-line">
                {ALL_13_TYPES_DATA.type10.articleEn}
              </p>

              {(isGlobalTranslationOpen || !!translations['t10-article']) && (
                <div className="pt-2 border-t border-stone-200/60 text-xs sm:text-[13px] font-normal text-[#5D4BE2] leading-relaxed whitespace-pre-line animate-fade-in">
                  {ALL_13_TYPES_DATA.type10.articleKo}
                </div>
              )}

              <div className="flex justify-end pt-1">
                {renderActionButtons('t10-article', ALL_13_TYPES_DATA.type10.articleEn)}
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1.5 px-0.5 mb-1">
              <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
              <h4 className="text-xs sm:text-[13px] font-medium text-stone-500 tracking-tight">
                Comprehension Question
              </h4>
            </div>

            <div className="py-2 space-y-3">
              <div className="flex items-start gap-3">
                {/* Q as border chip */}
                <NumberChip value="Q" />

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

                <div className="flex-shrink-0 pt-0.5">
                  {renderActionButtons('t10-question', ALL_13_TYPES_DATA.type10.questionEn)}
                </div>
              </div>

              {/* TG Model Answer */}
              {isTGActive && (
                <div className="p-3 rounded-xl bg-amber-50 text-xs font-medium text-amber-900 animate-fade-in leading-relaxed space-y-0.5">
                  <span className="font-bold text-amber-800 block mb-0.5">[TG Model Answer]</span>
                  <p>{ALL_13_TYPES_DATA.type10.modelAnswerEn}</p>
                  <p className="text-amber-700">{ALL_13_TYPES_DATA.type10.modelAnswerKo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 11: 사진묘사 & 문장 (Describe A Picture)
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 11 && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
            <span className="text-xs sm:text-[13px] font-medium text-stone-500">
              {ALL_13_TYPES_DATA.type11.partSubheader}
            </span>
          </div>

          {/* Image Box */}
          <div className="rounded-2xl overflow-hidden bg-stone-50">
            <img
              src={ALL_13_TYPES_DATA.type11.imageUrl}
              alt="Describe the picture context"
              className="w-full h-48 sm:h-64 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Grammar Practice Sentences */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1.5 px-0.5 mb-1">
              <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
              <h4 className="text-xs sm:text-[13px] font-medium text-stone-500">
                문장 구조 익히기
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_13_TYPES_DATA.type11.sentences.map((sen, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-xl bg-[#FAF8F5] text-xs sm:text-[13px] font-medium text-slate-800 leading-relaxed"
                >
                  {sen}
                </div>
              ))}
            </div>
          </div>

          {/* Brainstorming Guide */}
          {isGuideOpen && (
            <div className="bg-[#FFF8F0] rounded-2xl p-4 space-y-2.5 animate-fade-in">
              <span className="text-xs font-bold text-amber-800 block">
                {ALL_13_TYPES_DATA.type11.brainstorming.title}
              </span>

              <div className="space-y-2">
                {ALL_13_TYPES_DATA.type11.brainstorming.sections.map((sec, secIdx) => (
                  <div key={secIdx} className="bg-white/80 p-2.5 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-amber-900 block">
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
          타입 12: 질문에 답하기 (TOEIC SPEAKING Part 3)
          - Q5, Q6, Q7: 보더/칩 형태
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 12 && (
        <div className="space-y-5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
            <span className="text-xs sm:text-[13px] font-medium text-stone-500">
              {ALL_13_TYPES_DATA.type12.partSubheader}
            </span>
          </div>

          {/* Scenario */}
          <div className="bg-[#FAF8F5] rounded-2xl p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium">
              <FileText className="w-3.5 h-3.5" />
              <span>Scenario & Directions</span>
            </div>
            <p className="text-[14px] sm:text-[15px] font-semibold text-slate-800 leading-relaxed">
              {ALL_13_TYPES_DATA.type12.scenarioEn}
            </p>
            <p className="text-xs font-normal text-stone-500 leading-relaxed">
              {ALL_13_TYPES_DATA.type12.scenarioKo}
            </p>
          </div>

          {/* Questions (Q5 ~ Q7) */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1.5 px-0.5 mb-1">
              <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
              <h4 className="text-xs sm:text-[13px] font-medium text-stone-500">
                Questions (Q5 ~ Q7)
              </h4>
            </div>

            <div className="divide-y divide-stone-100">
              {ALL_13_TYPES_DATA.type12.questions.map((q) => {
                const qKey = `t12-${q.id}`;
                const isTransOpen = isGlobalTranslationOpen || !!translations[qKey];

                return (
                  <div
                    key={q.id}
                    id={`type12-q-${q.id}`}
                    className="py-3.5 first:pt-1 last:pb-1 space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      {/* Q5 as border chip */}
                      <NumberChip value={q.number} />

                      <div className="flex-1 min-w-0">
                        {/* Sentence standard: 15px/16px font-semibold */}
                        <p className="text-[15px] sm:text-base font-semibold text-slate-900 leading-relaxed">
                          {q.textEn}
                        </p>
                        {isTransOpen && (
                          <p className="text-xs sm:text-[13px] font-normal text-[#5D4BE2] pt-1 leading-relaxed animate-fade-in">
                            {q.textKo}
                          </p>
                        )}
                      </div>

                      <div className="flex-shrink-0 pt-0.5">
                        {renderActionButtons(qKey, q.textEn)}
                      </div>
                    </div>

                    {/* Answer Guide */}
                    {isGuideOpen && (
                      <div className="ml-10 bg-[#FFF8F0] rounded-xl p-2.5 space-y-1 animate-fade-in leading-relaxed text-xs">
                        <span className="font-bold text-amber-800 block">답변 가이드</span>
                        <p className="font-medium text-amber-950">{q.guideEn}</p>
                        <p className="font-normal text-amber-800">{q.guideKo}</p>
                      </div>
                    )}

                    {/* TG Model Answer */}
                    {isTGActive && (
                      <div className="ml-10 bg-amber-50 rounded-xl p-2.5 space-y-0.5 animate-fade-in leading-relaxed text-xs">
                        <span className="font-bold text-amber-900 block">[Model Answer]</span>
                        <p className="font-medium text-amber-950">{q.tgModelAnswer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          타입 13: 제공된 정보로 답하기 (TOEIC SPEAKING Part 4)
          - Q8, Q9, Q10: 보더/칩 형태
          - 문장형 표준: 15px sm:16px font-semibold text-slate-900
      ─────────────────────────────────────────────────────────────── */}
      {part.typeNumber === 13 && (
        <div className="space-y-5">
          <div className="flex items-center gap-1.5 px-0.5">
            <span className="w-1 h-1 rounded-full bg-stone-400 flex-shrink-0" />
            <span className="text-xs sm:text-[13px] font-medium text-stone-500">
              {ALL_13_TYPES_DATA.type13.partSubheader}
            </span>
          </div>

          {/* Scenario */}
          <div className="bg-[#FAF8F5] rounded-2xl p-4 space-y-1">
            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium">
              <FileText className="w-3.5 h-3.5" />
              <span>Directions</span>
            </div>
            <p className="text-[14px] sm:text-[15px] font-semibold text-slate-800 leading-relaxed">
              {ALL_13_TYPES_DATA.type13.scenarioEn}
            </p>
            <p className="text-xs font-normal text-stone-500 leading-relaxed">
              {ALL_13_TYPES_DATA.type13.scenarioKo}
            </p>
          </div>

          {/* Schedule Image */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-xs font-medium text-stone-400">참고 자료</span>
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="text-xs font-semibold text-[#5D4BE2] hover:text-[#4939C8] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>크게 보기</span>
              </button>
            </div>

            <div 
              onClick={() => setIsImageModalOpen(true)}
              className="relative group rounded-2xl overflow-hidden bg-stone-100 cursor-pointer aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center"
            >
              <img
                src={workshopScheduleImg}
                alt="Workshop Schedule Document"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain sm:object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5" />
                  클릭하여 확대
                </div>
              </div>
            </div>
          </div>

          {/* Image Modal */}
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
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {ALL_13_TYPES_DATA.type13.tableTitle}
                  </h3>
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
                    alt="Schedule Enlarge"
                    referrerPolicy="no-referrer"
                    className="max-h-[75vh] w-auto object-contain rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Questions (Q8 ~ Q10) */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between px-0.5 mb-1">
              <span className="text-xs font-medium text-stone-400">Questions (Q8 ~ Q10)</span>
              <span className="text-xs text-stone-400">음성 청취 후 답변</span>
            </div>

            <div className="divide-y divide-stone-100">
              {ALL_13_TYPES_DATA.type13.questions.map((q) => {
                const qKey = `t13-${q.id}`;
                const isRevealed = revealedScripts[q.id] || isTGActive;

                return (
                  <div
                    key={q.id}
                    id={`type13-q-${q.id}`}
                    className="py-3.5 first:pt-1 last:pb-1 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        {/* Q8 border chip */}
                        <NumberChip value={q.number} />

                        <div className="flex-1 min-w-0">
                          {!isRevealed ? (
                            <p className="text-[14px] sm:text-[15px] font-medium text-stone-400 italic leading-relaxed">
                              {q.hiddenStudentText}
                            </p>
                          ) : (
                            <div className="space-y-0.5 animate-fade-in">
                              {/* Sentence standard: 15px/16px font-semibold */}
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

                      {/* Reveal Eye Button */}
                      {!isTGActive && (
                        <button
                          onClick={() => toggleRevealScript(q.id)}
                          className="px-2 py-1 rounded-lg text-xs font-semibold text-stone-500 hover:text-slate-900 hover:bg-stone-100 flex items-center gap-1 cursor-pointer flex-shrink-0 transition-colors"
                          title="질문 텍스트 확인"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{isRevealed ? '숨김' : '보기'}</span>
                        </button>
                      )}

                      <div className="flex-shrink-0 pt-0.5">
                        {renderActionButtons(qKey, q.actualQuestionEn)}
                      </div>
                    </div>

                    {/* Answer Guide */}
                    {isGuideOpen && (
                      <div className="ml-10 bg-[#FFF8F0] rounded-xl p-2.5 space-y-1 animate-fade-in leading-relaxed text-xs">
                        <span className="font-bold text-amber-800 block">답변 가이드</span>
                        <p className="font-medium text-amber-950">{q.guideEn}</p>
                        <p className="font-normal text-amber-800">{q.guideKo}</p>
                      </div>
                    )}

                    {/* TG Model Answer */}
                    {isTGActive && (
                      <div className="ml-10 bg-amber-50 rounded-xl p-2.5 space-y-0.5 animate-fade-in leading-relaxed text-xs">
                        <span className="font-bold text-amber-900 block">[Model Answer]</span>
                        <p className="font-medium text-amber-950">{q.tgModelAnswer}</p>
                      </div>
                    )}
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
