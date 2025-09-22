import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MetricCard from "@/components/MetricCard";
import ChartContainer from "@/components/ChartContainer";
import AlertsPanel from "@/components/AlertsPanel";
import ControlPanel from "@/components/ControlPanel";
import CesiumGlobe from "@/components/CesiumGlobe";
import { 
  Fish, 
  Activity, 
  MapPin,
  AlertTriangle,
  Camera
} from "lucide-react";

// Mock data - would normally come from an API
const mockDashboardData = {
  metrics: {
    speciesCount: 42,
    totalFish: 1847,
    invasivePercent: 12,
    cameraHealth: 96
  },
  charts: {
    speciesRichness: [
      { name: "Jan", value: 35 },
      { name: "Feb", value: 38 },
      { name: "Mar", value: 42 },
      { name: "Apr", value: 39 },
      { name: "May", value: 45 }
    ],
    shannonIndex: [
      { name: "Jan", value: 2.1 },
      { name: "Feb", value: 2.3 },
      { name: "Mar", value: 2.5 },
      { name: "Apr", value: 2.2 },
      { name: "May", value: 2.7 }
    ],
    speciesCount: [
      { name: "Native", value: 68 },
      { name: "Invasive", value: 12 },
      { name: "Endangered", value: 8 },
      { name: "Common", value: 45 }
    ],
    invasiveSpecies: [
      { name: "Jan", value: 8 },
      { name: "Feb", value: 10 },
      { name: "Mar", value: 12 },
      { name: "Apr", value: 11 },
      { name: "May", value: 9 }
    ]
  },
  alerts: [
    {
      id: "3",
      type: "error" as const, 
      title: "Camera Offline",
      message: "Camera 3 in Deep Sea section is offline",
      timestamp: "1 hour ago"
    }
  ]
};

export default function Dashboard() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockDashboardData;
    }
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Control Panel */}
      <ControlPanel />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Species Count"
          value={data?.metrics.speciesCount || 0}
          trend="+5.2%"
          trendUp={true}
        />
        <MetricCard
          title="Total Fish Count"
          value={data?.metrics.totalFish || 0}
          trend="+12.8%"
          trendUp={true}
        />
        <MetricCard
          title="Invasive Species"
          value={`${data?.metrics.invasivePercent || 0}%`}
          trend="-2.1%"
          trendUp={false}
        />
        <MetricCard
          title="Camera Health"
          value={`${data?.metrics.cameraHealth || 0}%`}
          trend="+1.5%"
          trendUp={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Overview
            </CardTitle>
            <CardDescription>
              Interactive monitoring locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CesiumGlobe />
          </CardContent>
        </Card>

        {/* Alerts Panel */}
        <AlertsPanel alerts={data?.alerts || []} />
      </div>

      {/* Live Feed Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Live Camera Feed
            <Badge className="bg-success text-white ml-auto">LIVE</Badge>
          </CardTitle>
          <CardDescription>
            Most active monitoring station - Coral Reef Tank A
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img 
              src="/src/assets/live-feed.jpg" 
              alt="Live underwater camera feed showing marine life" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded text-sm">
              Species detected: 8 | Last update: 12s ago
            </div>
            <div className="absolute top-3 right-3 bg-success/90 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
              REC
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Species Richness Trend"
          type="line"
          data={data?.charts.speciesRichness || []}
        />
        <ChartContainer
          title="Shannon Diversity Index"
          type="line"
          data={data?.charts.shannonIndex || []}
        />
        <ChartContainer
          title="Species Distribution"
          type="tree"
          data={data?.charts.speciesCount || []}
        />
        <ChartContainer
          title="Invasive Species Growth"
          type="area"
          data={data?.charts.invasiveSpecies || []}
        />
      </div>
    </div>
  );
}