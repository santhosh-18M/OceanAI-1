import {
  Map as MapIcon,
  Crosshair,
  Layers,
  Radio,
  Ship,
  Waves,
  Navigation,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { Card, Badge, StatusDot, LivePulse, SignalBars, BatteryBar } from '@/components/ui';
import { boats } from '@/data';
import LiveAISMap from "@/components/LiveAISMap";

export function MapView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {/* Map */}
        <div className="xl:col-span-3">
          <Card>
            <div className="flex items-center justify-between border-b border-ocean-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600">
                  <MapIcon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ocean-900">Live Vessel Map</h3>
                  <p className="text-xs text-ocean-700/50">Tuticorin coast · Gulf of Mannar</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LivePulse />
                <div className="hidden items-center gap-1 rounded-lg border border-ocean-100 bg-white px-2 py-1 text-xs font-semibold text-ocean-600 sm:flex">
                  <Layers className="h-3.5 w-3.5" />
                  Nautical
                </div>
              </div>
            </div>
            <LiveAISMap />
          </Card>
        </div>

        {/* Vessel list sidebar */}
        <div>
          <Card>
            <div className="border-b border-ocean-50 p-4">
              <h3 className="text-sm font-bold text-ocean-900">Tracked Vessels</h3>
              <p className="text-xs text-ocean-700/50">{boats.length} active</p>
            </div>
            <div className="space-y-2 p-4">
              {boats.map((boat) => (
                <div
                  key={boat.id}
                  className="group cursor-pointer rounded-xl border border-ocean-50 p-3 transition hover:border-ocean-200 hover:bg-ocean-50/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <StatusDot status={boat.status} />
                      <div>
                        <p className="text-sm font-bold text-ocean-900">{boat.name}</p>
                        <p className="text-[11px] text-ocean-700/50">{boat.fisherName}</p>
                      </div>
                    </div>
                    <Ship className="h-4 w-4 text-ocean-300 transition group-hover:text-ocean-500" strokeWidth={2} />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-ocean-600">
                      <Navigation className="h-3 w-3" />
                      {boat.lat.toFixed(2)}°N, {boat.lng.toFixed(2)}°E
                    </div>
                    <SignalBars strength={boat.signal} />
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-ocean-700/50">{boat.catchKg} kg catch</span>
                    <BatteryBar level={boat.battery} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LiveMapCanvas() {
  return (
    <div className="relative h-[520px] overflow-hidden bg-ocean-50/20 map-grid">
      {/* Water texture */}
      <div className="absolute inset-0 water-texture" />

      {/* Coastline shapes */}
      <div className="absolute left-0 top-0 h-full w-[15%]">
        <div className="absolute right-0 top-1/3 h-64 w-40 rounded-r-[3rem] bg-gradient-to-l from-ocean-200/50 to-ocean-100/30" />
      </div>

      {/* Depth contours */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="depthGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80].map((d) => (
          <ellipse
            key={d}
            cx="50%"
            cy="50%"
            rx={`${d}%`}
            ry={`${d * 0.6}%`}
            fill="none"
            stroke="rgba(14, 165, 233, 0.12)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Fish zones (AI) */}
      <FishZone left="60%" top="35%" label="Tuna Zone" probability={92} />
      <FishZone left="45%" top="65%" label="Mackerel Zone" probability={85} />
      <FishZone left="70%" top="70%" label="Squid Zone" probability={78} />

      {/* Vessels on map */}
      <MapVessel left="30%" top="40%" boat={boats[0]} />
      <MapVessel left="48%" top="55%" boat={boats[1]} />
      <MapVessel left="55%" top="62%" boat={boats[2]} />
      <MapVessel left="20%" top="25%" boat={boats[3]} />

      {/* Current arrows */}
      <div className="absolute right-[20%] top-[30%] text-ocean-300 animate-wave">
        <Navigation className="h-5 w-5 rotate-45" strokeWidth={2} />
      </div>
      <div className="absolute right-[15%] top-[55%] text-ocean-300 animate-wave" style={{ animationDelay: '0.5s' }}>
        <Navigation className="h-5 w-5 rotate-45" strokeWidth={2} />
      </div>

      {/* Map controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1.5">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-ocean-100 bg-white/90 text-ocean-600 backdrop-blur transition hover:bg-ocean-50">
          <ZoomIn className="h-4 w-4" strokeWidth={2.2} />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-ocean-100 bg-white/90 text-ocean-600 backdrop-blur transition hover:bg-ocean-50">
          <ZoomOut className="h-4 w-4" strokeWidth={2.2} />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-ocean-100 bg-white/90 text-ocean-600 backdrop-blur transition hover:bg-ocean-50">
          <Maximize2 className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>

      {/* Crosshair center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="h-6 w-6 text-ocean-300/50" strokeWidth={1.5} />
      </div>

      {/* Compass */}
      <div className="absolute bottom-3 right-3 flex h-14 w-14 items-center justify-center rounded-full border border-ocean-100 bg-white/90 backdrop-blur">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold text-danger-500">N</span>
          <Navigation className="h-5 w-5 rotate-0 text-ocean-500" strokeWidth={2} />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 rounded-xl bg-white/85 px-3 py-2 backdrop-blur">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ocean-700">
          <span className="h-2.5 w-2.5 rounded-full bg-success-500 ring-2 ring-success-200" /> Safe vessel
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ocean-700">
          <span className="h-2.5 w-2.5 rounded-full bg-warning-500 ring-2 ring-warning-200" /> Warning
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ocean-700">
          <span className="h-2.5 w-2.5 rounded-full bg-danger-500 ring-2 ring-danger-200" /> Critical
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ocean-700">
          <Waves className="h-3 w-3 text-ocean-400" /> Current
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ocean-700">
          <Radio className="h-3 w-3 text-ocean-400" /> AI Zone
        </span>
      </div>

      {/* Scale */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-[10px] font-semibold text-ocean-600">
          <div className="h-0.5 w-16 bg-ocean-400" />
          5 nm
        </div>
      </div>
    </div>
  );
}

function MapVessel({ left, top, boat }: { left: string; top: string; boat: (typeof boats)[0] }) {
  const colors = {
    safe: 'bg-success-500 ring-success-200',
    warning: 'bg-warning-500 ring-warning-200',
    danger: 'bg-danger-500 ring-danger-200',
  };
  return (
    <div className="absolute" style={{ left, top, transform: 'translate(-50%, -50%)' }}>
      <div className="group relative">
        {/* Pulse */}
        {boat.status !== 'safe' && (
          <span className={`absolute inset-0 rounded-full ${colors[boat.status].split(' ')[0]} animate-pulse-ring`} />
        )}
        <div className={`relative h-3.5 w-3.5 rounded-full ${colors[boat.status]} ring-2`} />

        {/* Tooltip */}
        <div className="absolute bottom-5 left-1/2 z-10 w-40 -translate-x-1/2 whitespace-nowrap rounded-xl bg-white/95 p-2.5 opacity-0 shadow-card-hover backdrop-blur transition-opacity group-hover:opacity-100">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-ocean-900">{boat.name}</p>
            <StatusDot status={boat.status} />
          </div>
          <p className="text-[10px] text-ocean-700/60">{boat.fisherName}</p>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[10px] text-ocean-500">{boat.catchKg}kg</span>
            <span className="text-[10px] text-ocean-500">{boat.etaHours}h ETA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FishZone({ left, top, label, probability }: { left: string; top: string; label: string; probability: number }) {
  return (
    <div className="absolute" style={{ left, top, transform: 'translate(-50%, -50%)' }}>
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-ocean-300/40 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full bg-ocean-400/15" />
        <div className="relative flex flex-col items-center">
          <Radio className="h-3.5 w-3.5 text-ocean-500" strokeWidth={2.2} />
          <span className="mt-0.5 text-[8px] font-bold text-ocean-700">{probability}%</span>
        </div>
      </div>
      <div className="absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-ocean-600 backdrop-blur">
        {label}
      </div>
    </div>
  );
}
