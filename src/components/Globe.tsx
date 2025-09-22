import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, useTexture } from '@react-three/drei';
import { Mesh, Vector3, BufferGeometry, BufferAttribute, Points, PointsMaterial, AdditiveBlending, Group, TextureLoader, CanvasTexture } from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Waves, Eye, EyeOff } from 'lucide-react';

// Create a detailed procedural Earth texture
function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  
  // Create gradient for ocean depth
  const oceanGradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
  oceanGradient.addColorStop(0, '#2563eb');
  oceanGradient.addColorStop(0.5, '#1d4ed8');
  oceanGradient.addColorStop(1, '#1e40af');
  
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Land color variations
  const landColors = ['#22c55e', '#16a34a', '#15803d', '#166534'];
  
  // North America
  ctx.fillStyle = landColors[0];
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.quadraticCurveTo(200, 150, 300, 180);
  ctx.quadraticCurveTo(350, 220, 320, 280);
  ctx.quadraticCurveTo(280, 320, 200, 300);
  ctx.quadraticCurveTo(120, 280, 100, 200);
  ctx.fill();
  
  // Greenland
  ctx.beginPath();
  ctx.ellipse(400, 120, 30, 40, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // South America
  ctx.fillStyle = landColors[1];
  ctx.beginPath();
  ctx.moveTo(250, 400);
  ctx.quadraticCurveTo(280, 350, 300, 400);
  ctx.quadraticCurveTo(320, 500, 300, 600);
  ctx.quadraticCurveTo(280, 650, 250, 620);
  ctx.quadraticCurveTo(230, 580, 240, 520);
  ctx.quadraticCurveTo(230, 460, 250, 400);
  ctx.fill();
  
  // Europe
  ctx.fillStyle = landColors[2];
  ctx.beginPath();
  ctx.moveTo(480, 180);
  ctx.quadraticCurveTo(520, 160, 550, 180);
  ctx.quadraticCurveTo(570, 200, 560, 230);
  ctx.quadraticCurveTo(540, 250, 500, 240);
  ctx.quadraticCurveTo(470, 220, 480, 180);
  ctx.fill();
  
  // Africa
  ctx.fillStyle = landColors[1];
  ctx.beginPath();
  ctx.moveTo(500, 260);
  ctx.quadraticCurveTo(540, 250, 580, 280);
  ctx.quadraticCurveTo(590, 350, 580, 420);
  ctx.quadraticCurveTo(570, 500, 550, 550);
  ctx.quadraticCurveTo(520, 580, 480, 570);
  ctx.quadraticCurveTo(450, 550, 460, 500);
  ctx.quadraticCurveTo(470, 400, 480, 320);
  ctx.quadraticCurveTo(490, 280, 500, 260);
  ctx.fill();
  
  // Asia
  ctx.fillStyle = landColors[3];
  ctx.beginPath();
  ctx.moveTo(600, 160);
  ctx.quadraticCurveTo(700, 140, 800, 160);
  ctx.quadraticCurveTo(900, 180, 950, 220);
  ctx.quadraticCurveTo(980, 260, 950, 300);
  ctx.quadraticCurveTo(900, 320, 800, 310);
  ctx.quadraticCurveTo(700, 300, 650, 280);
  ctx.quadraticCurveTo(620, 240, 600, 160);
  ctx.fill();
  
  // India subcontinent
  ctx.beginPath();
  ctx.moveTo(700, 320);
  ctx.quadraticCurveTo(750, 310, 780, 340);
  ctx.quadraticCurveTo(790, 380, 770, 400);
  ctx.quadraticCurveTo(740, 410, 710, 400);
  ctx.quadraticCurveTo(690, 380, 700, 320);
  ctx.fill();
  
  // Australia
  ctx.fillStyle = landColors[0];
  ctx.beginPath();
  ctx.ellipse(1400, 550, 80, 50, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // New Zealand
  ctx.beginPath();
  ctx.ellipse(1500, 600, 15, 25, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Antarctica (bottom strip)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 900, canvas.width, 124);
  
  // Add some texture with smaller islands
  ctx.fillStyle = landColors[2];
  // British Isles
  ctx.beginPath();
  ctx.ellipse(460, 170, 12, 18, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Japan
  ctx.beginPath();
  ctx.ellipse(980, 250, 8, 25, Math.PI/6, 0, 2 * Math.PI);
  ctx.fill();
  
  // Madagascar
  ctx.beginPath();
  ctx.ellipse(620, 480, 8, 20, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Add country borders with thin lines
  ctx.strokeStyle = '#166534';
  ctx.lineWidth = 1;
  
  // Some major country divisions
  ctx.beginPath();
  ctx.moveTo(280, 200);
  ctx.lineTo(280, 300);
  ctx.stroke();
  
  ctx.beginPath(); 
  ctx.moveTo(520, 200);
  ctx.lineTo(540, 250);
  ctx.stroke();
  
  return new CanvasTexture(canvas);
}
const temperatureData = [
  { lat: 40.7, lng: -74.0, temp: 15, location: "New York" },
  { lat: 51.5, lng: -0.1, temp: 12, location: "London" },
  { lat: 35.7, lng: 139.7, temp: 18, location: "Tokyo" },
  { lat: -33.9, lng: 151.2, temp: 22, location: "Sydney" },
  { lat: 25.3, lng: 55.3, temp: 28, location: "Dubai" },
  { lat: -1.3, lng: 36.8, temp: 24, location: "Nairobi" },
  { lat: 19.4, lng: -99.1, temp: 20, location: "Mexico City" },
  { lat: 60.2, lng: 24.9, temp: 5, location: "Helsinki" },
  { lat: -34.6, lng: -58.4, temp: 18, location: "Buenos Aires" },
  { lat: 1.4, lng: 103.8, temp: 27, location: "Singapore" },
];

// Mock ocean current data
const oceanCurrents = [
  { startLat: 25, startLng: -80, endLat: 40, endLng: -30, strength: 0.8 },
  { startLat: 0, startLng: -20, endLat: 20, endLng: 10, strength: 0.6 },
  { startLat: -40, startLng: 20, endLat: -20, endLng: 60, strength: 0.9 },
  { startLat: 40, startLng: 140, endLat: 60, endLng: -140, strength: 0.7 },
  { startLat: -10, startLng: 80, endLat: 10, endLng: 120, strength: 0.5 },
];

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new Vector3(x, y, z);
}

// Temperature to color mapping
function tempToColor(temp: number) {
  const normalized = Math.max(0, Math.min(1, (temp + 10) / 40)); // -10°C to 30°C range
  const r = normalized;
  const b = 1 - normalized;
  const g = 0.2;
  return [r, g, b];
}

interface TemperaturePointsProps {
  visible: boolean;
  onHover: (data: any) => void;
  onLeave: () => void;
}

function TemperaturePoints({ visible, onHover, onLeave }: TemperaturePointsProps) {
  const pointsRef = useRef<Points>(null);
  const groupRef = useRef<Group>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(temperatureData.length * 3);
    const colors = new Float32Array(temperatureData.length * 3);
    
    temperatureData.forEach((point, i) => {
      const vector = latLngToVector3(point.lat, point.lng, 1.02);
      positions[i * 3] = vector.x;
      positions[i * 3 + 1] = vector.y;
      positions[i * 3 + 2] = vector.z;
      
      const color = tempToColor(point.temp);
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    });
    
    return { positions, colors };
  }, []);

  return (
    <group ref={groupRef} visible={visible}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={temperatureData.length}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={temperatureData.length}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          blending={AdditiveBlending}
          transparent
          opacity={0.8}
        />
      </points>
      {temperatureData.map((point, i) => (
        <mesh
          key={i}
          position={latLngToVector3(point.lat, point.lng, 1.02)}
          onPointerOver={() => onHover(point)}
          onPointerOut={onLeave}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

interface OceanCurrentsProps {
  visible: boolean;
}

function OceanCurrents({ visible }: OceanCurrentsProps) {
  const groupRef = useRef<Group>(null);

  const currentLines = useMemo(() => {
    return oceanCurrents.map((current, index) => {
      const start = latLngToVector3(current.startLat, current.startLng, 1.01);
      const end = latLngToVector3(current.endLat, current.endLng, 1.01);
      
      const points = [];
      const numPoints = 20;
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const point = start.clone().lerp(end, t);
        points.push(point.x, point.y, point.z);
      }
      
      return { points: new Float32Array(points), strength: current.strength };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current && visible) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof Points) {
          child.rotation.z = state.clock.elapsedTime * 0.1 * oceanCurrents[i].strength;
        }
      });
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {currentLines.map((line, i) => (
        <points key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={line.points}
              count={line.points.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#00ccff"
            blending={AdditiveBlending}
            transparent
            opacity={line.strength}
          />
        </points>
      ))}
    </group>
  );
}

interface EarthProps {
  showTemperature: boolean;
  showCurrents: boolean;
  onHover: (data: any) => void;
  onLeave: () => void;
}

function Earth({ showTemperature, showCurrents, onHover, onLeave }: EarthProps) {
  const meshRef = useRef<Mesh>(null);
  const earthTexture = useMemo(() => createEarthTexture(), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshPhongMaterial
          map={earthTexture}
          shininess={30}
          specular="#ffffff"
          transparent={false}
        />
      </Sphere>
      
      <TemperaturePoints
        visible={showTemperature}
        onHover={onHover}
        onLeave={onLeave}
      />
      
      <OceanCurrents visible={showCurrents} />
    </group>
  );
}

interface TooltipProps {
  data: any;
  position: [number, number, number];
}

function Tooltip({ data, position }: TooltipProps) {
  return (
    <Html position={position} center>
      <Card className="pointer-events-none">
        <CardContent className="p-2">
          <div className="text-sm font-medium">{data.location}</div>
          <div className="text-xs text-muted-foreground">
            Temperature: {data.temp}°C
          </div>
        </CardContent>
      </Card>
    </Html>
  );
}

export default function Globe() {
  const [showTemperature, setShowTemperature] = useState(true);
  const [showCurrents, setShowCurrents] = useState(true);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState<[number, number, number]>([0, 0, 0]);

  const handleHover = (data: any) => {
    setHoveredData(data);
    const position = latLngToVector3(data.lat, data.lng, 1.1);
    setTooltipPosition([position.x, position.y, position.z]);
  };

  const handleLeave = () => {
    setHoveredData(null);
  };

  return (
    <div className="relative w-full h-64 bg-background rounded-lg overflow-hidden">
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
              <span>Cold</span>
              <div className="w-3 h-3 bg-red-500 rounded ml-2"></div>
              <span>Hot</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Earth
          showTemperature={showTemperature}
          showCurrents={showCurrents}
          onHover={handleHover}
          onLeave={handleLeave}
        />
        
        {hoveredData && (
          <Tooltip data={hoveredData} position={tooltipPosition} />
        )}
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.5}
          minDistance={2}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}