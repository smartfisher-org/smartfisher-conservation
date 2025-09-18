import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  MapPin, 
  Trash2, 
  Plus, 
  Save,
  Camera,
  Settings as SettingsIcon 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Region {
  id: string;
  name: string;
  location: string;
  cameras: number;
  status: 'active' | 'inactive';
}

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@marine-institute.org',
    organization: 'Marine Conservation Institute',
    role: 'Senior Marine Biologist'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    invasiveSpecies: true,
    cameraOffline: true,
    weeklyReports: true
  });

  const [regions, setRegions] = useState<Region[]>([
    { id: '1', name: 'Coral Reef Tank A', location: 'Section 1', cameras: 4, status: 'active' },
    { id: '2', name: 'Kelp Forest Tank B', location: 'Section 2', cameras: 3, status: 'active' },
    { id: '3', name: 'Deep Sea Tank C', location: 'Section 3', cameras: 2, status: 'inactive' }
  ]);

  const [newRegion, setNewRegion] = useState({ name: '', location: '' });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated", 
      description: "Your notification preferences have been saved.",
    });
  };

  const handleAddRegion = () => {
    if (newRegion.name && newRegion.location) {
      const region: Region = {
        id: Date.now().toString(),
        name: newRegion.name,
        location: newRegion.location,
        cameras: 0,
        status: 'inactive'
      };
      setRegions([...regions, region]);
      setNewRegion({ name: '', location: '' });
      toast({
        title: "Region Added",
        description: `${region.name} has been added successfully.`,
      });
    }
  };

  const handleDeleteRegion = (id: string) => {
    setRegions(regions.filter(r => r.id !== id));
    toast({
      title: "Region Deleted",
      description: "The region has been removed from your monitoring list.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and monitoring preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="regions" className="gap-2">
            <MapPin className="h-4 w-4" />
            Regions
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal and professional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={profile.organization}
                    onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveProfile} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via SMS
                    </p>
                  </div>
                  <Switch
                    id="sms-alerts"
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, smsAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="invasive-alerts">Invasive Species Detection</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when invasive species are detected
                    </p>
                  </div>
                  <Switch
                    id="invasive-alerts"
                    checked={notifications.invasiveSpecies}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, invasiveSpecies: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="camera-alerts">Camera Offline Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Be notified when cameras go offline
                    </p>
                  </div>
                  <Switch
                    id="camera-alerts"
                    checked={notifications.cameraOffline}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, cameraOffline: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports
                    </p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyReports: checked })
                    }
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveNotifications} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regions Tab */}
        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Region Management
              </CardTitle>
              <CardDescription>
                Add, edit, and manage your monitoring regions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Region */}
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Add New Region</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region-name">Region Name</Label>
                    <Input
                      id="region-name"
                      placeholder="e.g., Coral Reef Tank D"
                      value={newRegion.name}
                      onChange={(e) => setNewRegion({ ...newRegion, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region-location">Location</Label>
                    <Input
                      id="region-location"
                      placeholder="e.g., Section 4"
                      value={newRegion.location}
                      onChange={(e) => setNewRegion({ ...newRegion, location: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddRegion} className="gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  Add Region
                </Button>
              </div>

              {/* Existing Regions */}
              <div className="space-y-4">
                <h3 className="font-medium">Current Regions</h3>
                <div className="space-y-3">
                  {regions.map((region) => (
                    <div key={region.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{region.name}</h4>
                          <Badge 
                            variant={region.status === 'active' ? 'default' : 'secondary'}
                            className={region.status === 'active' ? 'bg-success text-white' : ''}
                          >
                            {region.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{region.location}</span>
                          <div className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            {region.cameras} cameras
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <SettingsIcon className="h-3 w-3" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1 text-destructive hover:bg-destructive hover:text-white"
                          onClick={() => handleDeleteRegion(region.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
