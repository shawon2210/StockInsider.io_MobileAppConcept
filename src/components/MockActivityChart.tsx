import React from 'react';
import { Activity } from 'lucide-react';

interface MockActivityChartProps {
  data: number[];
  tradeType: 'purchase' | 'sale';
  ticker: string;
}

export const MockActivityChart: React.FC<MockActivityChartProps> = ({
  data,
  tradeType,
  ticker,
}) => {
  const points = data.length > 0 ? data : [20, 25, 22, 38, 50, 68, 85];
  const max = Math.max(...points) * 1.15;
  const min = Math.min(...points) * 0.85;
  const range = max - min || 1;

  // 7 days labels
  const days = ['Day -6', 'Day -5', 'Day -4', 'Day -3', 'Day -2', 'Yesterday', 'Filing'];

  // SVG coordinates: width 320, height 120
  const width = 320;
  const height = 120;
  const paddingX = 16;
  const paddingY = 16;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const coords = points.map((val, idx) => {
    const x = paddingX + (idx / (points.length - 1)) * chartWidth;
    const y = height - paddingY - ((val - min) / range) * chartHeight;
    return { x, y, val };
  });

  const pathD = coords.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    // Smooth bezier curve
    const prev = coords[idx - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - paddingY} L ${coords[0].x} ${height - paddingY} Z`;

  const strokeColor = tradeType === 'purchase' ? '#22C55E' : '#F97316';
  const gradientId = `chart-gradient-${ticker}-${tradeType}`;

  return (
    <div className="bg-[#172033] border border-slate-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
            Mock 7-day activity
          </h4>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
          Normalized index
        </span>
      </div>

      {/* SVG Chart */}
      <div className="w-full relative overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={strokeColor}
                stopOpacity={tradeType === 'purchase' ? 0.35 : 0.25}
              />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Horizontal grid guide lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#1E293B"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#1E293B"
            strokeDasharray="3 3"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#2A364F"
          />

          {/* Area fill */}
          <path d={areaD} fill={`url(#${gradientId})`} />

          {/* Line stroke */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {coords.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={i === coords.length - 1 ? 4.5 : 2.5}
              fill={i === coords.length - 1 ? strokeColor : '#0B1220'}
              stroke={strokeColor}
              strokeWidth={i === coords.length - 1 ? 2.5 : 1.5}
            />
          ))}
        </svg>

        {/* X-Axis labels */}
        <div className="flex justify-between items-center mt-2 px-1 text-[10px] text-slate-400 font-mono">
          <span>{days[0]}</span>
          <span>{days[3]}</span>
          <span className="text-slate-300 font-medium">{days[6]} (Trade)</span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Trend: {tradeType === 'purchase' ? 'Accumulation pattern' : 'Dispersal pattern'}</span>
        <span className="italic text-slate-400">Fictional trendline</span>
      </div>
    </div>
  );
};
