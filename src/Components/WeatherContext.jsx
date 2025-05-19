import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const key = import.meta.env.VITE_API_WEATHER_KEY;
        const { data } = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${key}&q=Xian`
        );
        setWeather({
          temp: data.current.temp_c,
          condition: data.current.condition.text,
          localtime: data.location.localtime,
        });
      } catch (err) {
        console.error('Weather fetch error', err);
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