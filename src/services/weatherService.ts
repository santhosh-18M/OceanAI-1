export async function getMarineWeather() {
    const response = await fetch(
        "https://marine-api.open-meteo.com/v1/marine?latitude=9.0&longitude=79.0&current=wave_height,wave_period&hourly=wave_height,wave_period&timezone=auto"
    );

    const data = await response.json();

    console.log("MARINE API DATA:", data);

    return {
        waveHeight: data.current?.wave_height || 0,
        wavePeriod: data.current?.wave_period || 0,

        hourlyWaveHeight:
            data.hourly?.wave_height?.map((v: number | null) => v || 0) || [],
    };
}