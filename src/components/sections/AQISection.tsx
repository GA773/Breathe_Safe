import { motion } from 'framer-motion';
import AQICard from '@/components/AQICard';
import AirQualityMap from '@/components/map/AirQualityMap';

export default function AQISection() {
  return (
    <section className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <AirQualityMap />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="flex bg-slate-800/50 rounded-lg p-1 backdrop-blur-sm border border-slate-700/50">
              <button className="px-6 py-2 bg-primary text-white rounded-md font-medium flex items-center gap-2">
                🌬️ AQI
              </button>
              <button className="px-6 py-2 text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-2">
                ☀️ Weather
              </button>
            </div>
          </motion.div>

          {/* Main AQI Card */}
          <div className="flex justify-center">
            <AQICard />
          </div>
        </div>
      </div>
    </section>
  );
}