import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { connectAIS } from "../services/aisService";

export default function LiveAISMap() {
    const [ships, setShips] = useState<any[]>([]);

    useEffect(() => {
        const ws = connectAIS((ship) => {
            setShips((prev) => {
                const existing = prev.filter(
                    (s) => s.mmsi !== ship.mmsi
                );

                return [...existing, ship];
            });
        });

        return () => ws.close();
    }, []);

    return (
        <MapContainer
            center={[8.8, 78.5]}
            zoom={8}
            style={{ height: "520px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {ships.map((ship) => (
                <Marker
                    key={ship.mmsi}
                    position={[ship.lat, ship.lng]}
                >
                    <Popup>
                        {ship.name}
                        <br />
                        MMSI: {ship.mmsi}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}