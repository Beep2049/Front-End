import { useState } from 'react'
import WeatherForm from './components/WeatherForm/WeatherForm.jsx';
import WeatherCard from './components/WeatherCard/WeatherCard.jsx';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast.jsx';
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");

    try{
      const response_c = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric`);
      const response_f = await fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric&cnt=40`);

      
      if(!response_c.ok){
        throw new Error('City not found');
      }
      const data_c = await response_c.json();
      setWeatherData(data_c);


      if(!response_f.ok){
        throw new Error('Forecast not found');
      }
      const data_f = await response_f.json();
      setForecastData(data_f);
      

    }catch (err){
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    }
  }

  return (
    <div className="App">
      <WeatherForm city={city} setCity={setCity} fetchWeather={fetchWeather}/>
      {error && <p className="error">Error: {error}</p>}
      <WeatherCard weatherData={weatherData}/>
     {forecastData && <WeeklyForecast forecastData={forecastData}/>}
    </div>
  );
};

export default App
