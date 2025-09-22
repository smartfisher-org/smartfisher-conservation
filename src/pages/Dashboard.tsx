import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Fish, 
  TreePine, 
  Activity, 
  AlertTriangle, 
  Camera, 
  RefreshCw,
  Download,
  MapPin 
} from "lucide-react";
import { mockDashboardData } from "@/lib/mockData";
import MetricCard from "@/components/MetricCard";
import ChartContainer from "@/components/ChartContainer";
import AlertsPanel from "@/components/AlertsPanel";
import ControlPanel from "@/components/ControlPanel";

export default function Dashboard() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: mockDashboardData,
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4"></div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Navigation Tabs */}
      <Tabs defaultValue="conservation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conservation" className="gap-2">
            <TreePine className="h-4 w-4" />
            Conservation
          </TabsTrigger>
          <TabsTrigger value="species" className="gap-2">
            <Fish className="h-4 w-4" />
            Species
          </TabsTrigger>
          <TabsTrigger value="biodiversity" className="gap-2">
            <Activity className="h-4 w-4" />
            Biodiversity
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="gap-2">
            <Camera className="h-4 w-4" />
            Infrastructure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conservation" className="space-y-6">
          {/* Control Panel */}
          <ControlPanel />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Species Count"
              value={data?.metrics.speciesCount || 0}
              icon={Fish}
              trend="+5.2%"
              trendUp={true}
            />
            <MetricCard
              title="Total Fish Count"
              value={data?.metrics.totalFish || 0}
              icon={Activity}
              trend="+12.8%"
              trendUp={true}
            />
            <MetricCard
              title="Invasive Species"
              value={`${data?.metrics.invasivePercent || 0}%`}
              icon={AlertTriangle}
              trend="-2.1%"
              trendUp={false}
            />
            <MetricCard
              title="Camera Health"
              value={`${data?.metrics.cameraHealth || 0}%`}
              icon={Camera}
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
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center border-2 border-dashed border-muted">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map placeholder</p>
                    <p className="text-xs text-muted-foreground mt-1">Click regions to view detailed monitoring data</p>
                  </div>
                </div>
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
        </TabsContent>

        {/* Other tab contents would be implemented similarly */}
        <TabsContent value="species">
          <Card>
            <CardHeader>
              <CardTitle>Species Monitoring</CardTitle>
              <CardDescription>Detailed species tracking and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Species monitoring interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="biodiversity">
          <Card>
            <CardHeader>
              <CardTitle>Biodiversity Analysis</CardTitle>
              <CardDescription>Ecosystem health and diversity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Biodiversity analysis interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Status</CardTitle>
              <CardDescription>Camera network and equipment monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Infrastructure monitoring interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
