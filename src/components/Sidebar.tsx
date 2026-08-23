import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  CloudSun,
  Fish,
  TrendingUp,
  Map,
  Waves,
  LifeBuoy,
} from 'lucide-react';
import type { ViewId } from '@/types';

interface NavItem {
  id: ViewId;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Fisherman Dashboard', icon: LayoutDashboard },
  { id: 'family', label: 'Family Tracking', icon: Users },
  { id: 'border', label: 'Sri Lanka Border Alert', icon: ShieldAlert, badge: '1' },
  { id: 'weather', label: 'Sea Weather Intelligence', icon: CloudSun },
  { id: 'recommend', label: 'Fish Recommendation', icon: Fish },
  { id: 'map', label: 'Live Map', icon: Map, badge: 'LIVE' },
];

export function Sidebar({
  active,
  onSelect,
}: {
  active: ViewId;
  onSelect: (id: ViewId) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-ocean-100/80 bg-white/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-ocean-gradient shadow-glow">
          <Waves className="h-6 w-6 text-white" strokeWidth={2.5} />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-abyss-400 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-abyss-500 ring-2 ring-white" />
          </span>
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-ocean-900">OceanAI</h1>
          <p className="text-[10px] font-medium tracking-wide text-ocean-700/50">MARINE INTELLIGENCE</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        <p className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`nav-item w-full text-left ${isActive ? 'nav-item-active' : ''}`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.2} />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge === 'LIVE' ? (
                <span className="inline-flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger-500" />
                </span>
              ) : item.badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* SOS Footer */}
      <div className="p-3">
        <div className="rounded-2xl border border-danger-100 bg-gradient-to-br from-danger-50 to-white p-4">
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-danger-600" strokeWidth={2.5} />
            <span className="text-xs font-bold text-danger-700">Emergency Ready</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-ocean-700/60">
            Coast Guard linked. SOS broadcasts on VHF Ch.16 + satellite.
          </p>
        </div>
      </div>
    </aside>
  );
}
