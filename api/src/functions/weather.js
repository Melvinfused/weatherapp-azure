const { app } = require("@azure/functions");

app.http("weather", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        const city = request.query.get("city");

        if (!city) {
            return {
                status: 400,
                jsonBody: {
                    error: "City is required"
                }
            };
        }

        try {
            const apiKey = process.env.OPENWEATHER_API_KEY;

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
            );

            const data = await response.json();

            if (!response.ok) {
                return {
                    status: response.status,
                    jsonBody: {
                        error: data.message || "Location not found"
                    }
                };
            }

            return {
                status: 200,
                jsonBody: {
                    temp: `${data.main.temp}°C`,
                    description: data.weather[0].description,
                    humidity: `${data.main.humidity}%`,
                    windSpeed: `${data.wind.speed} m/s`,
                    pressure: `${data.main.pressure} hPa`,
                    visibility: `${(data.visibility / 1000).toFixed(1)} km`,
                    aqi: "--",
                    noiseLevel: "-- dB"
                }
            };
        } catch (error) {
            context.error(error);

            return {
                status: 500,
                jsonBody: {
                    error: "Internal server error"
                }
            };
        }
    }
});
