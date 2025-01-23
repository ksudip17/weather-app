import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import { useState } from "react";

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Kathmandu",
    feels_like: 15.33,
    humidity: 59,
    temp: 16.12,
    tempMax: 16.12,
    tempMin: 16.12,
    weather: "few clouds",
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div>
      <h2>Weather app by Sudip</h2>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}

export default WeatherApp;
