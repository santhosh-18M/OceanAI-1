export async function getWeatherData() {
    const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=9.0&longitude=79.0&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,visibility"
    );

    const data = await response.json();

    console.log("WEATHER API DATA:", data);

    return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        pressure: data.current.pressure_msl,
        windSpeed: data.current.wind_speed_10m,
        visibility: (data.current.visibility || 0) / 1000,
    };
}