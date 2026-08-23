// src/services/fishService.ts

export async function getFishRecommendations() {
    try {
        const res = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=8.72&longitude=78.08&current=temperature_2m"
        );

        const weather = await res.json();

        console.log("WEATHER:", weather);

        const temp = weather.current?.temperature_2m || 28;

        return [
            {
                species: "Yellowfin Tuna",
                probability: temp > 28 ? 90 : 75,
                zone: "22nm SE of Tuticorin",
                expectedKg: "80-120 kg",
                confidence: "high",
            },
        ];
    } catch (err) {
        console.error(err);

        return [
            {
                species: "Yellowfin Tuna",
                probability: 75,
                zone: "22nm SE of Tuticorin",
                expectedKg: "80-120 kg",
                confidence: "high",
            },
        ];
    }
}