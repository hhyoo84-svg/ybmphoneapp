import React from 'react';
import { ActionStyleType, DisplayMode } from '../types';
import { Layers, Sparkles, Check, Info, Sliders, Eye } from 'lucide-react';

interface DesignStyleSwitcherProps {
  currentStyle: ActionStyleType;
  onChangeStyle: (style: ActionStyleType) => void;
  displayMode: DisplayMode;
  onChangeDisplayMode: (mode: DisplayMode) => void;
  showComparisonDrawer: boolean;
  onToggleComparisonDrawer: () => void;
}

export const DesignStyleSwitcher: React.FC<DesignStyleSwitcherProps> = ({
  currentStyle,
  onChangeStyle,
  displayMode,
  onChangeDisplayMode,
  showComparisonDrawer,
  onToggleComparisonDrawer,
}) => {
  const styles: {
    id: ActionStyleType;
    label: string;
    ver: string;
    description: string;
    badge?: string;
  }[] = [
    {
      id: 'solid_tint',
      ver: 'VER 3',
      label: '채워진 솔리드 틴트',
      description: '부드러운 파스텔 배경으로 터치 영역 확보 및 높은 시인성 (추천)',
      badge: '추천 디자인',
    },
    {
      id: 'bubble_dock',
      ver: 'VER 4',
      label: '말풍선 일체형 독',
      description: '말풍선 하단에 디바이더와 함께 내장되어 어색한 공백 제거',
      badge: '가장 깔끔함',
    },
    {
      id: 'outline',
      ver: 'VER 2',
      label: '라인 (아웃라인)',
      description: '단정한 1px 라인과 아이콘+텍스트로 모던한 앱 스타일',
    },
    {
      id: 'smart_chips',
      ver: 'VER 5',
      label: '인터랙티브 스마트 칩',
      description: '기능별 텍스트 라벨과 칩 형태를 결합하여 학습자 접근성 극대화',
    },
    {
      id: 'minimal',
      ver: 'VER 1',
      label: '스마트 미니멀',
      description: '간결한 아이콘 중심 + 파형 인터랙션 피드백',
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md border-y md:border md:rounded-2xl border-slate-200/80 p-3 sm:p-4 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">UI/UX 시안 비교기</span>
              <span className="text-xs text-slate-400">· 버튼 스타일 실시간 변경</span>
            </div>
            <p className="text-xs text-slate-600">
              말풍선 하단 아이콘 버튼의 5가지 시안을 선택하여 실시간으로 적용해보세요.
            </p>
          </div>
        </div>

        {/* Visibility mode toggle */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-medium text-slate-600">
            <button
              id="btn-display-always"
              onClick={() => onChangeDisplayMode('always')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                displayMode === 'always'
                  ? 'bg-white text-indigo-700 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              항상 표시
            </button>
            <button
              id="btn-display-hover"
              onClick={() => onChangeDisplayMode('hover')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                displayMode === 'hover'
                  ? 'bg-white text-indigo-700 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              마우스 호버 시에만
            </button>
          </div>
        </div>
      </div>

      {/* Style selector pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-3 pt-3 border-t border-slate-100">
        {styles.map((style) => {
          const isSelected = currentStyle === style.id;
          return (
            <button
              key={style.id}
              id={`btn-select-style-${style.id}`}
              onClick={() => onChangeStyle(style.id)}
              className={`p-2.5 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 shadow-xs ring-1 ring-indigo-500'
                  : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{style.ver}</span>
                  {style.badge && (
                    <span className="text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.2 rounded-full">
                      {style.badge}
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs sm:text-[13px] leading-tight text-slate-900">
                  {style.label}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-snug">
                {style.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
