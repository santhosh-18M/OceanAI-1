import { useState, useEffect } from 'react';
import { Siren, X, Radio, MapPin, Phone, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';

export function SOSOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [seconds, setSeconds] = useState(5);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setSeconds(5);
      setSent(false);
      return;
    }
    if (seconds <= 0) {
      setSent(true);
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [open, seconds]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ocean-950/40 backdrop-blur-sm"
        onClick={sent ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-slide-up px-4">
        <div className="overflow-hidden rounded-3xl border border-danger-200/50 bg-white shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-danger-500 via-danger-600 to-danger-700 p-6 text-center">
            <div className="absolute inset-0 water-texture opacity-20" />
            <div className="relative">
              {!sent ? (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Siren className="h-8 w-8 text-white animate-pulse" strokeWidth={2.2} />
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold text-white">SOS Emergency</h2>
                  <p className="mt-1 text-sm text-white/80">
                    Broadcasting distress signal in {seconds} second{seconds !== 1 ? 's' : ''}...
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2.2} />
                  </div>
                  <h2 className="mt-4 text-2xl font-extrabold text-white">Signal Sent</h2>
                  <p className="mt-1 text-sm text-white/80">Coast Guard & family notified</p>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {!sent ? (
              <>
                {/* Countdown ring */}
                <div className="flex justify-center">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="h-24 w-24 -rotate-90">
                      <circle cx="48" cy="48" r="42" fill="none" stroke="#fee2e2" strokeWidth="6" />
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - seconds / 5)}
                        className="transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    <span className="absolute text-3xl font-extrabold text-danger-600">{seconds}</span>
                  </div>
                </div>

                {/* Broadcast targets */}
                <div className="mt-5 space-y-2">
                  <BroadcastRow icon={Radio} label="VHF Channel 16" detail="Marine emergency frequency" />
                  <BroadcastRow icon={Shield} label="Indian Coast Guard" detail="MRCC Chennai — automated" />
                  <BroadcastRow icon={Phone} label="Family Contacts" detail="3 registered numbers" />
                  <BroadcastRow icon={MapPin} label="GPS Location" detail="8.72°N, 78.08°E — live tracking" />
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-warning-50 p-3">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-warning-600" strokeWidth={2.2} />
                  <p className="text-[11px] leading-relaxed text-warning-700">
                    This will broadcast your live location to emergency services. Cancel if unintended.
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-ocean-100 bg-white py-3 text-sm font-bold text-ocean-700 transition hover:bg-ocean-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSeconds(0)}
                    className="flex-1 rounded-xl bg-gradient-to-br from-danger-500 to-danger-600 py-3 text-sm font-bold text-white shadow-glow-danger transition hover:scale-[1.02]"
                  >
                    Send Now
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <SentRow icon={Radio} label="VHF distress signal" time="Broadcasting" active />
                  <SentRow icon={Shield} label="Coast Guard notified" time="2s ago" active />
                  <SentRow icon={Phone} label="Family SMS sent" time="3s ago" active />
                  <SentRow icon={MapPin} label="Live GPS sharing" time="Active" active />
                </div>

                <div className="mt-5 rounded-2xl bg-gradient-to-br from-success-50 to-white p-4 text-center">
                  <p className="text-xs font-semibold text-success-700">
                    Estimated response: <span className="font-extrabold">18 minutes</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-ocean-700/60">
                    Coast Guard helicopter dispatched from Tuticorin base
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ocean-gradient py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BroadcastRow({ icon: Icon, label, detail }: { icon: typeof Radio; label: string; detail: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ocean-50 p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-50 text-danger-600">
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-ocean-900">{label}</p>
        <p className="text-[11px] text-ocean-700/50">{detail}</p>
      </div>
      <span className="h-2 w-2 rounded-full bg-danger-500 animate-pulse" />
    </div>
  );
}

function SentRow({ icon: Icon, label, time, active }: { icon: typeof Radio; label: string; time: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-success-100 bg-success-50/40 p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-100 text-success-600">
        <Icon className="h-4 w-4" strokeWidth={2.2} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-ocean-900">{label}</p>
        <p className="text-[11px] text-ocean-700/50">{time}</p>
      </div>
      {active && <CheckCircle2 className="h-4 w-4 text-success-500" strokeWidth={2.5} />}
    </div>
  );
}
