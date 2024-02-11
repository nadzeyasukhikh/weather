import React, { useEffect, useState } from "react";
import styles from "./Main.module.css"
import Map from "./Map"
function Main() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Thessaloniki');
    const apiKey = process.env.REACT_APP_API_KEY; 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const timeString = currentTime.toLocaleTimeString();
    const dateString = currentTime.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

    const fetchWeather = async () => {
        if (!city.trim()) {
          setError('city ​​not found');
          setWeather(null);
          return;
        }
    
        setIsLoading(true);
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
          const response = await fetch(url);
          const data = await response.json();
          if (response.ok) {
            setWeather(data);
            setError('');
          } else {
            setError(data.message || 'Failed to load weather data.');
            setWeather(null);
          }
        } catch (err) {
          setError('error');
          setWeather(null);
        } finally {
          setIsLoading(false);
        }
      };
    
      
      useEffect(() => {
        fetchWeather();
        const timer = setInterval(() => {
          setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
        
      }, []);
    
      const handleCityChange = event => {
        setCity(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault(); 
        setCity("");
        fetchWeather();
      };
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    
      const formatTime = timestamp => {
        const date = new Date(timestamp * 1000);
        return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`;
    };
    return (
     
        <div className={styles.mainDiv}>
          <div className={styles.time}>
                <p className={styles.timeStyle}>{timeString}</p>
                <p className={styles.timeStyle}>{dateString}</p>
            </div>
           <form onSubmit={handleSubmit}>
        <div className="search-box">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city..."
            className="search-bar"
          />
          <button type="submit">get weather</button>
        </div>
      </form>
            {weather && (
                <div className="weather-box">
                    <h2>{weather.name}</h2>
                    <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
                    <p>Coordinates: Latitude {weather.coord.lat}, Longitude {weather.coord.lon}</p>
                    <p>Temperature: {Math.round(weather.main.temp)}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Sunrise: {formatTime(weather.sys.sunrise)}</p>
                    <p>Sunset: {formatTime(weather.sys.sunset)}</p>
                </div>
                
            )}
            <Map center={{ lat: weather.coord.lat, lng: weather.coord.lon }} />
        </div>
    );
}

export default Main;