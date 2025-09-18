import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Heart, Eye, Wind, Droplets, Sun, Thermometer } from 'lucide-react';

interface AQICardProps {
  location?: string;
  aqi?: number;
  pm10?: number;
  pm25?: number;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  uvIndex?: number;
  condition?: string;
  lastUpdated?: string;
}

const getAQILevel = (aqi: number) => {
  if (aqi <= 50) return { level: 'Good', color: 'success', bgColor: 'bg-success/20' };
  if (aqi <= 100) return { level: 'Moderate', color: 'moderate', bgColor: 'bg-moderate/20' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'warning', bgColor: 'bg-warning/20' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'unhealthy', bgColor: 'bg-unhealthy/20' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'destructive', bgColor: 'bg-destructive/20' };
  return { level: 'Hazardous', color: 'destructive', bgColor: 'bg-destructive/30' };
};

const getPMLevel = (value: number, type: 'pm25' | 'pm10') => {
  const thresholds = type === 'pm25' 
    ? [25, 50, 75, 100] 
    : [50, 100, 150, 200];
  
  if (value <= thresholds[0]) return 'Good';
  if (value <= thresholds[1]) return 'Moderate';
  if (value <= thresholds[2]) return 'Poor';
  if (value <= thresholds[3]) return 'Unhealthy';
  return 'Severe';
};

export default function AQICard({
  location = "Bagsewaniya, Bhopal, Madhya Pradesh, India",
  aqi = 58,
  pm10 = 35,
  pm25 = 13,
  temperature = 25,
  humidity = 89,
  windSpeed = 10,
  uvIndex = 0,
  condition = "Mist",
  lastUpdated = "06 Sep 2025, 08:39pm"
}: AQICardProps) {
  const aqiInfo = getAQILevel(aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-5xl mx-auto"
    >
      <Card className="overflow-hidden bg-slate-900/80 backdrop-blur-xl text-white border-slate-700/50 shadow-2xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Real-time Air Quality Index (AQI)</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10">
                  <MapPin size={16} className="mr-1" />
                  Locate me
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Heart size={16} />
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Eye size={16} />
                </Button>
              </div>
            </div>
            
            <h3 className="text-primary text-lg font-semibold mb-2">{location}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Last Updated: {lastUpdated} (Local Time)</span>
              </div>
              <span>Nearest Monitor: 4.1 km</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: AQI Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-300">Live AQI</span>
              </div>
              
              <div className="mb-6">
                <div className="text-7xl font-bold text-white mb-2">
                  {aqi}
                </div>
                <div className="text-sm text-slate-400 mb-4">(AQI-US)</div>
                
                <div className="mb-6">
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-xl font-bold">
                    {aqiInfo.level}
                  </span>
                </div>
              </div>

              {/* Air Quality Status */}
              <div className="text-sm text-slate-300 mb-6">
                Air Quality is
              </div>

              {/* PM Values */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">PM10:</span>
                  <span className="text-white font-semibold">{pm10} μg/m³</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">PM2.5:</span>
                  <span className="text-white font-semibold">{pm25} μg/m³</span>
                </div>
              </div>

              {/* AQI Scale */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Good</span>
                  <span>Moderate</span>
                  <span>Poor</span>
                  <span>Unhealthy</span>
                  <span>Severe</span>
                  <span>Hazardous</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 flex-1"></div>
                  <div className="bg-yellow-500 flex-1"></div>
                  <div className="bg-orange-500 flex-1"></div>
                  <div className="bg-red-500 flex-1"></div>
                  <div className="bg-purple-500 flex-1"></div>
                  <div className="bg-red-800 flex-1"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150</span>
                  <span>200</span>
                  <span>300</span>
                  <span>301+</span>
                </div>
              </div>
            </div>

            {/* Center: Character */}
            <div className="lg:col-span-1 flex items-center justify-center">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl lg:text-9xl"
              >
                🧒
              </motion.div>
            </div>

            {/* Right: Weather */}
            <div className="lg:col-span-1 space-y-4">
              {/* Temperature Card */}
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">☁️</div>
                  <div>
                    <div className="text-3xl font-bold text-white">{temperature}°C</div>
                    <div className="text-slate-400">{condition}</div>
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className="space-y-3">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets size={18} className="text-blue-400" />
                      <span className="text-slate-300">Humidity</span>
                    </div>
                    <span className="text-white font-semibold">{humidity}%</span>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wind size={18} className="text-green-400" />
                      <span className="text-slate-300">Wind Speed</span>
                    </div>
                    <span className="text-white font-semibold">{windSpeed} km/h</span>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun size={18} className="text-yellow-400" />
                      <span className="text-slate-300">UV Index</span>
                    </div>
                    <span className="text-white font-semibold">{uvIndex}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}