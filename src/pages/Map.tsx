import { MapPin, Layers, Satellite, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Map() {
  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Interactive Map</h1>
            <p className="text-muted-foreground">
              Explore monitoring locations and real-time data across marine environments
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline" size="sm">
              <Satellite className="h-4 w-4 mr-2" />
              Satellite View
            </Button>
            <Button variant="default" size="sm">
              <Navigation className="h-4 w-4 mr-2" />
              My Location
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 flex items-center justify-center rounded-lg border-2 border-dashed border-border">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 mx-auto text-primary" />
                    <div>
                      <p className="text-lg font-medium text-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">Map integration coming soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Controls & Info */}
          <div className="space-y-6">
            {/* Active Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Active Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">North Reef Station</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">12 cameras active</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">South Bay Monitor</span>
                    <Badge variant="secondary">Offline</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">8 cameras offline</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">East Coast Hub</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">15 cameras active</p>
                </div>
              </CardContent>
            </Card>

            {/* Map Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Map Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Active Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Limited Coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Offline/Maintenance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Research Area</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}