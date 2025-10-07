import { Sun, Cloud, CloudRain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ForecastData } from '@/services/weatherService';

interface ForecastCardProps {
  forecast: ForecastData['list'][0];
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTemperature = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4 text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">
          {formatDate(forecast.dt_txt)}
        </div>
        
        <div className="flex justify-center mb-3">
          {getWeatherIcon(forecast.weather[0].main)}
        </div>
        
        <div className="space-y-1">
          <div className="text-lg font-bold text-gray-800">
            {formatTemperature(forecast.main.temp)}
          </div>
          <div className="text-xs text-gray-500">
            H: {formatTemperature(forecast.main.temp_max)} L: {formatTemperature(forecast.main.temp_min)}
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {forecast.weather[0].description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}