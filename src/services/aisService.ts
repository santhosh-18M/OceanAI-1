export function connectAIS(onVessel: (vessel: any) => void) {
    const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");

    socket.onopen = () => {
        console.log("AIS Connected");

        socket.send(
            JSON.stringify({
                APIKey: import.meta.env.VITE_AIS_API_KEY,
                BoundingBoxes: [
                    [
                        [7.5, 77.0],
                        [10.0, 80.0]
                    ]
                ],
                FilterMessageTypes: ["PositionReport"]
            })
        );
    };

    socket.onmessage = async (event) => {
        try {
            const text =
                event.data instanceof Blob
                    ? await event.data.text()
                    : event.data;

            console.log("RAW AIS:", text);

            const msg = JSON.parse(text);

            console.log("PARSED AIS:", msg);

            if (msg.Message?.PositionReport) {
                const report = msg.Message.PositionReport;

                onVessel({
                    mmsi: report.UserID,
                    lat: report.Latitude,
                    lng: report.Longitude,
                    name: report.Name || "Unknown",
                });
            }
        } catch (err) {
            console.error("AIS Parse Error:", err);
        }
    };

    socket.onerror = (e) => {
        console.log("AIS ERROR", e);
    };

    socket.onclose = (e) => {
        console.log("AIS CLOSED", e);
    };

    return socket;
}