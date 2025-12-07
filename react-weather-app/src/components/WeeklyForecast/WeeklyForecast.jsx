import './WeeklyForecast.css';

export default function WeeklyForecast({forecastData}){

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {weekday: 'short'});
    }

    const getDailyForecast = () => {
        const forecastsByDay = {};
        forecastData.list.forEach(item =>{
            const date = new Date(item.dt * 1000).toDateString();
            if(!forecastsByDay[date]){
                forecastsByDay[date] = item;
            }
        });

        return Object.values(forecastsByDay).slice(0, 7);
    };

    const dailyForecasts = Array.isArray(forecastData)
        ? forecastData.slice(0, 8)
        : getDailyForecast();

    return (
       <div className="weekly-forecast">
         <h3 className="forecast-title">Weekly Forecast:</h3>
         <div className="forecast-grid">
           {dailyForecasts.map((day, index) => (
             <div key={index} className="forecast-day">
               <p className="forecast-date">{formatDate(day.dt)}</p>
               <img 
                 src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                 alt={day.weather[0].description}
                 className="forecast-icon"
               />
               <div className="forecast-temp">
                 <span className="high-low-temp">{Math.round(day.main?.temp_max)}° | {Math.round(day.main?.temp_min)}°</span>
               </div>
               <p className="forecast-description">{day.weather[0].description.toUpperCase()}</p>
             </div>
           ))}
         </div>
       </div>
     );
}