/**
 * components/FilterChip.tsx
 * Author: Shawon — github.com/shawon2210
 *
 * Reusable touchable filter chip.
 * I enforced a minimum touch target of 40px (min-h-[40px]) to meet mobile
 * accessibility guidelines, along with aria-pressed for screen reader state.
 */

import React from 'react';


interface FilterChipProps {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  activeColor?: 'sky' | 'emerald' | 'rose' | 'purple';
}

export const FilterChip: React.FC<FilterChipProps> = ({
  id,
  label,
  active,
  onClick,
  icon,
  activeColor = 'sky',
}) => {
  const getActiveStyles = () => {
    if (!active) {
      return 'bg-[#1E293B] text-slate-300 border-slate-700/60 hover:border-slate-600 hover:text-slate-100';
    }

    switch (activeColor) {
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 font-semibold shadow-xs';
      case 'rose':
        return 'bg-red-500/20 text-red-300 border-red-500/60 font-semibold shadow-xs';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/60 font-semibold shadow-xs';
      case 'sky':
      default:
        return 'bg-sky-500/20 text-sky-300 border-sky-500/60 font-semibold shadow-xs';
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm border transition-all duration-150 cursor-pointer whitespace-nowrap active:scale-95 ${getActiveStyles()}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  );
};
