import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MetricCard from "@/components/MetricCard";
import ChartContainer from "@/components/ChartContainer";
import AlertsPanel from "@/components/AlertsPanel";
import ControlPanel from "@/components/ControlPanel";
import CameraMap from "@/components/CameraMap";
import { mockDashboardData } from "@/lib/mockData";
import { 
  Fish, 
  Activity, 
  MapPin,
  AlertTriangle,
  Camera,
  HelpCircle,
  Clock,
  MapPinIcon
} from "lucide-react";


export default function Dashboard() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: mockDashboardData
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Camera Locations
            </CardTitle>
            <CardDescription>
              Marine monitoring stations worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CameraMap />
          </CardContent>
        </Card>

        {/* Live Camera Feed */}
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
                className="w-full h-64 object-cover rounded-lg"
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
      </div>

      {/* Species Distribution Chart - Full Width */}
      <div className="w-full">
        <ChartContainer
          title="Species Distribution"
          type="tree"
          data={data?.charts.speciesCount || []}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Species Richness Trend"
          type="line"
          data={data?.charts.speciesRichness || []}
          kpi={{
            title: "Shannon Diversity Index",
            value: data?.metrics.shannonDiversity || 3.5,
            subtitle: "Current biodiversity"
          }}
        />
        <ChartContainer
          title="Invasive Species Growth"
          type="area"
          data={data?.charts.invasiveSpecies || []}
        />
      </div>

      {/* Unidentified Species Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Unidentified / Low Confidence Species
          </CardTitle>
          <CardDescription>
            Species detected with confidence score below 50% - requires manual review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {data?.unidentifiedSpecies.map((species) => (
              <div key={species.id} className="flex items-center gap-4 p-4 border rounded-lg bg-muted/10">
                <img 
                  src={species.image} 
                  alt="Unidentified species"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {Math.round(species.confidenceScore * 100)}% confidence
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {species.timestamp}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPinIcon className="h-3 w-3" />
                    {species.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}