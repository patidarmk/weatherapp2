import axios from 'axios';

const API_KEY = 'demo_key'; // In production, use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number };
  visibility: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

class WeatherService {
  private mockCurrentWeather: WeatherData = {
    name: 'London',
    sys: { country: 'GB' },
    main: {
      temp: 22,
      feels_like: 24,
      humidity: 65,
      pressure: 1013
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: { speed: 3.5 },
    visibility: 10000
  };

  private mockForecast: ForecastData = {
    list: [
      {
        dt: Date.now() / 1000 + 86400,
        main: { temp: 23, temp_min: 18, temp_max: 25 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        dt_txt: new Date(Date.now() + 86400000).toISOString()
      },
      {
        dt: Date.now() / 1000 + 172800,
        main: { temp: 20, temp_min: 16, temp_max: 22 },
        weather: [{ main: 'Clouds', description: 'few clouds', icon: '02d' }],
        dt_txt: new Date(Date.now() + 172800000).toISOString()
      },
      {
        dt: Date.now() / 1000 + 259200,
        main: { temp: 18, temp_min: 14, temp_max: 20 },
        weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
        dt_txt: new Date(Date.now() + 259200000).toISOString()
      },
      {
        dt: Date.now() / 1000 + 345600,
        main: { temp: 21, temp_min: 17, temp_max: 23 },
        weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
        dt_txt: new Date(Date.now() + 345600000).toISOString()
      },
      {
        dt: Date.now() / 1000 + 432000,
        main: { temp: 24, temp_min: 19, temp_max: 26 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        dt_txt: new Date(Date.now() + 432000000).toISOString()
      }
    ],
    city: { name: 'London', country: 'GB' }
  };

  async getCurrentWeather(city: string): Promise<WeatherData> {
    // Mock implementation - in production, replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...this.mockCurrentWeather,
          name: city.charAt(0).toUpperCase() + city.slice(1)
        });
      }, 500);
    });
  }

  async getForecast(city: string): Promise<ForecastData> {
    // Mock implementation - in production, replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...this.mockForecast,
          city: { name: city.charAt(0).toUpperCase() + city.slice(1), country: 'GB' }
        });
      }, 500);
    });
  }
}

export const weatherService = new WeatherService();