import React, { useState } from 'react';
import { ALL_PARTS_CONTENT, PartContentData } from '../data/allPartsData';
import { LessonPart } from '../types';
import { Volume2, Languages, Send, Image as ImageIcon, Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { speechManager } from '../utils/speech';

interface UniversalPartViewProps {
  part: LessonPart;
  isTGActive?: boolean;
}

export const UniversalPartView: React.FC<UniversalPartViewProps> = ({ part, isTGActive = false }) => {
  const content: PartContentData = ALL_PARTS_CONTENT[part.id] || {
    id: part.id,
    partNumber: part.partNumber,
    title: part.title,
    koreanSubtitle: part.koreanTitle,
    bannerDescription: part.description,
    type: 'passage_intro'
  };

  // State for translation toggles per item
  const [activeTranslations, setActiveTranslations] = useState<Record<string, boolean>>({});
  // State for quiz selections
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  // State for user text input
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [submittedInputs, setSubmittedInputs] = useState<Record<string, string>>({});
  // State for hidden text toggle (e.g., Part 14 survey)
  const [showHiddenText, setShowHiddenText] = useState(false);

  const toggleTrans = (key: string) => {
    setActiveTranslations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputSubmit = (key: string) => {
    if (!userInputs[key]?.trim()) return;
    setSubmittedInputs(prev => ({
      ...prev,
      [key]: userInputs[key]
    }));
  };

  return (
    <div className="bg-white rounded-[28px] sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Top Banner (Exact Figma Gradient Purple Layout) */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 text-white p-5 sm:p-7 relative">
        <span className="inline-block px-3 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase mb-1.5 text-indigo-100">
          {content.partNumber}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {content.title}
        </h2>
        <p className="text-indigo-100 text-xs sm:text-sm mt-1">
          {content.bannerDescription}
        </p>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6">

        {/* 1. PASSAGE INTRO (PART 01, PART 11) */}
        {content.type === 'passage_intro' && content.items && (
          <div className="space-y-4">
            {content.items.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <p className="text-slate-900 text-base sm:text-lg font-semibold leading-relaxed">
                  {item.en}
                </p>

                {/* Bottom Action Icon Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    id={`btn-play-passage-${idx}`}
                    onClick={() => speechManager.speak(item.en)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                    title="원음 듣기"
                  >
                    <Volume2 className="w-4 h-4 stroke-[2.4]" />
                  </button>

                  <button
                    id={`btn-trans-passage-${idx}`}
                    onClick={() => toggleTrans(`passage-${idx}`)}
                    className={`p-2 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                      activeTranslations[`passage-${idx}`]
                        ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                        : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:scale-105 active:scale-95'
                    }`}
                    title={activeTranslations[`passage-${idx}`] ? '한국어 해석 닫기' : '한국어 번역 보기'}
                  >
                    <Languages className="w-4 h-4 stroke-[2.4]" />
                  </button>
                </div>

                {activeTranslations[`passage-${idx}`] && (
                  <div className="mt-3 p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed animate-fade-in">
                    {item.ko}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 2. VOCABULARY WORD LIST (PART 02) */}
        {content.type === 'word_list' && content.items && (
          <div className="space-y-5 divide-y divide-slate-100">
            {content.items.map((item, idx) => (
              <div key={idx} className={idx === 0 ? 'space-y-2' : 'pt-4 space-y-2'}>
                {/* Word & POS & Meaning */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-slate-900">{item.word}</span>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">
                    {item.pos}
                  </span>
                  <span className="text-sm font-medium text-slate-600">{item.meaning}</span>
                </div>

                {/* Example sentence card */}
                <div className="p-3.5 bg-[#F4F6FB] rounded-2xl space-y-1">
                  <p className="text-sm sm:text-base font-semibold text-slate-900">
                    {item.exampleEn}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-indigo-700">
                    {item.exampleKo}
                  </p>
                </div>

                {/* Audio button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id={`btn-play-word-${idx}`}
                    onClick={() => speechManager.speak(`${item.word}. ${item.exampleEn}`)}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                    title="단어 및 예문 듣기"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. NUMLINE LIST (PART 03, PART 05, PART 06) */}
        {content.type === 'numline_list' && content.items && (
          <div className="space-y-4 divide-y divide-slate-100">
            {content.items.map((item, idx) => (
              <div key={idx} className={idx === 0 ? 'space-y-2' : 'pt-4 space-y-2'}>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {item.en}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pl-10">
                  <button
                    id={`btn-play-num-${idx}`}
                    onClick={() => speechManager.speak(item.en)}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                    title="문장 듣기"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>

                  <button
                    id={`btn-trans-num-${idx}`}
                    onClick={() => toggleTrans(`num-${idx}`)}
                    className={`p-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                      activeTranslations[`num-${idx}`]
                        ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                        : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:scale-105 active:scale-95'
                    }`}
                    title={activeTranslations[`num-${idx}`] ? '한국어 해석 닫기' : '한국어 번역 보기'}
                  >
                    <Languages className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>

                {activeTranslations[`num-${idx}`] && (
                  <div className="ml-10 p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium animate-fade-in">
                    {item.ko}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 4. CHOICE & COMPLETE QUIZ (PART 07) */}
        {content.type === 'choice_quiz' && content.items && (
          <div className="space-y-6 divide-y divide-slate-100">
            {content.items.map((item, idx) => (
              <div key={idx} className={idx === 0 ? 'space-y-3' : 'pt-5 space-y-3'}>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    {selectedAnswers[idx] !== undefined
                      ? item.sentence.replace('_____', `[ ${item.options[selectedAnswers[idx]]} ]`)
                      : item.sentence}
                  </p>
                </div>

                {/* Options pills */}
                <div className="flex items-center gap-2 pl-10 flex-wrap">
                  {item.options.map((opt: string, optIdx: number) => {
                    const isSelected = selectedAnswers[idx] === optIdx;
                    const isCorrect = optIdx === item.correctIndex;
                    return (
                      <button
                        key={optIdx}
                        id={`btn-choice-${idx}-${optIdx}`}
                        onClick={() => setSelectedAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                        className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                              : 'bg-rose-500 text-white shadow-md shadow-rose-200'
                            : 'bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pl-10">
                  <button
                    id={`btn-play-choice-${idx}`}
                    onClick={() => speechManager.speak(item.sentence.replace('_____', item.options[item.correctIndex]))}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                    title="정답 문장 듣기"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>

                  <button
                    id={`btn-trans-choice-${idx}`}
                    onClick={() => toggleTrans(`choice-${idx}`)}
                    className={`p-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                      activeTranslations[`choice-${idx}`]
                        ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                        : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:scale-105 active:scale-95'
                    }`}
                    title={activeTranslations[`choice-${idx}`] ? '한국어 해석 닫기' : '한국어 번역 보기'}
                  >
                    <Languages className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>

                {activeTranslations[`choice-${idx}`] && (
                  <div className="ml-10 p-2.5 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium animate-fade-in">
                    {item.meaning}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 5. QA PAIRS (PART 08) */}
        {content.type === 'qa_pairs' && content.items && (
          <div className="space-y-6">
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 font-semibold">
              현재 사용 중인 교재 없음 · 구조 정의용 시안
            </div>

            <div className="space-y-5 divide-y divide-slate-100">
              {content.items.map((item, idx) => (
                <div key={idx} className={idx === 0 ? 'space-y-3' : 'pt-5 space-y-3'}>
                  {/* Speaker A (Question) */}
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      A
                    </span>
                    <p className="text-base font-bold text-slate-900">{item.q}</p>
                  </div>

                  {/* Speaker B (Answer) */}
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#EAE8E3] text-slate-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      B
                    </span>
                    <p className="text-base font-bold text-slate-900">{item.a}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pl-10">
                    <button
                      id={`btn-play-qa-${idx}`}
                      onClick={() => speechManager.speak(`A: ${item.q}. B: ${item.a}`)}
                      className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                      title="Q&A 듣기"
                    >
                      <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
                    </button>

                    <button
                      id={`btn-trans-qa-${idx}`}
                      onClick={() => toggleTrans(`qa-${idx}`)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                        activeTranslations[`qa-${idx}`]
                          ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                          : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:scale-105 active:scale-95'
                      }`}
                      title={activeTranslations[`qa-${idx}`] ? '한국어 해석 닫기' : '한국어 번역 보기'}
                    >
                      <Languages className="w-3.5 h-3.5 stroke-[2.4]" />
                    </button>
                  </div>

                  {activeTranslations[`qa-${idx}`] && (
                    <div className="ml-10 p-3 bg-indigo-50/80 rounded-xl border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-medium space-y-1 animate-fade-in">
                      <p><strong>A:</strong> {item.qKo}</p>
                      <p><strong>B:</strong> {item.aKo}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SENTENCE INPUT PROMPTS (PART 09) */}
        {content.type === 'sentence_input_prompt' && content.items && (
          <div className="space-y-6 divide-y divide-slate-100">
            {content.items.map((item, idx) => (
              <div key={idx} className={idx === 0 ? 'space-y-3' : 'pt-5 space-y-3'}>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900">{item.prompt}</p>
                </div>

                {/* Example card */}
                <div className="ml-10 p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
                  <span className="text-xs font-bold text-indigo-700 block mb-1">예문</span>
                  <p className="text-sm font-semibold text-indigo-900">{item.example}</p>
                </div>

                {/* User sentence input field */}
                <div className="ml-10">
                  <div className="flex items-center gap-2 p-1.5 pl-4 border border-slate-200/90 rounded-2xl bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                    <input
                      type="text"
                      id={`input-my-sentence-${idx}`}
                      value={userInputs[`p9-${idx}`] || ''}
                      onChange={(e) => setUserInputs(prev => ({ ...prev, [`p9-${idx}`]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit(`p9-${idx}`)}
                      placeholder={item.placeholder}
                      className="flex-1 text-sm bg-transparent outline-hidden text-slate-800 placeholder-slate-400"
                    />
                    <button
                      id={`btn-submit-sentence-${idx}`}
                      onClick={() => handleInputSubmit(`p9-${idx}`)}
                      className="p-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl transition-colors cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {submittedInputs[`p9-${idx}`] && (
                    <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-900 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>작성한 문장: "{submittedInputs[`p9-${idx}`]}"</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. PATTERN INPUT PRACTICE (PART 10) */}
        {content.type === 'pattern_input_practice' && content.items && (
          <div className="space-y-6 divide-y divide-slate-100">
            {content.items.map((item, idx) => (
              <div key={idx} className={idx === 0 ? 'space-y-3' : 'pt-5 space-y-3'}>
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">{item.guideLabel}</span>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900">{item.patternGoal}</p>
                </div>

                {/* Example card */}
                <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
                  <span className="text-xs font-bold text-indigo-700 block mb-1">예문</span>
                  <p className="text-sm font-semibold text-indigo-900">{item.example}</p>
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 p-1.5 pl-4 border border-slate-200/90 rounded-2xl bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <input
                    type="text"
                    id={`input-pattern-${idx}`}
                    value={userInputs[`p10-${idx}`] || ''}
                    onChange={(e) => setUserInputs(prev => ({ ...prev, [`p10-${idx}`]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit(`p10-${idx}`)}
                    placeholder={item.placeholder}
                    className="flex-1 text-sm bg-transparent outline-hidden text-slate-800 placeholder-slate-400"
                  />
                  <button
                    id={`btn-submit-pattern-${idx}`}
                    onClick={() => handleInputSubmit(`p10-${idx}`)}
                    className="p-2 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {submittedInputs[`p10-${idx}`] && (
                  <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-medium text-emerald-900 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>작성한 문장: "{submittedInputs[`p10-${idx}`]}"</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 8. WORD WITH IMAGE (PART 12: Morning Objects) */}
        {content.type === 'word_with_image' && content.items && (
          <div className="space-y-6 divide-y divide-slate-100">
            {content.items.map((item, idx) => (
              <div key={idx} className={idx === 0 ? 'space-y-3' : 'pt-5 space-y-3'}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-slate-900">{item.word}</span>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">
                    {item.pos}
                  </span>
                  <span className="text-sm font-medium text-slate-600">{item.meaning}</span>
                </div>

                {/* Dotted border image placeholder */}
                <div className="w-full h-36 sm:h-44 rounded-2xl border-2 border-dashed border-indigo-200/80 bg-gradient-to-br from-indigo-50/20 via-slate-50/50 to-indigo-50/30 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <ImageIcon className="w-6 h-6 text-indigo-300" />
                  <span className="text-xs font-medium">{item.imagePlaceholder}</span>
                </div>

                {/* Example sentence card */}
                <div className="p-3.5 bg-[#F4F6FB] rounded-2xl space-y-1">
                  <p className="text-sm sm:text-base font-semibold text-slate-900">
                    {item.exampleEn}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-indigo-700">
                    {item.exampleKo}
                  </p>
                </div>

                {/* Audio button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id={`btn-play-word-img-${idx}`}
                    onClick={() => speechManager.speak(`${item.word}. ${item.exampleEn}`)}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                    title="단어 및 예문 듣기"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 9. PICTURE QA (PART 13: Describe the Picture) */}
        {content.type === 'picture_qa' && content.items && (
          <div className="space-y-5">
            {content.items.map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 block mb-1">{item.sectionLabel}</span>
                  <p className="text-base sm:text-lg font-bold text-slate-900">{item.instruction}</p>
                </div>

                {/* Image Placeholder */}
                <div className="w-full h-44 sm:h-52 rounded-2xl border-2 border-dashed border-indigo-200/80 bg-gradient-to-br from-indigo-50/20 via-slate-50/50 to-indigo-50/30 flex flex-col items-center justify-center gap-2 text-slate-400">
                  <ImageIcon className="w-7 h-7 text-indigo-300" />
                  <span className="text-xs font-medium">{item.imagePlaceholder}</span>
                </div>

                {/* Question Section */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-400 block mb-1">{item.questionLabel}</span>
                  <p className="text-base sm:text-lg font-bold text-slate-900">{item.question}</p>
                </div>

                {/* Answer Guide */}
                <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-indigo-700 block">{item.guideLabel}</span>
                  <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
                    {item.guideText}
                  </p>
                </div>

                {/* Teacher Guide Model Answer */}
                <div className="p-4 bg-[#FFF8EE] border border-amber-200/70 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-amber-800 block">{item.tgLabel}</span>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    {item.tgAnswer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    id={`btn-play-picture-${idx}`}
                    onClick={() => speechManager.speak(`${item.question}. ${item.tgAnswer}`)}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                    title="질문 및 모범 답안 듣기"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>

                  <button
                    id={`btn-trans-picture-${idx}`}
                    onClick={() => toggleTrans(`picture-${idx}`)}
                    className={`p-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                      activeTranslations[`picture-${idx}`]
                        ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                        : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:scale-105 active:scale-95'
                    }`}
                    title={activeTranslations[`picture-${idx}`] ? '한국어 해석 닫기' : '한국어 번역 보기'}
                  >
                    <Languages className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 10. PHONE SURVEY (PART 14) */}
        {content.type === 'phone_survey' && content.surveyIntro && (
          <div className="space-y-4">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {content.surveyIntro.promptEn}
            </p>

            {/* Dotted border image box */}
            <div className="w-full h-36 sm:h-44 rounded-2xl border-2 border-dashed border-indigo-200/80 bg-gradient-to-br from-indigo-50/20 via-slate-50/50 to-indigo-50/30 flex flex-col items-center justify-center gap-2 text-slate-400">
              <ImageIcon className="w-6 h-6 text-indigo-300" />
              <span className="text-xs font-medium">등록된 이미지 노출 영역</span>
            </div>

            {/* Actions for hidden text */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="btn-play-survey"
                onClick={() => speechManager.speak(content.surveyIntro!.speakerEn)}
                className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                title="듣기"
              >
                <Volume2 className="w-3.5 h-3.5 stroke-[2.4]" />
              </button>

              <button
                id="btn-toggle-hidden-survey"
                onClick={() => setShowHiddenText(!showHiddenText)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                  showHiddenText
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-[#F9F7F2] border-[#E8E4D9] text-slate-700 hover:bg-slate-100'
                }`}
              >
                {showHiddenText ? '숨김 텍스트 닫기' : '숨김 텍스트'}
              </button>

              <button
                id="btn-trans-survey"
                onClick={() => toggleTrans('survey-intro')}
                className={`p-1.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                  activeTranslations['survey-intro']
                    ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                    : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:scale-105 active:scale-95'
                }`}
                title="번역 보기"
              >
                <Languages className="w-3.5 h-3.5 stroke-[2.4]" />
              </button>
            </div>

            {/* Hidden dialogue bubble box */}
            {showHiddenText && (
              <div className="p-4 bg-[#F9F8F5] border border-[#EBE7DE] rounded-2xl text-sm sm:text-base font-semibold text-slate-800 animate-fade-in">
                {content.surveyIntro.speakerEn}
              </div>
            )}

            {/* Question section */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">질문</span>
                <p className="text-base sm:text-lg font-bold text-slate-900">{content.surveyIntro.questionEn}</p>
              </div>

              {/* Guide */}
              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-indigo-700 block">답변 가이드</span>
                <p className="text-xs sm:text-sm text-indigo-900 font-medium">
                  {content.surveyIntro.guide}
                </p>
              </div>

              {/* Model answer */}
              <div className="p-4 bg-[#FFF8EE] border border-amber-200/70 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-amber-800 block">답변 TG · 강사 전용</span>
                <p className="text-xs sm:text-sm text-amber-950 font-medium">
                  {content.surveyIntro.modelAnswerEn}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
