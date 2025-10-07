import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { weatherService, WeatherData, ForecastData } from '@/services/weatherService';
import { showError } from '@/utils/toast';

export default function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('London');

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        weatherService.getCurrentWeather(cityName),
        weatherService.getForecast(cityName)
      ]);
      
      setCurrentWeather(weatherResponse);
      setForecast(forecastResponse);
      setCity(cityName);
    } catch (error) {
      showError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (newCity: string) => {
    fetchWeatherData(newCity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header onSearch={handleSearch} isLoading={loading} />
      
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
          </div>
        )}
      </main>
    </div>
  );
}