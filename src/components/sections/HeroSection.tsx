import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wind, Shield, Bell } from 'lucide-react';
import AirParticles from '@/components/3d/AirParticles';
import AirQualityMap from '@/components/map/AirQualityMap';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        <AirQualityMap />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
      </div>
      
      <AirParticles />
      
      {/* Dark overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/10 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* AQI Status Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-slate-800/80 backdrop-blur-md rounded-full px-6 py-3 border border-slate-600/50">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-lg">Air Quality is Good</span>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Left: AQI Value */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-left lg:text-center"
            >
              <div className="text-8xl lg:text-9xl font-bold text-white mb-2">
                40
              </div>
              <div className="text-white/80 text-lg mb-4">AQI Level</div>
              <div className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xl">
                Good
              </div>
            </motion.div>

            {/* Center: Character & Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-8xl lg:text-9xl mb-6"
              >
                🧒
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight"
              >
                Breathe
                <span className="block bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Safe
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-lg text-white/90 mb-6 max-w-md"
              >
                Perfect air quality today! Great time for outdoor activities.
              </motion.p>
            </motion.div>

            {/* Right: Air Quality Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">PM2.5</span>
                  <span className="text-white font-bold">19 μg/m³</span>
                </div>
                <div className="text-sm text-green-400">Well below safe levels</div>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">PM10</span>
                  <span className="text-white font-bold">40 μg/m³</span>
                </div>
                <div className="text-sm text-green-400">Excellent conditions</div>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Health Impact</span>
                  <span className="text-green-400 font-bold">✓ Safe</span>
                </div>
                <div className="text-sm text-green-400">Perfect for all activities</div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 text-lg font-semibold shadow-lg"
            >
              <Shield className="mr-2" size={20} />
              Start Monitoring
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white/50 hover:bg-white/10 px-8 py-3 text-lg font-semibold"
            >
              <Bell className="mr-2" size={20} />
              Get Alerts
            </Button>
          </motion.div>

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex justify-center items-center gap-8 text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-200 rounded-full animate-pulse"></div>
              <span className="text-sm">Safe to Breathe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Personalized Alerts</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-4 h-4 bg-white/40 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-32 right-20 w-6 h-6 bg-white/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 left-20 w-5 h-5 bg-white/35 rounded-full blur-sm"
      />
    </section>
  );
}