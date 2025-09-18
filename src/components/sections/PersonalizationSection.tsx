import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Heart, Activity, Clock, Target, Settings } from 'lucide-react';

const healthProfiles = [
  {
    name: "General Adult",
    description: "Standard air quality thresholds for healthy adults",
    thresholds: { pm25: 25, pm10: 50, aqi: 100 },
    color: "success",
    icon: User
  },
  {
    name: "Sensitive Individual",
    description: "Lower thresholds for people with respiratory conditions",
    thresholds: { pm25: 15, pm10: 30, aqi: 75 },
    color: "warning",
    icon: Heart
  },
  {
    name: "Athlete/Active",
    description: "Stricter limits for outdoor exercise and sports",
    thresholds: { pm25: 12, pm10: 25, aqi: 50 },
    color: "primary",
    icon: Activity
  },
  {
    name: "Elderly/Children",
    description: "Extra protective thresholds for vulnerable populations",
    thresholds: { pm25: 10, pm10: 20, aqi: 60 },
    color: "destructive",
    icon: Heart
  }
];

const timePreferences = [
  { time: "Early Morning", range: "5:00 - 8:00 AM", activity: "Morning walk/jog" },
  { time: "Commute Hours", range: "8:00 - 10:00 AM", activity: "Travel to work" },
  { time: "Lunch Break", range: "12:00 - 2:00 PM", activity: "Outdoor lunch" },
  { time: "Evening", range: "6:00 - 8:00 PM", activity: "Evening exercise" },
  { time: "Night", range: "8:00 PM - 11:00 PM", activity: "Evening activities" }
];

export default function PersonalizationSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Personalize Your Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Customize alert thresholds based on your health profile, lifestyle, and daily activities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Health Profile Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-primary" size={24} />
                  Health Profile
                </CardTitle>
                <CardDescription>
                  Choose a profile that matches your health needs and sensitivity to air pollution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthProfiles.map((profile, index) => {
                  const IconComponent = profile.icon;
                  return (
                    <motion.div
                      key={profile.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-border rounded-lg hover:bg-secondary/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full bg-${profile.color}/10`}>
                          <IconComponent size={20} className={`text-${profile.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{profile.name}</h3>
                            <Badge variant={profile.color as any} className="text-xs">
                              AQI ≤ {profile.thresholds.aqi}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {profile.description}
                          </p>
                          <div className="flex gap-4 text-xs">
                            <span>PM2.5: ≤{profile.thresholds.pm25}μg/m³</span>
                            <span>PM10: ≤{profile.thresholds.pm10}μg/m³</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Custom Thresholds */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="text-primary" size={24} />
                  Custom Thresholds
                </CardTitle>
                <CardDescription>
                  Fine-tune your alert thresholds for each pollutant type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label htmlFor="pm25-slider">PM2.5 Threshold</Label>
                      <Badge variant="outline">25 μg/m³</Badge>
                    </div>
                    <Slider
                      id="pm25-slider"
                      defaultValue={[25]}
                      max={100}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>5 μg/m³ (Very Strict)</span>
                      <span>100 μg/m³ (Lenient)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label htmlFor="pm10-slider">PM10 Threshold</Label>
                      <Badge variant="outline">50 μg/m³</Badge>
                    </div>
                    <Slider
                      id="pm10-slider"
                      defaultValue={[50]}
                      max={200}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>10 μg/m³ (Very Strict)</span>
                      <span>200 μg/m³ (Lenient)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Label htmlFor="aqi-slider">AQI Overall Threshold</Label>
                      <Badge variant="outline">100 AQI</Badge>
                    </div>
                    <Slider
                      id="aqi-slider"
                      defaultValue={[100]}
                      max={300}
                      min={25}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>25 AQI (Very Strict)</span>
                      <span>300 AQI (Lenient)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold mb-4">Alert Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="instant-alerts">Instant Alerts</Label>
                      <Switch id="instant-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="forecast-alerts">Daily Forecast</Label>
                      <Switch id="forecast-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trend-alerts">Trend Analysis</Label>
                      <Switch id="trend-alerts" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Time-Based Preferences */}
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
                Activity-Based Monitoring
              </CardTitle>
              <CardDescription>
                Set different sensitivity levels based on your daily activities and schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timePreferences.map((pref, index) => (
                  <motion.div
                    key={pref.time}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border border-border rounded-lg bg-secondary/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{pref.time}</h4>
                      <Switch defaultChecked={index < 3} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{pref.range}</p>
                    <p className="text-xs text-primary">{pref.activity}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}