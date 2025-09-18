import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Camera,
  Map,
  Upload,
  Settings,
  ExternalLink,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import smartfisherLogo from "@/assets/smartfisher-logo.png";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Camera View", url: "/camera", icon: Camera },
  { title: "Map", url: "/map", icon: Map },
  { title: "Data Upload", url: "/upload", icon: Upload },
];

const bottomNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Back to Website", url: "/", icon: ExternalLink },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => 
    location.pathname === path || (path === "/dashboard" && location.pathname === "/");

  return (
    <Sidebar className="w-64 bg-white border-r border-border" collapsible="none">
      <SidebarContent className="bg-white flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex flex-col items-center py-8 px-4 border-b border-border">
          <div className="w-32 h-32 mb-4">
            <img 
              src={smartfisherLogo} 
              alt="SmartFISHER Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-foreground">SmartFISHER</h1>
        </div>

        {/* Main Navigation Menu */}
        <SidebarGroup className="flex-1 px-4 py-6">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: navIsActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          navIsActive || isActive(item.url)
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation Menu */}
        <SidebarGroup className="px-4 py-4 border-t border-border">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: navIsActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          navIsActive || isActive(item.url)
                            ? "bg-primary text-primary-foreground font-medium" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}