import { ShieldAlert, Radio, Siren, Shield, Bell, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getLiveVessels } from "@/services/boatService";

export function BorderView() {
  const [boats, setBoats] = useState<any[]>([]);

  useEffect(() => {
    getLiveVessels().then(setBoats);
  }, []);
  const dangerBoats = boats.filter((boat) => boat.distanceFromBorderKm < 15);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-red-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Siren size={35} />
          <div>
            <h1 className="text-2xl font-bold">
              Sri Lanka Maritime Border Protection System
            </h1>
            <p>
              {dangerBoats.length} boats near Sri Lankan waters
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">

              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm">Total Vessels</p>
                <p className="text-2xl font-bold">{boats.length}</p>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm">Warning Zone</p>
                <p className="text-2xl font-bold">
                  {boats.filter(b => b.distanceFromBorderKm < 15).length}
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm">Critical Zone</p>
                <p className="text-2xl font-bold">
                  {boats.filter(b => b.distanceFromBorderKm < 5).length}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-red-100 p-4 rounded-xl">
          <h2 className="font-bold text-red-700">Critical Zone</h2>
          <p>Less than 5 km</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-xl">
          <h2 className="font-bold text-yellow-700">Warning Zone</h2>
          <p>Less than 15 km</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl">
          <h2 className="font-bold text-green-700">Safe Zone</h2>
          <p>More than 15 km</p>
        </div>
      </div>

      {/* Boats */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShieldAlert />
          Vessel Monitoring
        </h2>

        <div className="space-y-4">

          {boats.length === 0 && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <h3 className="font-bold text-green-700">
                All Vessels Safe
              </h3>

              <p className="mt-2 text-sm text-green-600">
                No vessels are currently operating near the Sri Lankan maritime border.
              </p>
            </div>
          )}

          {boats.map((boat) => {
            const critical = boat.distanceFromBorderKm < 5;
            const warning =
              boat.distanceFromBorderKm >= 5 &&
              boat.distanceFromBorderKm < 15;

            return (
              <div
                key={boat.id}
                className={`border rounded-xl p-4 ${critical
                  ? "border-red-500 bg-red-50"
                  : warning
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-green-500 bg-green-50"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{boat.name}</h3>
                    <p>{boat.fisherName}</p>
                    <p className="text-sm">
                      📍 {boat.lat}, {boat.lng}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-xl">
                      {boat.distanceFromBorderKm} km
                    </p>
                    <p>to Sri Lanka Border</p>
                  </div>
                </div>

                <div className="mt-3">
                  <p>🔋 Battery: {boat.battery}%</p>
                  <p>📶 Signal: {boat.signal}%</p>
                  <p>🎣 Catch: {boat.catchKg} kg</p>
                </div>

                {boat.distanceFromBorderKm < 15 && (
                  <button
                    onClick={() =>
                      alert(`Recall signal sent to ${boat.name}`)
                    }
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Radio size={16} />
                    Send Recall Signal
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Protocols */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield />
          Safety Protocols
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-xl p-4">
            <h3 className="font-bold">3 Stage Alert</h3>
            <p>15 km → Warning</p>
            <p>8 km → High Warning</p>
            <p>5 km → Critical Alert</p>
          </div>

          <div className="border rounded-xl p-4">
            <Radio className="mb-2 text-green-600" />
            <h3 className="font-bold">Auto Recall</h3>
            <p>
              Sends recall messages automatically to fishermen.
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <CheckCircle2 className="mb-2 text-purple-600" />
            <h3 className="font-bold">Family Notification</h3>
            <p>
              Alerts family members when boat enters danger zone.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BorderView;