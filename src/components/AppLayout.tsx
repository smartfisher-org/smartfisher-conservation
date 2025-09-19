import { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <div className="flex-shrink-0">
        <AppSidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b bg-card shadow-surface flex-shrink-0">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-primary hover:bg-primary/10" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">SmartFISHER</h1>
                <p className="text-xs text-muted-foreground">Conservation Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
              Live
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}