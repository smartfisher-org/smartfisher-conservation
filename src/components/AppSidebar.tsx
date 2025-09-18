import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Upload,
  Settings,
  Activity,
  Fish,
  TreePine,
  Zap,
  Map,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Data Upload", url: "/upload", icon: Upload },
  { title: "Settings", url: "/settings", icon: Settings },
];

const dataNavItems = [
  { title: "Conservation", url: "/conservation", icon: TreePine },
  { title: "Species", url: "/species", icon: Fish },
  { title: "Biodiversity", url: "/biodiversity", icon: Activity },
  { title: "Infrastructure", url: "/infrastructure", icon: Zap },
];

export default function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const isActive = (path: string) => 
    location.pathname === path || (path === "/dashboard" && location.pathname === "/");
  
  const getNavClass = (path: string) =>
    isActive(path) 
      ? "bg-primary text-primary-foreground font-medium shadow-glow" 
      : "hover:bg-primary/10 hover:text-primary";

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Data Views */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Data Views
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {state !== "collapsed" && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupLabel className="text-muted-foreground">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 p-2">
                <button className="w-full bg-gradient-ocean text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-glow transition-all">
                  Export Data
                </button>
                <button className="w-full bg-secondary/10 text-secondary px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary/20 transition-all">
                  Sync Cameras
                </button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}