import React from 'react';
import { SignalStrength } from '../types/trade';
import { Zap } from 'lucide-react';

interface SignalBadgeProps {
  strength: SignalStrength;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const SignalBadge: React.FC<SignalBadgeProps> = ({
  strength,
  label,
  size = 'md',
  showIcon = false,
}) => {
  const getBadgeStyle = () => {
    switch (strength) {
      case 'High':
        return 'bg-purple-950/70 text-purple-300 border-purple-800/60';
      case 'Medium':
        return 'bg-blue-950/70 text-blue-300 border-blue-800/60';
      case 'Low':
      default:
        return 'bg-slate-800/70 text-slate-300 border-slate-700/60';
    }
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-tight',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-tight',
    lg: 'text-sm px-3 py-1.5 font-bold tracking-tight',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border whitespace-nowrap select-none ${getBadgeStyle()} ${sizeClasses[size]}`}
    >
      {showIcon && <Zap className="w-3 h-3 text-current shrink-0" />}
      <span>{label || `${strength} Signal`}</span>
    </span>
  );
};
