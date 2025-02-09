import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Droplets,
  Sprout,
  Sun,
  Wind,
  AlertTriangle,
} from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: string;
}

interface CropRecommendation {
  crop: string;
  confidence: number;
  timing: string;
  reasoning: string;
}

interface IrrigationAdvice {
  shouldIrrigate: boolean;
  nextSchedule: string;
  waterAmount: string;
  reason: string;
}

interface SmartWidgetsProps {
  weather?: WeatherData;
  cropRecommendations?: CropRecommendation[];
  irrigationAdvice?: IrrigationAdvice;
}

const defaultWeather: WeatherData = {
  temperature: 24,
  humidity: 65,
  windSpeed: 12,
  precipitation: 30,
  forecast: "Partly cloudy with occasional showers",
};

const defaultCropRecommendations: CropRecommendation[] = [
  {
    crop: "Tomatoes",
    confidence: 92,
    timing: "Ideal planting time in 3 days",
    reasoning: "Optimal soil temperature and moisture levels",
  },
  {
    crop: "Lettuce",
    confidence: 88,
    timing: "Plant now",
    reasoning: "Perfect growing conditions for leafy greens",
  },
];

const defaultIrrigationAdvice: IrrigationAdvice = {
  shouldIrrigate: true,
  nextSchedule: "Tomorrow morning, 6:00 AM",
  waterAmount: "2.5L per m²",
  reason: "Soil moisture below optimal levels",
};

const SmartWidgets = ({
  weather = defaultWeather,
  cropRecommendations = defaultCropRecommendations,
  irrigationAdvice = defaultIrrigationAdvice,
}: SmartWidgetsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Weather Widget */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weather Insights</h3>
          <Cloud className="h-6 w-6 text-blue-500" />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <span>{weather.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <span>{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-gray-500" />
              <span>{weather.precipitation}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{weather.forecast}</p>
        </div>
      </Card>

      {/* Crop Recommendations */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">AI Crop Recommendations</h3>
          <Sprout className="h-6 w-6 text-green-500" />
        </div>
        <div className="space-y-4">
          {cropRecommendations.map((rec, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{rec.crop}</span>
                <Badge variant="secondary">{rec.confidence}% Match</Badge>
              </div>
              <p className="text-sm text-gray-600">{rec.timing}</p>
              <p className="text-xs text-gray-500">{rec.reasoning}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Smart Irrigation */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Smart Irrigation</h3>
          <Droplets className="h-6 w-6 text-blue-500" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {irrigationAdvice.shouldIrrigate ? (
              <Badge className="bg-green-500">Irrigation Needed</Badge>
            ) : (
              <Badge variant="secondary">Irrigation Not Required</Badge>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Next Schedule:</span>{" "}
              {irrigationAdvice.nextSchedule}
            </p>
            <p className="text-sm">
              <span className="font-medium">Water Amount:</span>{" "}
              {irrigationAdvice.waterAmount}
            </p>
            <p className="text-sm text-gray-600">{irrigationAdvice.reason}</p>
          </div>
          {irrigationAdvice.shouldIrrigate && (
            <Button className="w-full" variant="outline">
              Start Irrigation
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SmartWidgets;
