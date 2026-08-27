import React from 'react';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

export type DeviceViewMode = 'responsive' | 'mobile' | 'tablet';

interface DeviceModeSelectorProps {
  deviceMode: DeviceViewMode;
  onChangeDeviceMode: (mode: DeviceViewMode) => void;
}

export const DeviceModeSelector: React.FC<DeviceModeSelectorProps> = ({
  deviceMode,
  onChangeDeviceMode,
}) => {
  return (
    <div className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-xs">
      <button
        id="btn-device-responsive"
        onClick={() => onChangeDeviceMode('responsive')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          deviceMode === 'responsive'
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title="PC/태블릿 가변 화면 (반응형 뷰어)"
      >
        <Tablet className="w-3.5 h-3.5" />
        <span>태블릿 가변 뷰 (기본)</span>
      </button>

      <button
        id="btn-device-mobile"
        onClick={() => onChangeDeviceMode('mobile')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          deviceMode === 'mobile'
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title="스마트폰 화면 (390px 1:1 시뮬레이션)"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>모바일 뷰 (390px)</span>
      </button>

      <button
        id="btn-device-tablet"
        onClick={() => onChangeDeviceMode('tablet')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          deviceMode === 'tablet'
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`}
        title="태블릿 고정 프레임 뷰 (768px)"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>태블릿 프레임 (768px)</span>
      </button>
    </div>
  );
};
