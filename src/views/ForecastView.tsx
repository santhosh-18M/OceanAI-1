import { useState } from 'react';
import {
  TrendingUp,
  Fish,
  Calendar,
  Target,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  ShoppingCart,
} from 'lucide-react';
import { Card, CardHeader, Badge, TrendIndicator, Sparkline } from '@/components/ui';
import { fishCatches, speciesForecast, priceHistory } from '@/data';

const speciesList = fishCatches.map((f) => f.species);

export function ForecastView() {
  const [selected, setSelected] = useState('Tuna');
  const forecast = speciesForecast[selected] ?? [];
  const currentPrice = forecast[0]?.price ?? 0;
  const futurePrice = forecast[forecast.length - 1]?.price ?? 0;
  const change = ((futurePrice - currentPrice) / currentPrice) * 100;
  const isUp = change > 0;

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ForecastStat
          icon={DollarSign}
          label="Market Index"
          value="₹2,418"
          trend="+4.2%"
          trendUp
          gradient="from-success-500 to-success-600"
        />
        <ForecastStat
          icon={ShoppingCart}
          label="Demand Level"
          value="High"
          trend="89/100"
          trendUp
          gradient="from-ocean-500 to-ocean-600"
        />
        <ForecastStat
          icon={Calendar}
          label="Peak Sale Day"
          value="Saturday"
          trend="+22% volume"
          trendUp
          gradient="from-abyss-500 to-abyss-600"
        />
        <ForecastStat
          icon={Percent}
          label="Forecast Accuracy"
          value="91.3%"
          trend="+2.1%"
          trendUp
          gradient="from-warning-500 to-warning-600"
        />
      </div>

      {/* Main forecast chart */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader
              icon={TrendingUp}
              title="7-Day Price Forecast"
              subtitle="AI-predicted market prices per kg"
              action={
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-extrabold ${isUp ? 'text-success-600' : 'text-danger-600'}`}>
                    ₹{currentPrice}
                  </span>
                  <TrendIndicator trend={isUp ? 'up' : 'down'} value={`${change.toFixed(1)}%`} />
                </div>
              }
            />
            <div className="p-5 pt-4">
              {/* Species selector */}
              <div className="mb-4 flex flex-wrap gap-2">
                {speciesList.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSelected(sp)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      selected === sp
                        ? 'bg-ocean-gradient text-white shadow-sm'
                        : 'bg-ocean-50 text-ocean-700 hover:bg-ocean-100'
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>

              {/* Bar chart */}
              <PriceChart forecast={forecast} currentPrice={currentPrice} />
            </div>
          </Card>
        </div>

        {/* Market signals */}
        <div>
          <Card>
            <CardHeader icon={Target} title="Market Signals" subtitle="AI demand indicators" />
            <div className="space-y-3 p-5 pt-4">
              <SignalCard
                label="Export Demand"
                value="Very High"
                level="safe"
                detail="Tuna & Seer Fish orders up 34% from Japan & UAE"
              />
              <SignalCard
                label="Local Market"
                value="Stable"
                level="info"
                detail="Sardine & Mackerel demand steady at landing centers"
              />
              <SignalCard
                label="Cold Storage"
                value="78% Full"
                level="warning"
                detail="Limited capacity may affect Prawn pricing"
              />
              <SignalCard
                label="Competitor Supply"
                value="Low"
                level="safe"
                detail="14% fewer boats out today — less supply, better prices"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Species overview table */}
      <Card>
        <CardHeader icon={BarChart3} title="Species Market Overview" subtitle="Current prices & 7-day forecast" />
        <div className="overflow-x-auto p-5 pt-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ocean-50">
                <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">Species</th>
                <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">Current</th>
                <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">7-Day Avg</th>
                <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">Trend</th>
                <th className="px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">Demand</th>
                <th className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-ocean-700/40">Forecast</th>
              </tr>
            </thead>
            <tbody>
              {fishCatches.map((fish) => {
                const fc = speciesForecast[fish.species] ?? [];
                const avg = Math.round(fc.reduce((s, p) => s + p.price, 0) / fc.length);
                const changePct = fc.length > 0
                  ? ((fc[fc.length - 1].price - fc[0].price) / fc[0].price) * 100
                  : 0;
                return (
                  <tr key={fish.species} className="border-b border-ocean-50/50 transition hover:bg-ocean-50/30">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{fish.emoji}</span>
                        <span className="text-sm font-bold text-ocean-900">{fish.species}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right text-sm font-bold text-ocean-900">₹{fish.pricePerKg}</td>
                    <td className="px-3 py-3 text-right text-sm text-ocean-700">₹{avg}</td>
                    <td className="px-3 py-3">
                      <div className="flex justify-center">
                        <TrendIndicator trend={fish.trend} value={`${changePct.toFixed(1)}%`} />
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-ocean-50">
                          <div
                            className="h-full rounded-full bg-ocean-gradient"
                            style={{ width: `${fish.confidence}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={`text-sm font-bold ${changePct > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                        ₹{fc[fc.length - 1]?.price ?? fish.pricePerKg}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ForecastStat({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
  gradient,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
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
          {trendUp ? (
            <ArrowUpRight className="h-4 w-4 text-success-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-danger-500" />
          )}
        </div>
        <p className="mt-4 text-2xl font-extrabold text-ocean-900">{value}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs font-medium text-ocean-700/50">{label}</p>
          <span className={`text-[11px] font-semibold ${trendUp ? 'text-success-600' : 'text-danger-600'}`}>{trend}</span>
        </div>
      </div>
    </Card>
  );
}

function PriceChart({ forecast, currentPrice }: { forecast: { day: string; price: number }[]; currentPrice: number }) {
  if (forecast.length === 0) return null;
  const prices = forecast.map((f) => f.price);
  const min = Math.min(...prices) - 10;
  const max = Math.max(...prices) + 10;
  const range = max - min || 1;
  const chartH = 180;
  const barW = 100 / forecast.length;

  return (
    <div>
      <div className="relative flex items-end justify-between gap-2" style={{ height: chartH }}>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-px w-full bg-ocean-50" />
          ))}
        </div>
        {forecast.map((point, i) => {
          const heightPct = ((point.price - min) / range) * 100;
          const isCurrent = i === 0;
          const isPeak = point.price === Math.max(...prices);
          return (
            <div key={point.day} className="relative flex flex-1 flex-col items-center justify-end" style={{ height: '100%' }}>
              <div className="absolute -top-1 flex w-full justify-center">
                <span className={`text-[10px] font-bold ${isPeak ? 'text-success-600' : 'text-ocean-400'}`}>
                  ₹{point.price}
                </span>
              </div>
              <div
                className={`w-full max-w-[42px] rounded-t-lg transition-all duration-500 ${
                  isCurrent ? 'bg-ocean-400' : isPeak ? 'bg-success-500' : 'bg-ocean-gradient'
                }`}
                style={{ height: `${heightPct}%`, animationDelay: `${i * 60}ms` }}
              />
              <span className="mt-2 text-[10px] font-semibold text-ocean-700/50">{point.day}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-ocean-50/50 p-3">
        <div className="flex items-center gap-2">
          <Fish className="h-4 w-4 text-ocean-500" strokeWidth={2.2} />
          <span className="text-xs font-medium text-ocean-700">7-day trend</span>
        </div>
        <Sparkline data={prices} width={120} height={28} color="#0ea5e9" filled />
      </div>
    </div>
  );
}

function SignalCard({
  label,
  value,
  level,
  detail,
}: {
  label: string;
  value: string;
  level: 'safe' | 'warning' | 'info';
  detail: string;
}) {
  const colors = {
    safe: 'border-success-100 bg-success-50/40',
    warning: 'border-warning-100 bg-warning-50/40',
    info: 'border-ocean-100 bg-ocean-50/40',
  };
  const badge = {
    safe: { variant: 'safe' as const, label: 'Bullish' },
    warning: { variant: 'warning' as const, label: 'Watch' },
    info: { variant: 'info' as const, label: 'Stable' },
  };
  return (
    <div className={`rounded-xl border p-3.5 ${colors[level]}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-ocean-900">{label}</p>
        <Badge variant={badge[level].variant}>{badge[level].label}</Badge>
      </div>
      <p className="mt-1.5 text-lg font-extrabold text-ocean-800">{value}</p>
      <p className="mt-0.5 text-[11px] leading-relaxed text-ocean-700/60">{detail}</p>
    </div>
  );
}
