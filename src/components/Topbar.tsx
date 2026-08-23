import { Search, Radio, Sun } from 'lucide-react';
import { LivePulse } from './ui';

const viewTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Fisherman Dashboard', subtitle: 'Live fleet overview & catch intelligence' },
  family: { title: 'Family Tracking', subtitle: 'Keep loved ones connected at sea' },
  border: { title: 'Sri Lanka Border Alert', subtitle: 'Geofence monitoring & recall system' },
  weather: { title: 'Sea Weather Intelligence', subtitle: 'Real-time marine conditions & forecasting' },
  recommend: { title: 'Fish Recommendation', subtitle: 'AI-powered fishing zone optimization' },
  map: { title: 'Live Map', subtitle: 'Real-time vessel tracking & ocean visualization' },
};

export function Topbar({ view, onSOS }: { view: string; onSOS: () => void }) {
  const info = viewTitles[view] ?? viewTitles.dashboard;
  return (
    <header className="sticky top-0 z-20 border-b border-ocean-100/60 bg-white/70 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="animate-slide-down">
          <h2 className="text-lg font-extrabold tracking-tight text-ocean-900">{info.title}</h2>
          <p className="text-xs text-ocean-700/50">{info.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-xl border border-ocean-100 bg-white px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-ocean-400" />
            <input
              type="text"
              placeholder="Search boats, zones, fish..."
              className="w-44 bg-transparent text-sm text-ocean-800 placeholder:text-ocean-300 focus:outline-none"
            />
            <kbd className="rounded bg-ocean-50 px-1.5 py-0.5 text-[10px] font-semibold text-ocean-400">⌘K</kbd>
          </div>

          {/* Status indicators */}
          <div className="hidden items-center gap-2 lg:flex">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-ocean-50 px-2.5 py-1.5 text-xs font-semibold text-ocean-600">
              <Radio className="h-3.5 w-3.5" strokeWidth={2.5} />
              4 vessels
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-warning-50 px-2.5 py-1.5 text-xs font-semibold text-warning-600">
              <Sun className="h-3.5 w-3.5" strokeWidth={2.5} />
              27.2°C
            </span>
            <LivePulse />
          </div>



          {/* Avatar */}
          <div className="flex items-center gap-2.5 rounded-xl border border-ocean-100 bg-white py-1.5 pl-1.5 pr-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ocean-gradient text-xs font-bold text-white">
              RK
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="text-xs font-bold text-ocean-900">Ravi Kumar</p>
              <p className="text-[10px] text-ocean-700/50">Fleet Manager</p>
            </div>
          </div>

          {/* SOS Button */}
          <button
            onClick={onSOS}
            className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-br from-danger-500 to-danger-600 px-4 py-2.5 text-sm font-bold text-white shadow-glow-danger transition-all hover:scale-[1.03] hover:shadow-lg active:scale-95"
          >
            <span className="absolute inset-0 rounded-xl bg-danger-500 animate-pulse-ring opacity-20" />
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <span className="text-[10px] font-black">SOS</span>
            </span>
            Emergency
          </button>
        </div>
      </div>
    </header>
  );
}
