import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

const aqiLocations = [
  { name: "Delhi", coordinates: [77.1025, 28.7041], aqi: 350, level: "Hazardous", color: "#8B0000" },
  { name: "Mumbai", coordinates: [72.8777, 19.0760], aqi: 87, level: "Moderate", color: "#FFD700" },
  { name: "Bangalore", coordinates: [77.5946, 12.9716], aqi: 42, level: "Good", color: "#32CD32" },
  { name: "Chennai", coordinates: [80.2707, 13.0827], aqi: 156, level: "Unhealthy", color: "#FF8C00" },
  { name: "Kolkata", coordinates: [88.3639, 22.5726], aqi: 201, level: "Very Unhealthy", color: "#FF4500" },
  { name: "Hyderabad", coordinates: [78.4867, 17.3850], aqi: 95, level: "Moderate", color: "#FFD700" },
  { name: "Pune", coordinates: [73.8567, 18.5204], aqi: 78, level: "Moderate", color: "#FFD700" },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225], aqi: 132, level: "Unhealthy for Sensitive", color: "#FFA500" },
];

const AirQualityMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [77.1025, 28.7041], // Delhi coordinates
      zoom: 10,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add AQI data points
      aqiLocations.forEach((location) => {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.style.cssText = `
          width: 40px;
          height: 40px;
          background: ${location.color};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        `;
        markerElement.textContent = location.aqi.toString();

        // Add marker to map
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(location.coordinates as [number, number])
          .addTo(map.current!);

        // Add popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          className: 'aqi-popup'
        }).setHTML(`
          <div style="padding: 10px; min-width: 150px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${location.name}</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="color: #666;">AQI:</span>
              <span style="font-weight: bold; color: ${location.color};">${location.aqi}</span>
            </div>
            <div style="font-size: 12px; color: ${location.color}; font-weight: 500;">
              ${location.level}
            </div>
          </div>
        `);

        markerElement.addEventListener('click', () => {
          popup.setLngLat(location.coordinates as [number, number]).addTo(map.current!);
        });
      });

      setMapInitialized(true);
      setShowTokenInput(false);
    });

    // Add pulse animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      .aqi-popup .mapboxgl-popup-content {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      .aqi-popup .mapboxgl-popup-tip {
        border-top-color: white;
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  return (
    <div className="w-full h-[400px] relative">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.52581674093!2d76.76358307691756!3d28.64368474706565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1757172938522!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{border: 0}} 
        allowFullScreen={true}
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg"
      />
      
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Delhi Map - Satellite Available</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white p-3 rounded-lg text-xs backdrop-blur-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Unhealthy (101-200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-700"></div>
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-[400px] relative">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg overflow-hidden" />
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live Air Quality Data</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/70 text-white p-3 rounded-lg text-xs backdrop-blur-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Unhealthy (101-200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-700"></div>
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityMap;