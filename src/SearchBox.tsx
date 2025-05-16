import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface WeatherInfo {
  city: string;
  feels_like: number;
  humidity: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  weather: string;
}

interface SearchBoxProps {
  updateInfo: (info: WeatherInfo) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

function SearchBox({ updateInfo, onError, isLoading, setIsLoading }: SearchBoxProps) {
  const [city, setCity] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "3eb3fac69edc782247d8821f2ce84a34";

  const getWeatherInfo = async (): Promise<WeatherInfo> => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error("City not found");
      }

      const jsonResponse = await response.json();

      return {
        city: city,
        weather: jsonResponse.weather[0].description,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feels_like: jsonResponse.main.feels_like,
      };
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    try {
      evt.preventDefault();
      setIsLoading(true);
      onError("");
      
      if (!city.trim()) {
        throw new Error("Please enter a city name");
      }

      const newInfo = await getWeatherInfo();
      setCity("");
      updateInfo(newInfo);
    } catch (error) {
      onError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="Search city"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          disabled={isLoading}
        />
        <br />
        <br />
        <Button 
          variant="contained" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </form>
    </div>
  );
}

export default SearchBox;
