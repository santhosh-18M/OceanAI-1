// Shared types for OceanAI

export type ViewId =
  | 'dashboard'
  | 'family'
  | 'border'
  | 'weather'
  | 'recommend'
  | 'forecast'
  | 'map';

export interface Boat {
  id: string;
  name: string;
  fisherName: string;
  status: 'safe' | 'warning' | 'danger';
  lat: number;
  lng: number;
  distanceFromBorderKm: number;
  battery: number;
  signal: number;
  lastPingMin: number;
  etaHours: number;
  catchKg: number;
  tripHours: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  boat: string;
  status: 'safe' | 'warning' | 'danger';
  location: string;
  lat: number;
  lng: number;
  lastUpdate: string;
  battery: number;
  eta: string;
}

export interface FishCatch {
  species: string;
  emoji: string;
  kg: number;
  pricePerKg: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export interface WeatherMetric {
  label: string;
  value: number;
  unit: string;
  max: number;
  icon: string;
  status: 'safe' | 'warning' | 'danger';
}

export interface ForecastPoint {
  day: string;
  species: string;
  price: number;
  demand: number;
}

export interface AlertItem {
  id: string;
  level: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  time: string;
  boat?: string;
}