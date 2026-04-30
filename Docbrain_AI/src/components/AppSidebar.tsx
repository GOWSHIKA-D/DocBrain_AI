import { Home, Upload, Clock, Settings, Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: Upload, label: "Upload Document", id: "upload" },
  { icon: Clock, label: "History", id: "history" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-heading text-lg font-bold text-sidebar-accent-foreground tracking-tight">
            DocBrain
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "sidebar-active" : "sidebar-item"}
            className={`w-full gap-3 h-10 rounded-lg ${collapsed ? "justify-center px-0" : "px-3"}`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="sidebar-item"
          className={`w-full h-9 rounded-lg ${collapsed ? "justify-center px-0" : "px-3"}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
