import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Clock,
  ClipboardList,
  BarChart2,
  History,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activePage?: string;
  onLogout?: () => void;
}

const Sidebar = ({
  activePage = "home",
  onLogout = () => {},
}: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-4 w-4 shrink-0" />,
      id: "home",
    },
    {
      label: "Session",
      href: "/session",
      icon: <Clock className="h-4 w-4 shrink-0" />,
      id: "session",
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: <ClipboardList className="h-4 w-4 shrink-0" />,
      id: "tasks",
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <BarChart2 className="h-4 w-4 shrink-0" />,
      id: "analytics",
    },
    {
      label: "History",
      href: "/history",
      icon: <History className="h-4 w-4 shrink-0" />,
      id: "history",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4 shrink-0" />,
      id: "settings",
    },
  ];

  // Mobile sidebar toggle
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={cn(
        "h-screen hidden md:flex md:flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-r border-gray-100 dark:border-gray-800/50 py-4 fixed left-0 top-0 transition-all duration-300 ease-in-out z-20 shadow-sm",
        open ? "w-[180px]" : "w-[60px]",
      )}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex flex-col items-center gap-4 w-full px-2">
        <div className="flex items-center justify-center w-full">
          <div className="h-7 w-7 bg-indigo-500 rounded-md flex items-center justify-center">
            <Clock className="h-4 w-4 text-white" />
          </div>
          {open && (
            <span className="ml-2 text-xs font-medium text-gray-900 dark:text-white whitespace-nowrap overflow-hidden transition-opacity duration-200">
              FocusFlow
            </span>
          )}
        </div>

        <nav className="flex flex-col gap-1 w-full mt-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-2 py-1.5 px-2 rounded-md group transition-all",
                activePage === item.id
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50",
              )}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {open && (
                <span className="text-xs font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-2">
        <button
          onClick={onLogout}
          className={cn(
            "flex items-center gap-2 py-1.5 px-2 rounded-md w-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 group transition-all",
          )}
        >
          <LogOut className="h-4 w-4 shrink-0 text-gray-500 group-hover:text-red-500" />
          {open && (
            <span className="text-xs font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200">
              Sign out
            </span>
          )}
        </button>
      </div>
    </div>
  );

  // Mobile sidebar
  const MobileSidebar = () => (
    <>
      <div className="md:hidden fixed top-0 left-0 z-20 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800/50 px-4 py-2 flex justify-end shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
            onClick={toggleSidebar}
          />
          <div className="fixed inset-y-0 left-0 w-[180px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-40 md:hidden p-3 flex flex-col h-full border-r border-gray-100 dark:border-gray-800/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-6 w-6 bg-indigo-500 rounded-md flex items-center justify-center">
                  <Clock className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="ml-2 text-xs font-medium text-gray-900 dark:text-white">
                  FocusFlow
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleSidebar}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-1 w-full">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 py-1.5 px-2 rounded-md",
                    activePage === item.id
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  )}
                  onClick={toggleSidebar}
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => {
                  toggleSidebar();
                  onLogout();
                }}
                className="flex items-center gap-2 py-1.5 px-2 rounded-md w-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 group transition-all"
              >
                <LogOut className="h-4 w-4 text-gray-500 group-hover:text-red-500" />
                <span className="text-xs font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
