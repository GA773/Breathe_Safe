import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Bell, Mail, Smartphone, MessageCircle } from 'lucide-react';
import AirQualityMap from '@/components/map/AirQualityMap';

const alertRules = [
  {
    id: 1,
    location: "Home - New Delhi",
    pollutant: "PM2.5",
    threshold: 120,
    timeRange: "6:00 AM - 8:00 AM",
    method: "Email + Push",
    status: "active"
  },
  {
    id: 2,
    location: "Office - Gurgaon",
    pollutant: "PM10",
    threshold: 150,
    timeRange: "8:00 AM - 6:00 PM",
    method: "Telegram",
    status: "active"
  },
  {
    id: 3,
    location: "Gym - Connaught Place",
    pollutant: "AQI",
    threshold: 100,
    timeRange: "7:00 PM - 9:00 PM",
    method: "Push",
    status: "paused"
  }
];

const aqiData = [
  { location: "Delhi", aqi: 350, level: "Hazardous", color: "destructive" },
  { location: "Mumbai", aqi: 87, level: "Moderate", color: "moderate" },
  { location: "Bangalore", aqi: 42, level: "Good", color: "success" },
  { location: "Chennai", aqi: 156, level: "Unhealthy", color: "unhealthy" },
];

export default function DashboardSection() {
  return (
    <section className="py-20 bg-gradient-air min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Air Quality Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor, configure, and manage your personalized air quality alerts all in one place.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Real-time Globe Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary" size={24} />
                  Live Air Quality Map
                </CardTitle>
                <CardDescription>
                  Interactive 3D visualization of global air quality data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AirQualityMap />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {aqiData.map((data, index) => (
                    <motion.div
                      key={data.location}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{data.location}</p>
                        <p className="text-sm text-muted-foreground">{data.level}</p>
                      </div>
                      <Badge variant={data.color as any} className="font-bold">
                        {data.aqi}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alert Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="text-primary" size={24} />
                  Create New Alert Rule
                </CardTitle>
                <CardDescription>
                  Set up personalized air quality monitoring for your locations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="Enter your location (e.g., Home, Office)"
                    className="bg-background/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pollutant">Pollutant</Label>
                    <Select>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select pollutant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pm25">PM2.5</SelectItem>
                        <SelectItem value="pm10">PM10</SelectItem>
                        <SelectItem value="aqi">AQI Overall</SelectItem>
                        <SelectItem value="ozone">Ozone</SelectItem>
                        <SelectItem value="no2">NO2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="threshold">Threshold</Label>
                    <Input 
                      id="threshold" 
                      type="number" 
                      placeholder="e.g., 120"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input 
                      id="start-time" 
                      type="time" 
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time" 
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notification Method</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Smartphone size={16} />
                      Push
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageCircle size={16} />
                      Telegram
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Create Alert Rule
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Existing Alert Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-primary" size={24} />
                Active Alert Rules
              </CardTitle>
              <CardDescription>
                Manage your existing air quality monitoring rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule, index) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin size={16} className="text-primary" />
                        <span className="font-semibold">{rule.location}</span>
                        <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                          {rule.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Alert when {rule.pollutant} exceeds {rule.threshold} μg/m³ between {rule.timeRange}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Notify via: {rule.method}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        {rule.status === 'active' ? 'Pause' : 'Activate'}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
