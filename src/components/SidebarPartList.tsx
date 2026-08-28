import React from 'react';
import { LessonPart } from '../types';

interface SidebarPartListProps {
  parts: LessonPart[];
  activePartId: number;
  completedPartIds: number[];
  onSelectPart: (partId: number) => void;
}

export const SidebarPartList: React.FC<SidebarPartListProps> = ({
  parts,
  activePartId,
  onSelectPart,
}) => {
  return (
    <aside 
      id="sidebar-part-list"
      className="w-64 lg:w-72 bg-white rounded-3xl border border-stone-200/80 p-5 shadow-xs flex flex-col flex-shrink-0 self-start sticky top-20 select-none"
    >
      {/* Header: PART LIST and Progress Index (e.g. 8 / 14) */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-3 px-1">
        <span className="text-xs font-extrabold tracking-wider text-stone-400 uppercase">
          PART LIST
        </span>
        <div className="text-xs font-bold flex items-center gap-1">
          <span className="text-[#5D4BE2] font-black text-sm">{activePartId}</span>
          <span className="text-stone-400 font-semibold">/</span>
          <span className="text-stone-400 font-semibold">{parts.length}</span>
        </div>
      </div>

      {/* Vertical Parts List with Clear Part Type Labels */}
      <nav className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 custom-scrollbar">
        {parts.map((p) => {
          const isActive = p.id === activePartId;

          return (
            <button
              key={p.id}
              id={`sidebar-part-${p.id}`}
              type="button"
              onClick={() => onSelectPart(p.id)}
              className={`w-full text-left py-2 px-2.5 rounded-2xl flex items-center justify-between gap-2 transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#EEEDFC] text-[#5D4BE2] font-bold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Status Dot */}
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#5D4BE2] ring-2 ring-[#5D4BE2]/20'
                      : 'bg-[#E3DED6]'
                  }`}
                />

                {/* Part Title */}
                <span className="text-[13px] leading-tight truncate">
                  {p.title}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
