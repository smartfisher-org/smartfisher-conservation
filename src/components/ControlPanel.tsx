import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  RefreshCw, 
  Download,
  Calendar as CalendarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function ControlPanel() {
  const [location, setLocation] = useState("all");
  const [timePeriod, setTimePeriod] = useState("18d");
  const [confidence, setConfidence] = useState("all");
  const [speciesType, setSpeciesType] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2025, 0, 1), // Jan 01, 2025
    to: new Date(2025, 0, 18),  // Jan 18, 2025
  });

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Updating dashboard with latest information...",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started", 
      description: "Your data export has been queued and will be ready shortly.",
    });
  };

  const formatDateRange = () => {
    if (!dateRange.from || !dateRange.to) return "Select date range";
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* First row - Filter controls and See results */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-end gap-6 flex-1">
            {/* Location */}
            <div className="space-y-2 min-w-[160px]">
              <label className="text-sm font-medium text-foreground">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="tank-a">Coral Reef Tank A</SelectItem>
                  <SelectItem value="tank-b">Kelp Forest Tank B</SelectItem>
                  <SelectItem value="tank-c">Deep Sea Tank C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2 min-w-[280px]">
              <label className="text-sm font-medium text-foreground">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDateRange()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Period */}
            <div className="space-y-2 min-w-[160px]">
              <label className="text-sm font-medium text-foreground">
                Time Period
              </label>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18d">All Data (18 Days)</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Confidence */}
            <div className="space-y-2 min-w-[140px]">
              <label className="text-sm font-medium text-foreground">
                Confidence
              </label>
              <Select value={confidence} onValueChange={setConfidence}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High (&gt;90%)</SelectItem>
                  <SelectItem value="medium">Medium (70-90%)</SelectItem>
                  <SelectItem value="low">Low (&lt;70%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Species Type */}
            <div className="space-y-2 min-w-[140px]">
              <label className="text-sm font-medium text-foreground">
                Species Type
              </label>
              <Select value={speciesType} onValueChange={setSpeciesType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                  <SelectItem value="invasive">Invasive</SelectItem>
                  <SelectItem value="endangered">Endangered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* See results button */}
          <Button variant="link" className="text-foreground font-medium">
            See results
          </Button>
        </div>

        {/* Second row - Action buttons */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} className="gap-2">
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