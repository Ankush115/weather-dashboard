import { useState } from "react";
import "./WeatherDashBoard.css";
import weatherData from "./weatherCities";

const WeatherDashBoard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [history, setHistory] = useState([]);
  const data = weatherData;

  const trendingCities = [...data]
    .sort((a, b) => b.temperature - a.temperature)
    .slice(0, 6);

  const searchCity = (cityName) => {
    const cityWeather = data.find(
      (item) => item.city.toLowerCase() === cityName.toLowerCase(),
    );
    if (cityWeather) {
      setWeather(cityWeather);
      setNotFound(false);

      if (!history.includes(cityWeather.city)) {
        setHistory([...history, cityWeather.city]);
      }
    } else {
      setWeather(null);
      setNotFound(true);
    }
  };

  const handleSearch = () => {
    searchCity(city);
  };
  return (
    <section className="weather-dashboard">
      <h1>Weather Report</h1>
      <p className="dashboard-subtitle">
        Local weather lookup for the top cities around the globe.
      </p>

      <div className="trending-row">
        <div className="trending-header">
          <span>Trending cities</span>
          <small>Top hottest cities</small>
        </div>
        <div className="trending-list">
          {trendingCities.map((item) => (
            <button
              type="button"
              key={item.id}
              className="trend-btn"
              onClick={() => searchCity(item.city)}
            >
              <span>{item.city}</span>
              <strong>{item.temperature}°</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="search-row">
        <div className="search-input-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            value={city}
            placeholder="Enter city name..."
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button type="button" className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div id="weatherData">
        {weather && (
          <article className="weather-card">
            <img
              className={`weather-icon ${weather.condition.toLowerCase()}`}
              src={weather.icon}
              alt={`${weather.condition} icon`}
            />
            <div className="weather-summary">
              <div>
                <strong>City :</strong>
                <span>{weather.city}</span>
              </div>
              <div>
                <strong>Temperature :</strong>
                <span>{weather.temperature}°C</span>
              </div>
              <div>
                <strong>Humidity :</strong>
                <span>{weather.humidity}%</span>
              </div>
              <div>
                <strong>Wind Speed :</strong>
                <span>{weather.windSpeed}km/h</span>
              </div>
              <div className="condition">
                {weather.condition}
              </div>
            </div>
          </article>
        )}

        {notFound && <div className="not-found">City not found.</div>}
      </div>

      <div className="previous-title">Recent searches</div>
      <div className="previous-searches">
        {history.map((searchedCity,) => (
          <button
            type="button"
            key={searchedCity}
            className="city-btn"
            onClick={() => searchCity(searchedCity)}
          >
            {searchedCity}
          </button>
        ))}
      </div>
    </section>
  );
};
export default WeatherDashBoard;
