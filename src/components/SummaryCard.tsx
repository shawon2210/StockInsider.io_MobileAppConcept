import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  variant?: 'neutral' | 'purchase' | 'sale' | 'accent';
  onClick?: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  id,
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'neutral',
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'purchase':
        return {
          iconColor: 'text-emerald-400',
          iconBg: 'bg-emerald-500/10',
          borderColor: 'border-emerald-900/30 hover:border-emerald-700/50',
        };
      case 'sale':
        return {
          iconColor: 'text-red-400',
          iconBg: 'bg-red-500/10',
          borderColor: 'border-red-900/30 hover:border-red-700/50',
        };
      case 'accent':
        return {
          iconColor: 'text-purple-400',
          iconBg: 'bg-purple-500/10',
          borderColor: 'border-purple-900/30 hover:border-purple-700/50',
        };
      case 'neutral':
      default:
        return {
          iconColor: 'text-sky-400',
          iconBg: 'bg-sky-500/10',
          borderColor: 'border-slate-800 hover:border-slate-700',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      id={id}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative bg-[#172033] rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 ${styles.borderColor} ${
        onClick ? 'cursor-pointer active:scale-[0.98]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-medium text-slate-400 tracking-tight">
          {title}
        </span>
        <div className={`p-1.5 rounded-lg ${styles.iconBg}`}>
          <Icon className={`w-4 h-4 ${styles.iconColor}`} />
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-0.5">
        {value}
      </div>
      <p className="text-[11px] text-slate-400 truncate">
        {subtitle}
      </p>
    </div>
  );
};
