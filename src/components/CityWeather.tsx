import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import './forecast.css'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { url } from 'inspector';

Chart.register(...registerables);


const CityWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const location = useLocation();
  const backgrounddata = useState<any>('../../public/rain-background.jpg');
  const query = new URLSearchParams(location.search);
  const lon = query.get('lon');
  const lat = query.get('lat');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current weather data
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d1403a1c0fb9763426a93062c575d373`
        );
        setWeatherData(weatherResponse.data);

        // Fetch forecast data
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d1403a1c0fb9763426a93062c575d373`
        );
        setForecastData(forecastResponse.data.list);

      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (lat && lon) {
      fetchData();
    }
  }, [lat, lon]);
  
  return (
    <div className="city-weather app">
      {/* Current weather */}
      {weatherData && (
        <div className="city-weather">
          {weatherData && (
            <>
              <div className='flex-container'>
                <div className='box'>
                  <h2 className='align-center'>{weatherData.name}</h2>
                </div>

                <div className='box'>
                  <h1>Description: </h1>
                  <h2>{weatherData.weather[0].description}</h2>
                </div>
                <div className='box'>
                  <h1>Temperature: </h1>
                  <h2>{(weatherData.main.temp - 273.15).toFixed(2)}°C</h2>
                  {/* <h2>{(weatherData.main.temp_min-273.15).toFixed(2)}°C</h2> */}
                  {/* <h2>{(weatherData.main.temp_max-273.15).toFixed(2)}°C</h2> */}
                </div>


                <div className='flex-row box'>
                  <div className='box'>
                    <h1>Humidity: </h1>
                    <h2>{weatherData.main.humidity}%</h2>
                  </div>
                  <div className='box'><h1>Wind Speed: </h1>
                    <h2> {weatherData.wind.speed} m/s </h2>
                  </div>
                </div>
                <div className='box'>
                  <Bar className='bar'
                    data={{
                      labels: forecastData.map((forecast) => new Date(forecast.dt * 1000).toLocaleDateString()),
                      datasets: [{
                        label: 'Temperature',
                        data: forecastData.map((forecast) => forecast.main.temp - 273.15),
                        backgroundColor: 'rgba(230, 126, 34, 0.6)',
                      }]
                      
                    }}
                  />
                </div>
                <div className='flex-row box'>
                  <div className='box'> <h1>Sunrise: </h1><h2>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</h2></div>
                  <div className='box'><h1>Sunset: </h1><h2>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</h2></div>
                </div>
                <div className='flex-row box'>
                  <div className='box'>Visibility: {(weatherData.visibility / 1000).toFixed(2)} km</div>
                  <div className='box'>Cloud Coverage: {weatherData.clouds.all}%</div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Forecast */}
      {forecastData.length > 0 && (
        <div className="forecast box ">
          <h2>Forecast</h2>
          <div className="forecast-scroll">
            {forecastData.map((forecast: any, index: number) => (
              <div className="forecast-item" key={index}>
                <h3>{new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
                <div>Description: {forecast.weather[0].description}</div>
                <div>Temperature: {(forecast.main.temp - 273.15).toFixed(2)}°C</div>
                <div>Humidity: {forecast.main.humidity}%</div>
                <div>Wind Speed: {forecast.wind.speed} m/s</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CityWeather;
