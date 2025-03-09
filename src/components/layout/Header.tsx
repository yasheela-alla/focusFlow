import React from "react";
import { Moon, Sun, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderProps {
  toggleTheme?: () => void;
  isDarkMode?: boolean;
  userName?: string;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  toggleTheme = () => {},
  isDarkMode = false,
  userName = "User",
  onSettingsClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-12 bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800/50 px-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <div className="flex items-center gap-1.5">
          <div className="h-6 w-6 rounded-md bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-medium text-xs">F</span>
          </div>
          <h1 className="text-sm font-medium text-gray-900 dark:text-white">
            FocusFlow
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="h-7 w-7 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-full text-xs font-medium px-3 py-0 border-gray-200 dark:border-gray-700"
        >
          Sign in
        </Button>
      </div>
    </header>
  );
};

export default Header;
