import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import { useState } from "react";

interface WeatherInfo {
  city: string;
  feels_like: number;
  humidity: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  weather: string;
}

function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    city: "Kathmandu",
    feels_like: 15.33,
    humidity: 59,
    temp: 16.12,
    tempMax: 16.12,
    tempMin: 16.12,
    weather: "few clouds",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateInfo = (newInfo: WeatherInfo) => {
    setWeatherInfo(newInfo);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="weather-app">
      <h2>Weather app by Sudip</h2>
      <SearchBox 
        updateInfo={updateInfo} 
        onError={handleError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {error && <p className="error-message">{error}</p>}
      <InfoBox info={weatherInfo} />
    </div>
  );
}

export default WeatherApp;
