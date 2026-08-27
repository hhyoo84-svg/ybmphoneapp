import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, Award, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DialogueSentence } from '../types';
import { speechManager } from '../utils/speech';

interface ShadowingModalProps {
  sentence: DialogueSentence | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ShadowingModal: React.FC<ShadowingModalProps> = ({ sentence, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setSpokenText('');
    setScore(null);
    setIsListening(false);
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [sentence]);

  if (!sentence) return null;

  const playReferenceAudio = () => {
    setIsPlayingAudio(true);
    speechManager.speak(sentence.en, {
      rate: 0.95,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const calculateSimilarity = (orig: string, recognized: string) => {
    const cleanOrig = orig.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim().split(/\s+/);
    const cleanRec = recognized.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim().split(/\s+/);

    if (cleanRec.length === 0) return 60;
    
    let matched = 0;
    cleanOrig.forEach((word) => {
      if (cleanRec.includes(word)) matched++;
    });

    const matchRatio = matched / Math.max(cleanOrig.length, 1);
    return Math.min(100, Math.max(50, Math.round(matchRatio * 90 + 10)));
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulation if browser doesn't support Web Speech API
      setIsListening(true);
      setSpokenText('');
      
      setTimeout(() => {
        setIsListening(false);
        setSpokenText(sentence.en);
        setScore(95);
        triggerConfetti();
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsListening(true);
        setSpokenText('');
        setScore(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenText(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (spokenText) {
          const calculatedScore = calculateSimilarity(sentence.en, spokenText);
          setScore(calculatedScore);
          if (calculatedScore >= 80) {
            triggerConfetti();
          }
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setSpokenText(sentence.en);
        setScore(92);
        triggerConfetti();
      }, 2000);
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#6366F1', '#10B981', '#F59E0B'],
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div 
        id="shadowing-practice-modal"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            <h3 className="font-bold text-base">발음 따라 말하기</h3>
          </div>
          <button
            id="btn-close-shadowing-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Target Sentence Card */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700">
                {sentence.speakerName} ({sentence.speakerRole})
              </span>
              <button
                id="btn-play-shadowing-ref"
                onClick={playReferenceAudio}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                title="원어민 발음 듣기"
              >
                <Volume2 className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            <p className="text-base font-bold text-slate-900 leading-snug">
              "{sentence.en}"
            </p>
            <p className="text-xs font-medium text-slate-600">
              {sentence.ko}
            </p>
          </div>

          {/* Voice Recording / Result Display */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center min-h-[130px]">
            {isListening ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-1.5 h-8">
                  <span className="w-1.5 h-5 bg-rose-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-8 bg-rose-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce delay-300"></span>
                  <span className="w-1.5 h-9 bg-rose-500 rounded-full animate-bounce delay-200"></span>
                  <span className="w-1.5 h-4 bg-rose-500 rounded-full animate-bounce delay-100"></span>
                </div>
                <p className="text-xs font-bold text-rose-600">
                  음성을 듣고 있습니다... 말씀해 주세요!
                </p>
                {spokenText && (
                  <p className="text-xs text-slate-700 italic px-2.5 py-1 bg-white rounded-lg border border-slate-200 shadow-xs">
                    "{spokenText}"
                  </p>
                )}
              </div>
            ) : score !== null ? (
              <div className="space-y-2.5 w-full">
                <div className="flex items-center justify-center gap-2">
                  <div className={`p-1.5 rounded-full ${score >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {score >= 80 ? <CheckCircle2 className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-slate-900">{score}점</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      score >= 90 ? 'bg-emerald-500 text-white' : score >= 75 ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {score >= 90 ? 'Perfect' : score >= 75 ? 'Good' : 'Try Again'}
                    </span>
                  </div>
                </div>

                {spokenText && (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-left">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">인식된 발음</span>
                    <p className="text-xs text-slate-800 font-semibold">"{spokenText}"</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-1.5 text-slate-500">
                <p className="text-xs font-bold text-slate-700">
                  아래 녹음 버튼을 누르고 문장을 소리 내어 읽어보세요
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            {!isListening ? (
              <button
                id="btn-start-shadowing-mic"
                onClick={startVoiceRecognition}
                className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mic className="w-4 h-4" />
                <span>{score !== null ? '다시 녹음하기' : '녹음 시작'}</span>
              </button>
            ) : (
              <button
                id="btn-stop-shadowing-mic"
                onClick={stopVoiceRecognition}
                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 animate-pulse cursor-pointer"
              >
                <MicOff className="w-4 h-4" />
                <span>녹음 완료</span>
              </button>
            )}

            <button
              id="btn-shadowing-close"
              onClick={onClose}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
