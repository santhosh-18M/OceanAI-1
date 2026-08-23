import { useEffect, useState } from 'react';
import {
  type LucideIcon,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Wind,
  Waves,
  Eye,
  Gauge,
  Navigation,
  Activity,
} from 'lucide-react';

/* ---------- Card ---------- */
export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={`card ${hover ? 'card-hover' : ''} ${className}`}>{children}</div>;
}

export function CardHeader({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between p-5 pb-0">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600">
            <Icon className="h-5 w-5" strokeWidth={2.2} />
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-ocean-900">{title}</h3>
          {subtitle && <p className="text-xs text-ocean-700/60">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ---------- Badge ---------- */
type BadgeVariant = 'safe' | 'warning' | 'danger' | 'info' | 'neutral';

const badgeStyles: Record<BadgeVariant, string> = {
  safe: 'bg-success-50 text-success-600 ring-1 ring-success-100',
  warning: 'bg-warning-50 text-warning-600 ring-1 ring-warning-100',
  danger: 'bg-danger-50 text-danger-600 ring-1 ring-danger-100',
  info: 'bg-ocean-50 text-ocean-600 ring-1 ring-ocean-100',
  neutral: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
};

export function Badge({
  variant = 'neutral',
  children,
  className = '',
}: {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`stat-pill ${badgeStyles[variant]} ${className}`}>{children}</span>
  );
}

/* ---------- StatusDot ---------- */
export function StatusDot({ status }: { status: 'safe' | 'warning' | 'danger' }) {
  const colors = {
    safe: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
  };
  const ring = {
    safe: 'ring-success-200',
    warning: 'ring-warning-200',
    danger: 'ring-danger-200',
  };
  return (
    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${colors[status]} ring-2 ${ring[status]}`}>
      {status !== 'safe' && (
        <span className={`absolute inset-0 rounded-full ${colors[status]} animate-pulse-ring`} />
      )}
    </span>
  );
}

/* ---------- ProgressRing ---------- */
export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 6,
  color = '#0ea5e9',
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e0f2fe" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        {label && <span className="text-sm font-bold text-ocean-900">{label}</span>}
        {sublabel && <span className="text-[10px] text-ocean-700/50">{sublabel}</span>}
      </div>
    </div>
  );
}

/* ---------- Sparkline ---------- */
export function Sparkline({
  data,
  color = '#0ea5e9',
  width = 120,
  height = 36,
  filled = true,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  filled?: boolean;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = height - ((d - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const pathD = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaD = `${pathD} L${width},${height} L0,${height} Z`;
  const id = `spark-${color.replace('#', '')}`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      {filled && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaD} fill={`url(#${id})`} />
        </>
      )}
      <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={3} fill={color} />
    </svg>
  );
}

/* ---------- TrendIndicator ---------- */
export function TrendIndicator({ trend, value }: { trend: 'up' | 'down' | 'stable'; value?: string }) {
  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const color =
    trend === 'up' ? 'text-success-600 bg-success-50' : trend === 'down' ? 'text-danger-600 bg-danger-50' : 'text-ocean-600 bg-ocean-50';
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold ${color}`}>
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {value}
    </span>
  );
}

/* ---------- Battery ---------- */
export function BatteryBar({ level }: { level: number }) {
  const color = level > 50 ? 'bg-success-500' : level > 20 ? 'bg-warning-500' : 'bg-danger-500';
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-ocean-100 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${level}%` }} />
      </div>
      <span className="text-xs font-semibold text-ocean-700">{level}%</span>
    </div>
  );
}

/* ---------- SignalBars ---------- */
export function SignalBars({ strength }: { strength: number }) {
  const bars = 4;
  const active = Math.ceil((strength / 100) * bars);
  return (
    <div className="flex items-end gap-0.5">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm transition-all ${i < active ? 'bg-ocean-500' : 'bg-ocean-100'}`}
          style={{ height: `${(i + 1) * 3 + 3}px` }}
        />
      ))}
    </div>
  );
}

/* ---------- WeatherIcon ---------- */
const weatherIcons: Record<string, LucideIcon> = {
  wind: Wind,
  waves: Waves,
  eye: Eye,
  gauge: Gauge,
  navigation: Navigation,
  activity: Activity,
};

export function WeatherIcon({ name, className = '' }: { name: string; className?: string }) {
  const Icon = weatherIcons[name] ?? Activity;
  return <Icon className={className} strokeWidth={2} />;
}

/* ---------- CountUp ---------- */
export function CountUp({ end, duration = 1200, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  const display = end % 1 === 0 ? Math.round(val).toString() : val.toFixed(1);
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ---------- AlertIcon ---------- */
export function AlertIcon({ level, className = '' }: { level: 'info' | 'warning' | 'danger'; className?: string }) {
  if (level === 'danger' || level === 'warning') {
    return <AlertTriangle className={className} strokeWidth={2.2} />;
  }
  return <Activity className={className} strokeWidth={2.2} />;
}

/* ---------- LivePulse ---------- */
export function LivePulse({ label = 'LIVE' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-danger-600">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger-500" />
      </span>
      {label}
    </span>
  );
}

/* ---------- SectionTitle ---------- */
export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5 animate-slide-up">
      <h2 className="text-xl font-extrabold tracking-tight text-ocean-900">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-ocean-700/60">{subtitle}</p>}
    </div>
  );
}
