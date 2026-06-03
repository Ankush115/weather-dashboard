const projectPosition = (latitude, longitude) => ({
  left: `${((longitude + 180) / 360) * 100}%`,
  top: `${((90 - latitude) / 180) * 100}%`,
});

const WeatherMap = ({ cities, selectedCity }) => (
  <section className="map-section">
    <div className="map-heading">
      <span>Map view</span>
      <small>All cities plotted by location</small>
    </div>

    <div className="city-map" role="img" aria-label="World map with city locations">
      {cities.map((city) => {
        const position = projectPosition(city.latitude, city.longitude);
        const isActive = selectedCity === city.city;

        return (
          <button
            type="button"
            key={city.id}
            className={`city-marker${isActive ? " active" : ""}`}
            style={position}
            title={`${city.city} — ${city.temperature}°C`}
          >
            <span className="marker-dot" />
            <span className="marker-label">{city.city}</span>
          </button>
        );
      })}
    </div>
  </section>
);

export default WeatherMap;
