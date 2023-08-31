import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="app-container">
      <svg className="background-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFFFFF" d="M51,-63.8C59.9,-53.2,56.8,-31.3,60.4,-10.7C64,10,74.3,29.4,68.2,38.8C62.1,48.1,39.5,47.3,23.1,45.4C6.7,43.5,-3.5,40.5,-11.8,36C-20.2,31.4,-26.8,25.3,-35,17.2C-43.2,9.1,-53.1,-1,-57.4,-15.9C-61.6,-30.8,-60.2,-50.5,-49.7,-60.8C-39.2,-71.1,-19.6,-72,0.7,-72.9C21,-73.7,42,-74.4,51,-63.8Z" transform="translate(100 100)" />
      </svg>
      <svg className="background-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFFFFF" d="M24.1,-14.5C27.8,3.6,25.1,17.2,12.4,29.2C-0.3,41.3,-22.9,52,-31,45.4C-39.2,38.9,-32.9,15.1,-25.3,-8.3C-17.7,-31.7,-8.8,-54.7,0.7,-55C10.2,-55.2,20.4,-32.6,24.1,-14.5Z" transform="translate(100 100)" />
      </svg>
      

      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </div>
  );
}

export default App;