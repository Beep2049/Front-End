import { useState } from "react";
import { useEffect } from "react";
import './WeatherCard.modules.css';

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
}

export default function WeatherCard({weatherData}){
    const [isCelsius, setIsCelsius] = useState(true);
    const [umbrellaCheck, setUmbrellaCheck] = useState("");

    const toggleTemperature = () =>{
        setIsCelsius(!isCelsius);
    }

    const renderTemperature = (temperature) =>{
        if(isCelsius){
            return Math.round(temperature);
        }else{
            return Math.round((temperature * 9) / 5 + 32);
        }
    }

    useEffect(() =>{
        if(weatherData){
            const hasRain =  weatherData.rain && (weatherData.rain['1h'] || weatherData.rain['3h']);

            if(hasRain){
                setUmbrellaCheck("BRING YOUR UMBRELLA");
            }else{
                setUmbrellaCheck("No rain today");
            }
        }
    }, [weatherData]);

    return(
        <>
            {weatherData && (
                <>
                    <div className="card-container">
                        <p className="date">For {new Date(weatherData.dt * 1000).toLocaleDateString("en-US", options)}:</p>
                        <h2 className="city">{weatherData.name}, {weatherData.sys?.country}</h2>
                        <img className="icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                            alt={weatherData.weather[0].description}
                            />
                        <p className="description">
                            {weatherData.weather[0].description.toUpperCase()}
                        </p>
                        <div className="temperature">
                            {renderTemperature(weatherData.main.temp)}
                            <sup className="temp-unit" onClick={toggleTemperature}>
                                {isCelsius ? "C" : "F"}° | {isCelsius ? "F" : "C"}°
                            </sup>
                        </div>
                        <div className="weather-details">
                            <div className="col">
                                <div>
                                    <p className="col-header">Wind Speed:</p>
                                    <p className="col-data">{weatherData.wind.speed} m/s</p>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <p className="col-header">Rain Check:</p>
                                    <p className="col-data">{umbrellaCheck}</p>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <p className="col-header">Humidity:</p>
                                    <p className="col-data">{weatherData.main.humidity}%</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </>
            )}
        </>
    );
}