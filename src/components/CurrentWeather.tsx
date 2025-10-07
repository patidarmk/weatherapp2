import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-500" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-500" />;
    }
  };

  const formatTemperature = (temp: number) => `${Math.round(temp)}°C`;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Current Weather
        </CardTitle>
        <p className="text-gray-600">
          {data.name}, {data.sys.country}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(data.weather[0].main)}
            <div>
              <div className="text-4xl font-bold text-gray-800">
                {formatTemperature(data.main.temp)}
              </div>
              <div className="text-gray-600 capitalize">
                {data.weather[0].description}
              </div>
              <div className="text-sm text-gray-500">
                Feels like {formatTemperature(data.main.feels_like)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Wind</div>
                <div className="font-semibold">{data.wind.speed} m/s</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="font-semibold">{data.main.humidity}%</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Pressure</div>
                <div className="font-semibold">{data.main.pressure} hPa</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Visibility</div>
                <div className="font-semibold">{(data.visibility / 1000).toFixed(1)} km</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}