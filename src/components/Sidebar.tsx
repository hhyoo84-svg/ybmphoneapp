import React from 'react';
import { LessonPart } from '../types';
import { CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';

interface SidebarProps {
  parts: LessonPart[];
  activePartId: number;
  onSelectPart: (partId: number) => void;
  completedPartIds: number[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  parts,
  activePartId,
  onSelectPart,
  completedPartIds,
}) => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-xs sticky top-24">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">PART LIST</span>
          <div className="flex items-center gap-1 font-mono text-xs font-bold">
            <span className="text-indigo-600">{activePartId}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">{parts.length}</span>
          </div>
        </div>

        {/* List of 14 Parts */}
        <nav className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {parts.map((part) => {
            const isActive = part.id === activePartId;
            const isCompleted = completedPartIds.includes(part.id);

            return (
              <button
                key={part.id}
                id={`sidebar-part-btn-${part.id}`}
                onClick={() => onSelectPart(part.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {/* Status indicator dot */}
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      isActive
                        ? 'bg-indigo-600 ring-4 ring-indigo-200'
                        : isCompleted
                        ? 'bg-emerald-500'
                        : 'bg-slate-300'
                    }`}
                  />
                  <span className="text-xs sm:text-[13px] truncate">{part.title}</span>
                </div>

                {isActive && (
                  <span className="w-1.5 h-4 bg-indigo-600 rounded-full flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
