import './WeatherForm.modules.css';

export default function WeatherForm({city, setCity, fetchWeather}){
    function handleChange(e){
        setCity(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        fetchWeather();
        setCity("");
    };

    return(
        <form className="weatherForm" onSubmit={handleSubmit}>
            <h2 className="form-header">Welcome to the Weather App</h2>
            <p className="form-description">Please enter the name of the city in order to get info on the weather!</p>
            <input
            type="text"
            placeholder="Enter city name"
            onChange={handleChange}
            value={city}
            />
            <button>Get Weather</button>
        </form>
    );
}