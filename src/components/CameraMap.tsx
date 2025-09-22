import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin } from 'lucide-react';

interface CameraLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  status: 'online' | 'offline' | 'maintenance';
  cameraCount: number;
}

const CAMERA_LOCATIONS: CameraLocation[] = [
  {
    id: 'faial',
    name: 'Faial, Azores',
    coordinates: [-28.7151, 38.5816],
    status: 'online',
    cameraCount: 8
  },
  {
    id: 'lisbon',
    name: 'Port of Lisbon',
    coordinates: [-9.1393, 38.7223],
    status: 'online',
    cameraCount: 12
  },
  {
    id: 'san-francisco',
    name: 'San Francisco Bay',
    coordinates: [-122.4194, 37.7749],
    status: 'maintenance',
    cameraCount: 15
  },
  {
    id: 'gran-canaria',
    name: 'Gran Canaria',
    coordinates: [-15.4300, 28.1248],
    status: 'offline',
    cameraCount: 6
  }
];

const CameraMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSaved, setTokenSaved] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<CameraLocation | null>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-20, 35], // Centered between all locations
      zoom: 3
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add camera location markers
    CAMERA_LOCATIONS.forEach((location) => {
      const statusColor = 
        location.status === 'online' ? '#10b981' : 
        location.status === 'maintenance' ? '#f59e0b' : '#ef4444';

      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'camera-marker';
      markerEl.style.cssText = `
        width: 32px;
        height: 32px;
        background-color: ${statusColor};
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
      `;
      markerEl.innerHTML = '📹';

      // Create popup content
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        className: 'camera-popup'
      }).setHTML(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">${location.name}</h3>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div style="width: 8px; height: 8px; background-color: ${statusColor}; border-radius: 50%;"></div>
            <span style="font-size: 12px; text-transform: capitalize;">${location.status}</span>
          </div>
          <div style="font-size: 12px; color: #666;">
            ${location.cameraCount} cameras active
          </div>
        </div>
      `);

      // Create and add marker
      new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      // Add click event to marker
      markerEl.addEventListener('click', () => {
        setSelectedLocation(location);
      });
    });
  };

  const handleSaveToken = () => {
    if (mapboxToken.trim()) {
      setTokenSaved(true);
      initializeMap(mapboxToken);
    }
  };

  const handleResetToken = () => {
    setTokenSaved(false);
    setMapboxToken('');
    map.current?.remove();
    map.current = null;
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!tokenSaved) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center gap-4 bg-muted/20 rounded-lg border-2 border-dashed border-border">
        <div className="text-center space-y-2">
          <MapPin className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="font-medium">Setup Required</p>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to view camera locations
          </p>
        </div>
        <div className="flex gap-2 w-full max-w-sm">
          <Input
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSaveToken} disabled={!mapboxToken.trim()}>
            Load Map
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Get your token from{' '}
          <a
            href="https://mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
          {' '}dashboard
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden" />
      
      {/* Location info overlay */}
      {selectedLocation && (
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="h-4 w-4" />
            <h4 className="font-medium text-sm">{selectedLocation.name}</h4>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Badge 
              variant={selectedLocation.status === 'online' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {selectedLocation.status}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {selectedLocation.cameraCount} cameras
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-auto p-1 mt-2"
            onClick={() => setSelectedLocation(null)}
          >
            ✕ Close
          </Button>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
        <div className="text-xs font-medium mb-2">Camera Status</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Offline</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetToken}
          className="text-xs h-auto p-1 mt-2 w-full"
        >
          Reset Token
        </Button>
      </div>
    </div>
  );
};

export default CameraMap;