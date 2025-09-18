import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Filter, 
  Search, 
  RefreshCw, 
  Download,
  Calendar,
  MapPin
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ControlPanel() {
  const [filters, setFilters] = useState({
    location: 'all',
    timePeriod: '7d',
    confidence: 'high',
    speciesType: 'all'
  });

  const [activeFilters, setActiveFilters] = useState(['location', 'confidence']);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSeeResults = () => {
    toast({
      title: "Applying Filters",
      description: "Updating dashboard with selected criteria...",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started", 
      description: "Your data export has been queued and will be ready shortly.",
    });
  };

  const clearFilters = () => {
    setFilters({
      location: 'all',
      timePeriod: '7d', 
      confidence: 'all',
      speciesType: 'all'
    });
    setActiveFilters([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Control Panel
        </CardTitle>
        <CardDescription>
          Configure filters and data parameters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filter Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Location
              </label>
              <Select
                value={filters.location}
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="tank-a">Coral Reef Tank A</SelectItem>
                  <SelectItem value="tank-b">Kelp Forest Tank B</SelectItem>
                  <SelectItem value="tank-c">Deep Sea Tank C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Time Period
              </label>
              <Select
                value={filters.timePeriod}
                onValueChange={(value) => handleFilterChange('timePeriod', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Search className="h-3 w-3" />
                Confidence
              </label>
              <Select
                value={filters.confidence}
                onValueChange={(value) => handleFilterChange('confidence', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High (&gt;90%)</SelectItem>
                  <SelectItem value="medium">Medium (70-90%)</SelectItem>
                  <SelectItem value="low">Low (&lt;70%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Species Type
              </label>
              <Select
                value={filters.speciesType}
                onValueChange={(value) => handleFilterChange('speciesType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="native">Native Only</SelectItem>
                  <SelectItem value="invasive">Invasive Only</SelectItem>
                  <SelectItem value="endangered">Endangered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="gap-1">
                  {filter}: {filters[filter as keyof typeof filters]}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleSeeResults} className="gap-2">
              <Search className="h-4 w-4" />
              See Results
            </Button>
            
            <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}