import {
  Anchor,
  Fish,
  Waves,
  AlertTriangle,
  TrendingUp,
  Clock,
  Zap,
  MapPin,
  ArrowUpRight,
  Ship,
  Radio,
} from 'lucide-react';
import { Card, CardHeader, Badge, StatusDot, ProgressRing, Sparkline, TrendIndicator, BatteryBar, SignalBars, CountUp, LivePulse } from '@/components/ui';
import { boats, fishCatches, priceHistory, alerts } from '@/data';

export function DashboardView() {
  const totalCatch = boats.reduce((s, b) => s + b.catchKg, 0);
  const activeBoats = boats.length;
  const dangerCount = boats.filter((b) => b.status === 'danger').length;
  const avgBattery = Math.round(boats.reduce((s, b) => s + b.battery, 0) / boats.length);
  const revenue = fishCatches.reduce((s, f) => s + f.kg * f.pricePerKg, 0);

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatHero
          icon={Ship}
          label="Active Vessels"
          value={activeBoats}
          suffix=""
          trend="+2 today"
          trendUp
          gradient="from-ocean-500 to-ocean-600"
        />
        <StatHero
          icon={Fish}
          label="Total Catch Today"
          value={totalCatch}
          suffix=" kg"
          trend="+18% vs avg"
          trendUp
          gradient="from-abyss-500 to-abyss-600"
        />
        <StatHero
          icon={AlertTriangle}
          label="Active Alerts"
          value={dangerCount + 2}
          suffix=""
          trend="1 critical"
          trendUp={false}
          gradient="from-danger-500 to-danger-600"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Fleet Status */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader
              icon={Anchor}
              title="Fleet Status"
              subtitle="Real-time vessel tracking & telemetry"
              action={<LivePulse />}
            />
            <div className="p-5 pt-4">
              <div className="space-y-3">
                {boats.map((boat) => (
                  <FleetRow key={boat.id} boat={boat} />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* AI Insight */}
          <Card className="overflow-hidden">
            <div className="relative bg-gradient-to-br from-ocean-600 to-abyss-700 p-5">
              <div className="absolute inset-0 water-texture opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-ocean-200" strokeWidth={2.5} />
                  <span className="text-xs font-bold uppercase tracking-wider text-ocean-100">AI Insight</span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-white">
                  Tuna migration path detected 18nm SE. Expected yield 80-120kg. Optimal window: 5:00-8:00 AM.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] text-ocean-200">
                      <span>Confidence</span>
                      <span className="font-bold text-white">92%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/20">
                      <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Battery Overview */}
          <Card>
            <div className="grid grid-cols-2 gap-2 px-5 pb-5">
              {boats.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-lg bg-ocean-50/50 px-3 py-2">
                  <span className="truncate text-xs font-medium text-ocean-700">{b.name}</span>
                  <BatteryBar level={b.battery} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Catch breakdown + alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Catch breakdown */}
        <div className="xl:col-span-2">
        </div>

        {/* Recent alerts */}
        <div>
          <Card>
            <CardHeader icon={AlertTriangle} title="Recent Alerts" subtitle="Last 24 hours" />
            <div className="p-5 pt-4">
              <div className="space-y-3">
                {alerts.slice(0, 2).map((alert) => (
                  <div key={alert.id} className="rounded-xl border border-ocean-50 p-3 transition hover:border-ocean-100">
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${alert.level === 'danger'
                          ? 'bg-danger-50 text-danger-600'
                          : alert.level === 'warning'
                            ? 'bg-warning-50 text-warning-600'
                            : 'bg-ocean-50 text-ocean-600'
                          }`}
                      >
                        <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-ocean-900">{alert.title}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-ocean-700/60">{alert.message}</p>
                        <p className="mt-1 text-[10px] text-ocean-400">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatHero({
  icon: Icon,
  label,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendUp,
  gradient,
}: {
  icon: typeof Ship;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: string;
  trendUp: boolean;
  gradient: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-10`} />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
            <Icon className="h-5 w-5" strokeWidth={2.3} />
          </div>
          <ArrowUpRight className={`h-4 w-4 ${trendUp ? 'text-success-500' : 'text-danger-500 rotate-90'}`} />
        </div>
        <p className="mt-4 text-3xl font-extrabold tracking-tight text-ocean-900">
          <CountUp end={value} prefix={prefix} suffix={suffix} />
        </p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs font-medium text-ocean-700/50">{label}</p>
          <span className={`text-[11px] font-semibold ${trendUp ? 'text-success-600' : 'text-danger-600'}`}>{trend}</span>
        </div>
      </div>
    </Card>
  );
}

function FleetRow({ boat }: { boat: (typeof boats)[0] }) {
  const statusBadge = {
    safe: { variant: 'safe' as const, label: 'Safe' },
    warning: { variant: 'warning' as const, label: 'Warning' },
    danger: { variant: 'danger' as const, label: 'Danger' },
  };
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-ocean-50 p-3.5 transition-all hover:border-ocean-200 hover:shadow-sm">
      <StatusDot status={boat.status} />
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-gradient text-white">
        <Ship className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <div className="w-36">
        <p className="text-sm font-bold text-ocean-900">{boat.name}</p>
        <p className="text-xs text-ocean-700/50">{boat.fisherName}</p>
      </div>
      <div className="hidden flex-1 items-center gap-6 lg:flex">
        <div className="flex items-center gap-1.5 text-xs text-ocean-700/70">
          <MapPin className="h-3.5 w-3.5 text-ocean-400" />
          {boat.lat.toFixed(2)}°N, {boat.lng.toFixed(2)}°E
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ocean-700/70">
          <Clock className="h-3.5 w-3.5 text-ocean-400" />
          {boat.etaHours}h ETA
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ocean-700/70">
          <Radio className="h-3.5 w-3.5 text-ocean-400" />
          {boat.lastPingMin}m ago
        </div>
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <SignalBars strength={boat.signal} />
        <BatteryBar level={boat.battery} />
      </div>
      <Badge variant={statusBadge[boat.status].variant}>{statusBadge[boat.status].label}</Badge>
    </div>
  );
}
