import {
  Fish,
  MapPin,
  Clock,
  Thermometer,
  Anchor,
  Target,
  Sparkles,
  TrendingUp,
  Gauge,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { Card, CardHeader, Badge, Sparkline } from '@/components/ui';
import { useEffect, useState } from 'react';
import { getFishRecommendations } from '@/services/fishService';

export function RecommendView() {
  const [fishRecommendations, setFishRecommendations] = useState<any[]>([]);
  useEffect(() => {
    getFishRecommendations().then((data) => {
      console.log("FISH DATA:", data);
      setFishRecommendations(data);
    });
  }, []);
  return (
    <div className="space-y-6">
      {/* AI banner */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-r from-ocean-500 via-ocean-600 to-abyss-600 p-5">
          <div className="absolute inset-0 water-texture opacity-25" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="h-6 w-6 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-extrabold text-white">AI Fishing Zone Recommendations</h3>
              <p className="text-sm text-ocean-100/80">
                Powered by satellite SST, chlorophyll-a, bathymetry & historical catch data
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur sm:flex">
              <Target className="h-4 w-4 text-white" strokeWidth={2.2} />
              <span className="text-xs font-bold text-white">4 zones identified</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendation cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {fishRecommendations.map((rec, idx) => (
          <RecommendationCard key={rec.species} rec={rec} rank={idx + 1} />
        ))}
      </div>

      {/* AI Strategy Insight */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader icon={Lightbulb} title="AI Strategy Insight" subtitle="Today's optimal fishing plan" />
            <div className="p-5 pt-4">
              <div className="space-y-3">
                <StrategyRow
                  time="04:30 - 05:00"
                  action="Depart harbor"
                  detail="Head SE toward Tuna zone (18nm). Calm seas, favorable current."
                  status="info"
                />
                <StrategyRow
                  time="05:00 - 08:00"
                  action="Primary target: Yellowfin Tuna"
                  detail="Deploy trolling lines at 60-80m depth. SST 27.2°C ideal."
                  status="highlight"
                />
                <StrategyRow
                  time="08:00 - 10:00"
                  action="Secondary: Indian Mackerel"
                  detail="Move 10nm N to mackerel zone. Gill nets at 30-50m."
                  status="info"
                />
                <StrategyRow
                  time="10:00 - 14:00"
                  action="Return & unload"
                  detail="Calmest weather window for safe return. Estimated 120-190kg total."
                  status="success"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Environmental factors */}
        <div>
          <Card>
            <CardHeader icon={Gauge} title="Environmental Signals" subtitle="AI input parameters" />
            <div className="space-y-3 p-5 pt-4">
              <SignalRow label="Sea Surface Temp" value="27.2°C" optimal bar={75} />
              <SignalRow label="Chlorophyll-a" value="0.85 mg/m³" optimal bar={82} />
              <SignalRow label="Thermocline Depth" value="65m" bar={60} />
              <SignalRow label="Current Speed" value="2.4 kts" bar={70} />
              <SignalRow label="Moon Phase" value="Waning Gibbous" bar={55} />
              <SignalRow label="Tidal Coefficient" value="78" optimal bar={78} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ rec, rank }: { rec: any; rec_idx?: number; rank: number }) {
  const confBadge = rec.confidence === 'high'
    ? { variant: 'safe' as const, label: 'High Confidence' }
    : { variant: 'warning' as const, label: 'Medium Confidence' };

  return (
    <Card hover className="overflow-hidden">
      <div className="flex items-center gap-4 p-5 pb-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ocean-gradient text-2xl shadow-glow">
          {rec.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-ocean-900">{rec.species}</h3>
            <span className="rounded-full bg-ocean-50 px-2 py-0.5 text-[10px] font-bold text-ocean-600">#{rank}</span>
          </div>
          <p className="text-xs text-ocean-700/60">{rec.zone}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-ocean-600">{rec.probability}%</p>
          <p className="text-[10px] uppercase tracking-wide text-ocean-700/40">probability</p>
        </div>
      </div>

      <div className="p-5 pt-4">
        <div className="grid grid-cols-2 gap-2.5">
          <DetailChip icon={MapPin} label="Zone" value={rec.zone} />
          <DetailChip icon={Anchor} label="Depth" value={rec.depth} />
          <DetailChip icon={Clock} label="Best Time" value={rec.bestTime} />
          <DetailChip icon={Thermometer} label="Sea Temp" value={rec.temp} />
          <DetailChip icon={Fish} label="Gear" value={rec.gear} />
          <DetailChip icon={TrendingUp} label="Expected" value={rec.expectedKg} />
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-ocean-50/50 p-3">
          <div className="flex items-center gap-2">
            <Badge variant={confBadge.variant}>{confBadge.label}</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}

function DetailChip({ icon: Icon, label, value }: { icon: typeof Fish; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-ocean-50 p-2.5">
      <Icon className="h-3.5 w-3.5 text-ocean-400" strokeWidth={2.2} />
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ocean-700/40">{label}</p>
        <p className="truncate text-xs font-semibold text-ocean-800">{value}</p>
      </div>
    </div>
  );
}

function StrategyRow({
  time,
  action,
  detail,
  status,
}: {
  time: string;
  action: string;
  detail: string;
  status: 'info' | 'highlight' | 'success';
}) {
  const dotColor = {
    info: 'bg-ocean-400',
    highlight: 'bg-ocean-600',
    success: 'bg-success-500',
  };
  const bg = {
    info: 'bg-white',
    highlight: 'bg-ocean-50/60 border-ocean-100',
    success: 'bg-success-50/40 border-success-100',
  };
  return (
    <div className={`flex items-start gap-3 rounded-xl border border-ocean-50 p-3.5 ${bg[status]}`}>
      <div className="flex flex-col items-center">
        <div className={`h-2.5 w-2.5 rounded-full ${dotColor[status]}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-ocean-900">{action}</p>
          <span className="text-xs font-semibold text-ocean-500">{time}</span>
        </div>
        <p className="mt-0.5 text-xs text-ocean-700/60">{detail}</p>
      </div>
    </div>
  );
}

function SignalRow({ label, value, optimal, bar }: { label: string; value: string; optimal?: boolean; bar: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ocean-700/70">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-ocean-900">{value}</span>
          {optimal && <span className="h-1.5 w-1.5 rounded-full bg-success-500" />}
        </div>
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-ocean-50">
        <div className={`h-full rounded-full ${optimal ? 'bg-success-500' : 'bg-ocean-400'} transition-all duration-700`} style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}
