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
    name: 'John Doe',
    email: 'john@example.com',
    company: 'SmartFISHER'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    systemNotifications: true,
    alerts: true
  });

  const [appearance, setAppearance] = useState({
    theme: 'system',
    density: 'comfortable'
  });

  const [apiKey] = useState('sk-1234567890abcdef1234567890abcdef');

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "API key has been copied to clipboard.",
    });
  };

  const handleRegenerateApiKey = () => {
    toast({
      title: "API Key Regenerated",
      description: "A new API key has been generated.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Account deletion functionality would be implemented here.",
      variant: "destructive",
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Your account information has been updated successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="h-auto p-0 bg-transparent border-b rounded-none w-full justify-start">
          <TabsTrigger value="account" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="advanced" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6 mt-6">
          <Card className="bg-card border border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Account Information</h2>
                  <p className="text-muted-foreground mt-1">Update your account details and personal information</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="bg-background max-w-md"
                    />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="bg-card border border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
                  <p className="text-muted-foreground mt-1">Configure how you receive notifications</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-foreground">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-foreground">System Notifications</h3>
                      <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                    </div>
                    <Switch
                      checked={notifications.systemNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, systemNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-foreground">Alerts</h3>
                      <p className="text-sm text-muted-foreground">Receive alert notifications</p>
                    </div>
                    <Switch
                      checked={notifications.alerts}
                      onCheckedChange={(checked) => 
                        setNotifications({ ...notifications, alerts: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card className="bg-card border border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
                  <p className="text-muted-foreground mt-1">Customize the look and feel of the application</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Theme</Label>
                    <select 
                      value={appearance.theme}
                      onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Density</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setAppearance({ ...appearance, density: 'compact' })}
                        className={`p-4 border rounded-md text-center ${
                          appearance.density === 'compact' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-background'
                        }`}
                      >
                        <div className="text-sm font-medium text-foreground">Compact</div>
                      </button>
                      <button
                        onClick={() => setAppearance({ ...appearance, density: 'comfortable' })}
                        className={`p-4 border rounded-md text-center ${
                          appearance.density === 'comfortable' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-background'
                        }`}
                      >
                        <div className="text-sm font-medium text-foreground">Comfortable</div>
                      </button>
                      <button
                        onClick={() => setAppearance({ ...appearance, density: 'spacious' })}
                        className={`p-4 border rounded-md text-center ${
                          appearance.density === 'spacious' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border bg-background'
                        }`}
                      >
                        <div className="text-sm font-medium text-foreground">Spacious</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6 mt-6">
          <Card className="bg-card border border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Advanced Settings</h2>
                  <p className="text-muted-foreground mt-1">Configure advanced application settings</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">API Key</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        value="••••••••••••••••"
                        readOnly
                        className="bg-background flex-1"
                      />
                      <Button variant="outline" onClick={handleCopyApiKey}>
                        Copy
                      </Button>
                      <Button variant="outline" onClick={handleRegenerateApiKey}>
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Keep your API key secure and don't share it with others</p>
                  </div>

                  <div className="space-y-3 pt-6">
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                    <p className="text-sm text-muted-foreground">This action cannot be undone. All your data will be permanently deleted.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}