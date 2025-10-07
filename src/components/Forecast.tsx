import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ForecastData } from '@/services/weatherService';
import ForecastCard from './ForecastCard';

interface ForecastProps {
  data: ForecastData;
}

export default function Forecast({ data }: ForecastProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          5-Day Forecast
        </CardTitle>
        <p className="text-gray-600">
          {data.city.name}, {data.city.country}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.list.map((forecast, index) => (
            <ForecastCard key={index} forecast={forecast} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}