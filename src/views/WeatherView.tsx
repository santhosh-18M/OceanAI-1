import {
  CloudSun,
  Activity,
  Sun,
  Droplets,
  Thermometer,

  TrendingDown,
} from 'lucide-react';
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  waveHeight: number;
  wavePeriod: number;
  hourlyWaveHeight: number[];
}
import { Card, CardHeader, Badge, WeatherIcon, Sparkline } from '../components/ui';
import { useEffect, useState } from 'react';
import { getMarineWeather } from '../services/weatherService';
import { getWeatherData } from "../services/weatherApi";
const hourlyLabels = [
  '00',
  '02',
  '04',
  '06',
  '08',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
];


export function WeatherView() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const waveData =
    weather?.hourlyWaveHeight?.slice(0, 12) ??
    [];
  useEffect(() => {
    async function loadData() {
      try {
        const marine = await getMarineWeather();
        const weatherData = await getWeatherData();

        setWeather({
          ...marine,
          ...weatherData,
        });
      } catch (error) {
        console.error(error);
      }
      const marine = await getMarineWeather();
      const weatherData = await getWeatherData();

      setWeather({
        ...marine,
        ...weatherData,
      });
    }

    loadData();
  }, []);

  if (!weather) {
    return (
      <Card>
        <div className="p-8 text-center">
          Loading Marine Data...
        </div>
      </Card>
    );
  }
  return (
    <div className="space-y-6">
      {/* Current condition hero */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-br from-ocean-600 via-ocean-700 to-abyss-800 p-6">
          <div className="absolute inset-0 water-texture opacity-30" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute -right-20 top-10 h-52 w-52 rounded-full bg-white/5" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CloudSun className="h-6 w-6 text-ocean-200" strokeWidth={2} />
                <span className="text-xs font-bold uppercase tracking-wider text-ocean-200">Current Conditions</span>
              </div>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-5xl font-extrabold text-white">
                  {weather.temperature}°C
                </p>
                <span className="mb-1.5 rounded-lg bg-success-400/20 px-2 py-0.5 text-xs font-bold text-success-200">FAIR</span>
              </div>
              <p className="mt-1 text-sm text-ocean-100/80">
                Gulf of Mannar · Live Marine Conditions
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <MiniStat
                  icon={Droplets}
                  label="Humidity"
                  value={`${weather.humidity}%`}
                />
                <MiniStat icon={Sun} label="UV Index" value="6" />
                <MiniStat
                  icon={Thermometer}
                  label="Sea Temp"
                  value={`${weather.temperature}°C`}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-white">
                  {Math.max(
                    0,
                    5 -
                    weather.waveHeight * 0.5 -
                    weather.windSpeed * 0.03
                  ).toFixed(1)}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-ocean-200">Safety Index</p>
              </div>
              <div className="h-12 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-3xl font-extrabold text-white">
                  {weather.waveHeight < 2 && weather.windSpeed < 25
                    ? "Go"
                    : "Caution"}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-ocean-200">Recommendation</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather metrics grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {weather && (
          [
            {
              label: "Wind Speed",
              value: weather.windSpeed,
              unit: "km/h",
              max: 60,
              icon: "wind",
              status: weather.windSpeed > 35 ? "danger" : "safe",
            },
            {
              label: "Wave Height",
              value: weather.waveHeight,
              unit: "m",
              max: 5,
              icon: "waves",
              status: weather.waveHeight > 3 ? "warning" : "safe",
            },
            {
              label: "Visibility",
              value: weather.visibility,
              unit: "km",
              max: 20,
              icon: "eye",
              status: weather.visibility < 5 ? "warning" : "safe",
            },
            {
              label: "Pressure",
              value: weather.pressure,
              unit: "hPa",
              max: 1050,
              icon: "gauge",
              status: "safe",
            },
            {
              label: "Sea Temperature",
              value: weather.temperature,
              unit: "°C",
              max: 40,
              icon: "activity",
              status: "safe",
            },
            {
              label: "Wave Period",
              value: weather.wavePeriod,
              unit: "s",
              max: 20,
              icon: "navigation",
              status: "safe",
            },
          ].map((metric) => (
            <WeatherMetricCard
              key={metric.label}
              metric={metric as any}
            />
          ))
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              icon={Activity}
              title="24-Hour Wave Forecast"
              subtitle="Wave Height (meters)"
              action={<Badge variant="info">LIVE</Badge>}
            />

            <div className="p-5 pt-4">
              <Sparkline
                data={waveData}
                width={520}
                height={120}
                color="#0ea5e9"
              />

              <div className="mt-2 flex justify-between">
                {hourlyLabels.map((label) => (
                  <span
                    key={label}
                    className="text-[10px] font-medium text-ocean-400"
                  >
                    {label}:00
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-ocean-50/50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ocean-700/40">
                    Peak Wave
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-ocean-800">
                    {Math.max(...waveData).toFixed(2)} m
                  </p>
                </div>

                <div className="rounded-xl bg-ocean-50/50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ocean-700/40">
                    Average
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-ocean-800">
                    {(
                      waveData.reduce(
                        (a: number, b: number) => a + b,
                        0
                      ) / waveData.length
                    ).toFixed(2)}{" "}
                    m
                  </p>
                </div>

                <div className="rounded-xl bg-ocean-50/50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ocean-700/40">
                    Current
                  </p>

                  <p className="mt-1 text-xl font-extrabold text-ocean-800">
                    {weather.waveHeight.toFixed(2)} m
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader
              icon={TrendingDown}
              title="Marine Advisory"
              subtitle="AI Assessment"
            />

            <div className="space-y-3 p-5 pt-4">
              <AdvisoryItem
                level={
                  weather.waveHeight > 2
                    ? "warning"
                    : "info"
                }
                title="Wave Status"
                message={`Current wave height is ${weather.waveHeight} m.`}
                time="Live"
              />

              <AdvisoryItem
                level={
                  weather.windSpeed > 25
                    ? "warning"
                    : "info"
                }
                title="Wind Status"
                message={`Current wind speed is ${weather.windSpeed} km/h.`}
                time="Live"
              />

              <AdvisoryItem
                level={
                  weather.visibility < 5
                    ? "danger"
                    : "info"
                }
                title="Visibility"
                message={`Visibility is ${weather.visibility} km.`}
                time="Live"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 backdrop-blur">
      <Icon className="h-4 w-4 text-ocean-200" strokeWidth={2.2} />
      <div>
        <p className="text-[10px] uppercase tracking-wide text-ocean-200">
          {label}
        </p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
function WeatherMetricCard({
  metric,
}: {
  metric: {
    label: string;
    value: number;
    unit: string;
    max: number;
    icon: string;
    status: "safe" | "warning" | "danger";
  };
}) {
  const statusConfig = {
    safe: {
      variant: "safe" as const,
      label: "Normal",
      bar: "bg-success-500",
    },
    warning: {
      variant: "warning" as const,
      label: "Caution",
      bar: "bg-warning-500",
    },
    danger: {
      variant: "danger" as const,
      label: "Danger",
      bar: "bg-danger-500",
    },
  };

  const cfg = statusConfig[metric.status];
  const percentage = Math.min(
    100,
    (metric.value / metric.max) * 100
  );

  return (
    <Card hover className="group">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600">
            <WeatherIcon name={metric.icon} className="h-5 w-5" />
          </div>

          <Badge variant={cfg.variant}>
            {cfg.label}
          </Badge>
        </div>

        <div className="mt-4 flex items-end gap-1.5">
          <p className="text-3xl font-extrabold text-ocean-900">
            {Number(metric.value).toFixed(1)}
          </p>

          <span className="mb-1 text-sm font-medium text-ocean-700/50">
            {metric.unit}
          </span>
        </div>

        <p className="text-xs font-medium text-ocean-700/50">
          {metric.label}
        </p>

        <div className="mt-3 h-1.5 rounded-full bg-ocean-50">
          <div
            className={`h-full rounded-full ${cfg.bar}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
}


// =========================
// AdvisoryItem
// =========================

function AdvisoryItem({
  level,
  title,
  message,
  time,
}: {
  level: "info" | "warning" | "danger";
  title: string;
  message: string;
  time: string;
}) {
  const colors = {
    info: "bg-ocean-50 text-ocean-600 border-ocean-100",
    warning: "bg-warning-50 text-warning-600 border-warning-100",
    danger: "bg-danger-50 text-danger-600 border-danger-100",
  };

  return (
    <div className={`rounded-xl border p-3 ${colors[level]}`}>
      <p className="text-xs font-bold">{title}</p>

      <p className="mt-1 text-[11px] leading-relaxed text-ocean-700/70">
        {message}
      </p>

      <p className="mt-1.5 text-[10px] text-ocean-400">
        {time}
      </p>
    </div>
  );
}
