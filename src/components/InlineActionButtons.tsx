import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Languages } from 'lucide-react';

interface InlineActionButtonsProps {
  idPrefix?: string;
  onSpeak: () => void;
  isPlaying: boolean;
  onToggleTrans?: () => void;
  isTransOpen?: boolean;
  hasTranslation?: boolean;
  extraButton?: React.ReactNode;
  isTutorBubble?: boolean;
}

export const InlineActionButtons: React.FC<InlineActionButtonsProps> = ({
  idPrefix = 'action',
  onSpeak,
  isPlaying,
  onToggleTrans,
  isTransOpen = false,
  hasTranslation = true,
  extraButton,
}) => {
  // Idle color: #8C8272, Active/Pressed color: Purple (#7C3AED / #6D28D9)
  const IDLE_COLOR = '#8C8272';
  const ACTIVE_COLOR = '#7C3AED';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 select-none">
      {/* Translation (Languages) Icon Button */}
      {hasTranslation && onToggleTrans && (
        <motion.button
          id={`btn-trans-${idPrefix}`}
          type="button"
          onClick={onToggleTrans}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 450, damping: 17 }}
          style={{
            color: isTransOpen ? ACTIVE_COLOR : IDLE_COLOR,
          }}
          className="p-1 flex items-center justify-center cursor-pointer transition-colors duration-150 relative bg-transparent border-0 outline-none"
          title={isTransOpen ? '한국어 해석 닫기' : '한국어 번역 보기'}
        >
          <Languages className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[2.2]" />

          {/* Active subtle dot indicator */}
          {isTransOpen && (
            <motion.span
              layoutId={`dot-${idPrefix}`}
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
              style={{ backgroundColor: ACTIVE_COLOR }}
            />
          )}
        </motion.button>
      )}

      {/* Audio Button: Volume2 in idle, Animated Equalizer Wave when playing */}
      <motion.button
        id={`btn-audio-${idPrefix}`}
        type="button"
        onClick={onSpeak}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 450, damping: 17 }}
        style={{
          color: isPlaying ? ACTIVE_COLOR : IDLE_COLOR,
        }}
        className="p-1 flex items-center justify-center cursor-pointer transition-colors duration-150 bg-transparent border-0 outline-none"
        title={isPlaying ? '재생 중...' : '원어민 발음 듣기'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            /* Animated Equalizer Wave Soundgraph in Purple */
            <motion.div
              key="soundwave"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="flex items-end gap-[2.5px] h-[18px] sm:h-5 px-0.5"
            >
              <motion.span
                animate={{ height: ['4px', '14px', '6px', '13px', '4px'] }}
                transition={{ repeat: Infinity, duration: 0.55, ease: 'easeInOut' }}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: ACTIVE_COLOR }}
              />
              <motion.span
                animate={{ height: ['10px', '18px', '7px', '16px', '10px'] }}
                transition={{ repeat: Infinity, duration: 0.45, delay: 0.08, ease: 'easeInOut' }}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: ACTIVE_COLOR }}
              />
              <motion.span
                animate={{ height: ['5px', '15px', '12px', '5px', '15px'] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.15, ease: 'easeInOut' }}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: ACTIVE_COLOR }}
              />
            </motion.div>
          ) : (
            /* Standard Speaker Icon (Volume2) in #8C8272 */
            <motion.div
              key="speaker"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <Volume2 className="w-[18px] h-[18px] sm:w-5 sm:h-5 stroke-[2.2]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {extraButton}
    </div>
  );
};

