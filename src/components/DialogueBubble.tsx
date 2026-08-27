import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DialogueSentence } from '../types';
import { InlineActionButtons } from './InlineActionButtons';
import { User } from 'lucide-react';

interface DialogueBubbleProps {
  sentence: DialogueSentence;
  isPlaying: boolean;
  onPlayAudio: (sentence: DialogueSentence) => void;
  isTeacherGuideActive?: boolean;
  isGlobalTranslationOpen?: boolean;
}

export const DialogueBubble: React.FC<DialogueBubbleProps> = ({
  sentence,
  isPlaying,
  onPlayAudio,
  isTeacherGuideActive = false,
  isGlobalTranslationOpen = false,
}) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const isTutor = sentence.speaker === 'tutor';
  const isTransOpen = isGlobalTranslationOpen || showTranslation;

  return (
    <div
      id={`dialogue-turn-${sentence.id}`}
      className={`group relative flex w-full my-3.5 transition-all ${
        isTutor ? 'justify-start' : 'justify-end'
      }`}
    >
      <div
        className={`flex flex-col w-full max-w-[94%] sm:max-w-[88%] md:max-w-[82%] ${
          isTutor ? 'items-start' : 'items-end'
        }`}
      >
        {/* Top Header: Avatar (Person Icon) + Name */}
        <div
          className={`flex items-center gap-2 mb-1.5 px-0.5 ${
            isTutor ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-2xs ${
              isTutor
                ? 'bg-[#EEEDFC] text-[#5D4BE2] border border-[#5D4BE2]/20'
                : 'bg-stone-100 text-stone-700 border border-stone-300/80'
            }`}
          >
            <User className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-xs sm:text-[13px] font-bold text-slate-700 tracking-tight">
            {sentence.speakerName}
          </span>
        </div>

        {/* Indented Container for Bubble & Action Buttons */}
        <div
          className={`w-full flex flex-col ${
            isTutor ? 'pl-9 sm:pl-10 items-start' : 'pr-9 sm:pr-10 items-end'
          }`}
        >
          {/* Main Speech Bubble */}
          <div
            className={`relative rounded-2xl p-4 sm:p-5 transition-all shadow-2xs w-full ${
              isTutor
                ? 'bg-[#F7F6FD] border border-[#E8E4FC] rounded-tl-xs text-slate-900'
                : 'bg-white border border-stone-200/90 rounded-tr-xs text-slate-900 hover:border-stone-300'
            } ${
              isPlaying
                ? 'ring-2 ring-[#5D4BE2] shadow-xs'
                : ''
            }`}
          >
            {/* English Dialogue Text */}
            <p className="text-[15px] sm:text-base leading-relaxed tracking-tight font-semibold text-slate-800">
              {sentence.en}
            </p>

            {/* Korean Translation Accordion */}
            <AnimatePresence>
              {isTransOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`mt-2.5 pt-2.5 text-xs sm:text-[13px] border-t leading-relaxed font-normal ${
                      isTutor
                        ? 'border-[#E8E4FC] text-[#5D4BE2]'
                        : 'border-stone-100 text-stone-600'
                    }`}
                  >
                    <p>{sentence.ko}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons (Translation Toggle & Audio Soundwave) placed below the bubble */}
          <div
            className={`mt-1.5 flex items-center px-1 ${
              isTutor ? 'justify-start' : 'justify-end'
            }`}
          >
            <InlineActionButtons
              idPrefix={`dialogue-${sentence.id}`}
              onSpeak={() => onPlayAudio(sentence)}
              isPlaying={isPlaying}
              onToggleTrans={() => setShowTranslation(!showTranslation)}
              isTransOpen={isTransOpen}
              hasTranslation={true}
              isTutorBubble={isTutor}
            />
          </div>

          {/* Optional Teacher Guide Prompt for Tutors */}
          {isTeacherGuideActive && sentence.tgNote && (
            <div className="mt-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5 max-w-full">
              <span className="font-bold text-amber-700 bg-amber-200/80 px-1.5 py-0.5 rounded text-[10px]">
                TG
              </span>
              <p className="leading-snug">{sentence.tgNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

