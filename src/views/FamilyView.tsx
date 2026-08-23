import {
  Users,
  MapPin,
  Clock,
  Battery,
  Phone,
  MessageCircle,
  Navigation,
  Heart,
  Shield,
  Wifi,
  Share2,
} from 'lucide-react';
import { Card, CardHeader, Badge, StatusDot, ProgressRing, BatteryBar } from '@/components/ui';
import { familyMembers } from '@/data';

export function FamilyView() {
  const safeCount = familyMembers.filter((f) => f.status === 'safe').length;
  const avgBattery = Math.round(familyMembers.reduce((s, f) => s + f.battery, 0) / familyMembers.length);

  return (
    <div className="space-y-6">
      {/* Family overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-success-500/10" />
          <div className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <Shield className="h-5 w-5" strokeWidth={2.3} />
            </div>
            <p className="mt-4 text-3xl font-extrabold text-ocean-900">{safeCount}/{familyMembers.length}</p>
            <p className="mt-0.5 text-xs font-medium text-ocean-700/50">Members Safe</p>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between p-5">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600">
                <Battery className="h-5 w-5" strokeWidth={2.3} />
              </div>
              <p className="mt-4 text-3xl font-extrabold text-ocean-900">{avgBattery}%</p>
              <p className="mt-0.5 text-xs font-medium text-ocean-700/50">Avg Battery</p>
            </div>
            <ProgressRing value={avgBattery} size={72} strokeWidth={7} color="#0ea5e9" />
          </div>
        </Card>
        <Card>
          <div className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-abyss-50 text-abyss-600">
              <Wifi className="h-5 w-5" strokeWidth={2.3} />
            </div>
            <p className="mt-4 text-3xl font-extrabold text-ocean-900">24/7</p>
            <p className="mt-0.5 text-xs font-medium text-ocean-700/50">Satellite Uplink</p>
          </div>
        </Card>
      </div>

      {/* Family members */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {familyMembers.map((member) => (
          <FamilyCard key={member.id} member={member} />
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader icon={Users} title="Quick Actions" subtitle="Stay connected with your family at sea" />
        <div className="grid grid-cols-2 gap-3 p-5 pt-4 md:grid-cols-4">
          {[
            { icon: Phone, label: 'Voice Call', color: 'ocean' },
            { icon: MessageCircle, label: 'Send Message', color: 'abyss' },
            { icon: Navigation, label: 'Share Location', color: 'success' },
            { icon: Heart, label: 'Send Reassurance', color: 'danger' },
          ].map((action) => {
            const Icon = action.icon;
            const colorMap: Record<string, string> = {
              ocean: 'bg-ocean-50 text-ocean-600 hover:bg-ocean-100',
              abyss: 'bg-abyss-50 text-abyss-600 hover:bg-abyss-100',
              success: 'bg-success-50 text-success-600 hover:bg-success-100',
              danger: 'bg-danger-50 text-danger-600 hover:bg-danger-100',
            };
            return (
              <button
                key={action.label}
                className={`flex items-center gap-3 rounded-xl p-3.5 text-sm font-semibold text-ocean-800 transition-all ${colorMap[action.color]}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
                {action.label}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function FamilyCard({ member }: { member: (typeof familyMembers)[0] }) {
  const statusConfig = {
    safe: { variant: 'safe' as const, label: 'Safe & Sound', ring: 'ring-success-200', bg: 'from-success-50' },
    warning: { variant: 'warning' as const, label: 'Needs Attention', ring: 'ring-warning-200', bg: 'from-warning-50' },
    danger: { variant: 'danger' as const, label: 'Critical', ring: 'ring-danger-200', bg: 'from-danger-50' },
  };
  const cfg = statusConfig[member.status];

  return (
    <Card className={`overflow-hidden ring-1 ${cfg.ring}`}>
      {/* Header strip */}
      <div className={`relative bg-gradient-to-r ${cfg.bg} to-white p-4`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-base font-bold text-ocean-700 shadow-sm">
              {member.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5">
              <StatusDot status={member.status} />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-ocean-900">{member.name}</p>
            <p className="text-xs text-ocean-700/60">{member.relation} · {member.boat}</p>
          </div>
          <Badge variant={cfg.variant}>{cfg.label}</Badge>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 p-4">
        {member.status === "danger" && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-3">
            <p className="text-xs font-bold text-red-700">
              ⚠ Border Proximity Alert
            </p>
            <p className="mt-1 text-xs text-red-600">
              Vessel is operating near restricted maritime zone.
            </p>
          </div>
        )}
        <div className="flex items-center gap-2.5 rounded-lg bg-ocean-50/50 px-3 py-2.5">
          <MapPin className="h-4 w-4 text-ocean-500" strokeWidth={2.2} />
          <div className="flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wide text-ocean-700/40">Location</p>
            <p className="text-xs font-semibold text-ocean-800">{member.location}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-ocean-50 px-3 py-2.5">
            <Clock className="h-4 w-4 text-ocean-400" strokeWidth={2.2} />
            <div>
              <p className="text-[10px] text-ocean-700/40">Last Update</p>
              <p className="text-xs font-semibold text-ocean-800">{member.lastUpdate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-ocean-50 px-3 py-2.5">
            <Navigation className="h-4 w-4 text-ocean-400" strokeWidth={2.2} />
            <div>
              <p className="text-[10px] text-ocean-700/40">ETA</p>
              <p className="text-xs font-semibold text-ocean-800">{member.eta}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-ocean-50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-ocean-400" strokeWidth={2.2} />
            <span className="text-xs font-medium text-ocean-700/60">Battery</span>
          </div>
          <BatteryBar level={member.battery} />
        </div>

        <div className="flex gap-2 pt-1">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-ocean-gradient py-2 text-xs font-semibold text-white transition hover:opacity-90">
            <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
            Call
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ocean-100 bg-white py-2 text-xs font-semibold text-ocean-700 transition hover:bg-ocean-50">
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
            Message
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-ocean-100 bg-white px-3 py-2 text-ocean-600 transition hover:bg-ocean-50">
            <Share2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </Card>
  );
}
