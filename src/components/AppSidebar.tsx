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
import { cn } from "@/lib/utils";
import smartfisherLogo from "@/assets/smartfisher-logo.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Camera View", href: "/camera", icon: Camera },
  { name: "Map", href: "/map", icon: Map },
  { name: "Data Upload", href: "/upload", icon: Upload },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => 
    location.pathname === path || (path === "/dashboard" && location.pathname === "/");

  return (
    <Sidebar className="bg-background border-r border-border w-64 h-screen sticky top-0 flex flex-col" collapsible="none">
      <SidebarContent className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-border flex flex-col items-center">
          <div className="w-24 h-24 mb-3">
            <img 
              src={smartfisherLogo} 
              alt="SmartFISHER Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg font-bold text-foreground">SmartFISHER</h1>
        </div>

        {/* Main Navigation Menu */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.href} 
                    className={({ isActive: navIsActive }) => 
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                        navIsActive || isActive(item.href)
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>

        {/* Bottom Navigation Menu */}
        <div className="p-4 pt-0 space-y-2">
          <SidebarMenu>
            {bottomNavigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.href} 
                    className={({ isActive: navIsActive }) => 
                      cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                        navIsActive || isActive(item.href)
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            
            {/* Back to Website Link */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="https://smartfisher.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <ExternalLink className="w-4 h-4" />
                  Back to Website
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}