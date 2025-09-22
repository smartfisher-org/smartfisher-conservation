import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Waves, Eye, EyeOff } from 'lucide-react';

// Since CesiumJS has complex TypeScript definitions, we'll create a simplified version
// In a real implementation, you would install @cesium/widgets and configure properly

interface CesiumGlobeProps {
  className?: string;
}

export default function CesiumGlobe({ className = "" }: CesiumGlobeProps) {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const [showTemperature, setShowTemperature] = useState(true);
  const [showCurrents, setShowCurrents] = useState(true);

  useEffect(() => {
    if (!cesiumContainerRef.current) return;

    // In a real implementation, you would initialize Cesium here:
    // const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
    //   terrainProvider: Cesium.createWorldTerrain(),
    //   // ... other options
    // });

    // For now, we'll create a placeholder that shows what the interface would look like
    const container = cesiumContainerRef.current;
    container.style.background = 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #0f172a 100%)';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    // Create a mock Earth
    const earth = document.createElement('div');
    earth.style.width = '200px';
    earth.style.height = '200px';
    earth.style.borderRadius = '50%';
    earth.style.background = 'linear-gradient(45deg, #22c55e 30%, #3b82f6 30%, #3b82f6 70%, #22c55e 70%)';
    earth.style.position = 'absolute';
    earth.style.top = '50%';
    earth.style.left = '50%';
    earth.style.transform = 'translate(-50%, -50%)';
    earth.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
    earth.style.animation = 'rotate 20s linear infinite';
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    container.appendChild(earth);

    // Add temperature points if enabled
    if (showTemperature) {
      const tempPoints = [
        { x: '30%', y: '40%', temp: 15, color: '#3b82f6' },
        { x: '70%', y: '35%', temp: 25, color: '#ef4444' },
        { x: '45%', y: '60%', temp: 20, color: '#f59e0b' },
        { x: '25%', y: '70%', temp: 10, color: '#06b6d4' },
      ];

      tempPoints.forEach(point => {
        const dot = document.createElement('div');
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = point.color;
        dot.style.position = 'absolute';
        dot.style.left = point.x;
        dot.style.top = point.y;
        dot.style.boxShadow = `0 0 10px ${point.color}`;
        dot.style.animation = 'pulse 2s infinite';
        dot.title = `Temperature: ${point.temp}°C`;
        container.appendChild(dot);
      });
    }

    // Add ocean current lines if enabled
    if (showCurrents) {
      const currentPaths = [
        { x1: '20%', y1: '50%', x2: '80%', y2: '45%' },
        { x1: '60%', y1: '30%', x2: '40%', y2: '70%' },
        { x1: '30%', y1: '80%', x2: '70%', y2: '20%' },
      ];

      currentPaths.forEach((path, index) => {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.left = path.x1;
        line.style.top = path.y1;
        line.style.width = '2px';
        line.style.height = '40px';
        line.style.backgroundColor = '#06b6d4';
        line.style.opacity = '0.7';
        line.style.animation = `currentFlow 3s infinite ${index * 0.5}s`;
        container.appendChild(line);
      });

      // Add current flow animation
      const currentStyle = document.createElement('style');
      currentStyle.textContent = `
        @keyframes currentFlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `;
      document.head.appendChild(currentStyle);
    }

    return () => {
      // Cleanup would go here for real Cesium viewer
      container.innerHTML = '';
    };
  }, [showTemperature, showCurrents]);

  return (
    <div className={`relative w-full h-64 bg-background rounded-lg overflow-hidden ${className}`}>
      {/* Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button
          variant={showTemperature ? "default" : "outline"}
          size="sm"
          onClick={() => setShowTemperature(!showTemperature)}
          className="h-8"
        >
          <Thermometer className="h-3 w-3 mr-1" />
          Temp
          {showTemperature ? <Eye className="h-3 w-3 ml-1" /> : <EyeOff className="h-3 w-3 ml-1" />}
        </Button>
        <Button
          variant={showCurrents ? "default" : "outline"}
          size="sm"
          onClick={() => setShowCurrents(!showCurrents)}
          className="h-8"
        >
          <Waves className="h-3 w-3 mr-1" />
          Currents
          {showCurrents ? <Eye className="h-3 w-3 ml-1" /> : <EyeOff className="h-3 w-3 ml-1" />}
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 z-10">
        <Card>
          <CardContent className="p-2">
            <div className="text-xs font-medium mb-1">Temperature Scale</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Cold (&lt;15°C)</span>
              <div className="w-3 h-3 bg-yellow-500 rounded ml-2"></div>
              <span>Mild (15-22°C)</span>
              <div className="w-3 h-3 bg-red-500 rounded ml-2"></div>
              <span>Hot (&gt;22°C)</span>
            </div>
            <div className="text-xs font-medium mt-2 mb-1">Ocean Currents</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-3 h-3 bg-cyan-500 rounded"></div>
              <span>Current Flow</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="absolute top-2 left-2 z-10">
        <Card>
          <CardContent className="p-2">
            <div className="text-xs text-muted-foreground">
              CesiumJS Globe - Drag to rotate • Scroll to zoom
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Note: This is a demo version. Real CesiumJS integration would require API keys.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cesium container */}
      <div 
        ref={cesiumContainerRef} 
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}