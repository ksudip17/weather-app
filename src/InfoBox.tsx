import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

interface WeatherInfo {
  city: string;
  feels_like: number;
  humidity: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  weather: string;
}

interface InfoBoxProps {
  info: WeatherInfo;
}

export default function InfoBox({ info }: InfoBoxProps) {
  const HOT_URL =
    "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const COLD_URL =
    "https://images.unsplash.com/photo-1687265051328-3d9c67034cef?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const RAIN_URL =
    "https://images.unsplash.com/photo-1686307118067-e29926ee400d?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const getWeatherIcon = () => {
    if (info.humidity > 85) return <ThunderstormIcon />;
    if (info.temp > 15) return <WbSunnyIcon />;
    return <AcUnitIcon />;
  };

  const getWeatherImage = () => {
    if (info.humidity > 85) return RAIN_URL;
    if (info.temp > 15) return HOT_URL;
    return COLD_URL;
  };

  return (
    <div className="info-box">
      <div className="card-container">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={getWeatherImage()}
            title={`Weather in ${info.city}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city} {getWeatherIcon()}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <b>
                <p>Temperature: {info.temp}&deg;C</p>
                <p>Humidity: {info.humidity}%</p>
                <p>Temp Max: {info.tempMax}&deg;C</p>
                <p>Temp Min: {info.tempMin}&deg;C</p>
                <p>Feels like: {info.feels_like}&deg;C</p>
              </b>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
