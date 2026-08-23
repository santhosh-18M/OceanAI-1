import type { Boat, FamilyMember, FishCatch, WeatherMetric, ForecastPoint, AlertItem } from './types';

export const boats: Boat[] = [
  {
    id: 'b1',
    name: 'MV Marina Star',
    fisherName: 'Ravi Kumar',
    status: 'safe',
    lat: 8.72,
    lng: 78.08,
    distanceFromBorderKm: 42.5,
    battery: 82,
    signal: 74,
    lastPingMin: 2,
    etaHours: 3.5,
    catchKg: 128,
    tripHours: 14,
  },
  {
    id: 'b2',
    name: 'Sea Pearl II',
    fisherName: 'Suresh Nadar',
    status: 'warning',
    lat: 8.05,
    lng: 77.32,
    distanceFromBorderKm: 12.8,
    battery: 34,
    signal: 41,
    lastPingMin: 8,
    etaHours: 6.0,
    catchKg: 86,
    tripHours: 18,
  },
  {
    id: 'b3',
    name: 'Deep Hunter',
    fisherName: 'Joseph Fernando',
    status: 'danger',
    lat: 7.98,
    lng: 77.18,
    distanceFromBorderKm: 3.2,
    battery: 18,
    signal: 22,
    lastPingMin: 15,
    etaHours: 9.0,
    catchKg: 210,
    tripHours: 22,
  },
  {
    id: 'b4',
    name: 'Kingfisher',
    fisherName: 'Mohan Das',
    status: 'safe',
    lat: 9.18,
    lng: 78.42,
    distanceFromBorderKm: 68.0,
    battery: 91,
    signal: 88,
    lastPingMin: 1,
    etaHours: 2.0,
    catchKg: 64,
    tripHours: 8,
  },
];

export const familyMembers: FamilyMember[] = [
  {
    id: 'f1',
    name: 'Ravi Kumar',
    relation: 'Father',
    boat: 'MV Marina Star',
    status: 'safe',
    location: '12.4 nm off Tuticorin',
    lat: 8.72,
    lng: 78.08,
    lastUpdate: '2 min ago',
    battery: 82,
    eta: '3h 30m',
  },
  {
    id: 'f2',
    name: 'Suresh Nadar',
    relation: 'Brother',
    boat: 'Sea Pearl II',
    status: 'warning',
    location: 'Near border zone',
    lat: 8.05,
    lng: 77.32,
    lastUpdate: '8 min ago',
    battery: 34,
    eta: '6h 00m',
  },
  {
    id: 'f3',
    name: 'Joseph Fernando',
    relation: 'Uncle',
    boat: 'Deep Hunter',
    status: 'danger',
    location: '3.2 km from border',
    lat: 7.98,
    lng: 77.18,
    lastUpdate: '15 min ago',
    battery: 18,
    eta: '9h 00m',
  },
];

export const fishCatches: FishCatch[] = [
  { species: 'Tuna', emoji: '🐟', kg: 42, pricePerKg: 480, trend: 'up', confidence: 92 },
  { species: 'Sardine', emoji: '🐠', kg: 38, pricePerKg: 180, trend: 'stable', confidence: 88 },
  { species: 'Mackerel', emoji: '🐟', kg: 28, pricePerKg: 320, trend: 'up', confidence: 85 },
  { species: 'Prawn', emoji: '🦐', kg: 12, pricePerKg: 720, trend: 'down', confidence: 79 },
  { species: 'Seer Fish', emoji: '🐟', kg: 8, pricePerKg: 950, trend: 'up', confidence: 94 },
];

export const weatherMetrics: WeatherMetric[] = [
  { label: 'Wind Speed', value: 18, unit: 'knots', max: 35, icon: 'wind', status: 'safe' },
  { label: 'Wave Height', value: 1.8, unit: 'm', max: 4, icon: 'waves', status: 'safe' },
  { label: 'Visibility', value: 9, unit: 'km', max: 12, icon: 'eye', status: 'safe' },
  { label: 'Pressure', value: 1008, unit: 'hPa', max: 1030, icon: 'gauge', status: 'warning' },
  { label: 'Current', value: 2.4, unit: 'knots', max: 5, icon: 'navigation', status: 'safe' },
  { label: 'Swell', value: 2.1, unit: 'm', max: 4, icon: 'activity', status: 'warning' },
];

export const forecastData: ForecastPoint[] = [
  { day: 'Mon', species: 'Tuna', price: 460, demand: 72 },
  { day: 'Tue', species: 'Tuna', price: 475, demand: 76 },
  { day: 'Wed', species: 'Tuna', price: 480, demand: 80 },
  { day: 'Thu', species: 'Tuna', price: 492, demand: 85 },
  { day: 'Fri', species: 'Tuna', price: 505, demand: 88 },
  { day: 'Sat', species: 'Tuna', price: 520, demand: 92 },
  { day: 'Sun', species: 'Tuna', price: 510, demand: 89 },
];

export const alerts: AlertItem[] = [
  {
    id: 'a1',
    level: 'danger',
    title: 'Border Proximity Alert',
    message: 'Deep Hunter is 3.2 km from the Sri Lanka maritime border. Immediate recall recommended.',
    time: '15 min ago',
    boat: 'Deep Hunter',
  },
  {
    id: 'a2',
    level: 'warning',
    title: 'Low Battery',
    message: 'Sea Pearl II battery at 34%. Return advisory issued.',
    time: '8 min ago',
    boat: 'Sea Pearl II',
  },
  {
    id: 'a3',
    level: 'warning',
    title: 'Weather Advisory',
    message: 'Swell increasing to 2.1m near Gulf of Mannar. Caution advised for small vessels.',
    time: '32 min ago',
  },
  {
    id: 'a4',
    level: 'info',
    title: 'Optimal Fishing Zone',
    message: 'AI detected high-probability Tuna zone 18nm SE of current fleet position.',
    time: '1 hr ago',
  },
];

export const priceHistory: Record<string, number[]> = {
  Tuna: [440, 450, 445, 465, 470, 475, 480],
  Sardine: [160, 170, 175, 172, 178, 180, 180],
  Mackerel: [290, 300, 305, 310, 315, 318, 320],
  Prawn: [750, 740, 735, 730, 725, 722, 720],
  'Seer Fish': [900, 910, 920, 930, 935, 942, 950],
};

// 7-day forecast for all species
export const speciesForecast: Record<string, { day: string; price: number }[]> = {
  Tuna: [
    { day: 'Mon', price: 480 }, { day: 'Tue', price: 492 }, { day: 'Wed', price: 505 },
    { day: 'Thu', price: 498 }, { day: 'Fri', price: 520 }, { day: 'Sat', price: 535 }, { day: 'Sun', price: 510 },
  ],
  Sardine: [
    { day: 'Mon', price: 180 }, { day: 'Tue', price: 175 }, { day: 'Wed', price: 182 },
    { day: 'Thu', price: 190 }, { day: 'Fri', price: 188 }, { day: 'Sat', price: 195 }, { day: 'Sun', price: 192 },
  ],
  Mackerel: [
    { day: 'Mon', price: 320 }, { day: 'Tue', price: 328 }, { day: 'Wed', price: 335 },
    { day: 'Thu', price: 330 }, { day: 'Fri', price: 342 }, { day: 'Sat', price: 350 }, { day: 'Sun', price: 345 },
  ],
  Prawn: [
    { day: 'Mon', price: 720 }, { day: 'Tue', price: 710 }, { day: 'Wed', price: 705 },
    { day: 'Thu', price: 715 }, { day: 'Fri', price: 725 }, { day: 'Sat', price: 740 }, { day: 'Sun', price: 735 },
  ],
  'Seer Fish': [
    { day: 'Mon', price: 950 }, { day: 'Tue', price: 965 }, { day: 'Wed', price: 980 },
    { day: 'Thu', price: 975 }, { day: 'Fri', price: 990 }, { day: 'Sat', price: 1010 }, { day: 'Sun', price: 1005 },
  ],
};

export const fishRecommendations = [
  {
    species: 'Yellowfin Tuna',
    emoji: '🐟',
    probability: 89,
    zone: '22nm SE of Tuticorin',
    depth: '65-90m',
    bestTime: '5:00 - 8:30 AM',
    temp: '27.4°C',
    gear: 'Trolling lines',
    expectedKg: '90-140 kg',
    confidence: 'high',
  },
  {
    species: 'Skipjack Tuna',
    emoji: '🐟',
    probability: 84,
    zone: '15nm E of Rameswaram',
    depth: '50-80m',
    bestTime: '6:00 - 9:00 AM',
    temp: '27.1°C',
    gear: 'Purse Seine',
    expectedKg: '60-110 kg',
    confidence: 'high',
  },
  {
    species: 'Indian Mackerel',
    emoji: '🐟',
    probability: 80,
    zone: '10nm E of Kanyakumari',
    depth: '30-45m',
    bestTime: '4:30 - 7:30 AM',
    temp: '26.8°C',
    gear: 'Gill Nets',
    expectedKg: '40-75 kg',
    confidence: 'medium',
  },
  {
    species: 'Tiger Prawn',
    emoji: '🦐',
    probability: 74,
    zone: '6nm off Nagapattinam',
    depth: '15-25m',
    bestTime: '8:00 - 11:00 PM',
    temp: '28.0°C',
    gear: 'Bottom Trawl',
    expectedKg: '20-35 kg',
    confidence: 'medium',
  },
];
