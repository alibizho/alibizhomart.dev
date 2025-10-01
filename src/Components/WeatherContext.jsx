import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  // Set default sunny weather so contact page loads immediately
  const [weather, setWeather] = useState({
    temp: 22,
    condition: "Sunny",
    localtime: new Date().toISOString().slice(0, 19).replace('T', ' '),
    isDefault: true
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const key = import.meta.env.VITE_API_WEATHER_KEY;
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${key}&q=Xian`
        );
        const data = await response.json();
        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          localtime: data.location.localtime,
          isDefault: false
        });
      } catch (err) {
        console.error('Weather fetch error', err);
        // Keep default weather if API fails
      }
    };

    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
}