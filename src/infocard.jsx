import React, { useState, useEffect } from "react";
import "./infocard.css";

const WeatherInfoCard = () => {
  const [location, setLocation] = useState("Kochi, IN");
  const [weather, setWeather] = useState({
    temp: "--",
    description: "Loading...",
    aqi: "--",
    noiseLevel: "--",
    humidity: "--",
    windSpeed: "--",
    pressure: "--",
    visibility: "--"
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        const url = `${API_URL}/api/weather?city=${encodeURIComponent(location)}`;
        console.log(url);

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setWeather({
            temp: data.temp,
            description: data.description,
            humidity: data.humidity,
            windSpeed: data.windSpeed,
            pressure: data.pressure,
            visibility: data.visibility,
            aqi: data.aqi,
            noiseLevel: data.noiseLevel,
          });
        } else {
          setWeather(prev => ({ ...prev, description: "Location not found" }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="weather-overlay">
      <div className="weather-card">
        <div className="weather-header">
          <div className="temp-climate">
            <span className="temperature">{weather.temp}</span>
            <span className="climate"> {weather.description}</span>
          </div>
          <div className="location-container">
            <span className="location-dot">⬤</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city, country"
              className="location-input"
            />
          </div>
        </div>

        <div className="weather-table">
          <div className="weather-row">
            <div className="weather-cell">⬤ Air Quality<br /><small>{weather.aqi}</small></div>
            <div className="weather-cell">⬤ Noise Level<br /><small>{weather.noiseLevel}</small></div>
          </div>
          <div className="weather-row">
            <div className="weather-cell">⬤ Humidity<br /><small>{weather.humidity}</small></div>
            <div className="weather-cell">⬤ Wind Speed<br /><small>{weather.windSpeed}</small></div>
          </div>
          <div className="weather-row">
            <div className="weather-cell">⬤ Pressure<br /><small>{weather.pressure}</small></div>
            <div className="weather-cell">⬤ Visibility<br /><small>{weather.visibility}</small></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoCard;
