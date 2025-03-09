import React from "react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Award, Clock, CheckCircle, Zap, Target, Flame } from "lucide-react";

type AchievementType =
  | "streak"
  | "focus"
  | "completion"
  | "milestone"
  | "productivity"
  | "custom";

interface AchievementBadgeProps {
  type: AchievementType;
  label: string;
  description: string;
  value?: number | string;
  unlocked?: boolean;
  className?: string;
}

const AchievementBadge = ({
  type,
  label,
  description,
  value,
  unlocked = true,
  className = "",
}: AchievementBadgeProps) => {
  const getIcon = () => {
    switch (type) {
      case "streak":
        return <Flame className="h-3.5 w-3.5" />;
      case "focus":
        return <Clock className="h-3.5 w-3.5" />;
      case "completion":
        return <CheckCircle className="h-3.5 w-3.5" />;
      case "milestone":
        return <Target className="h-3.5 w-3.5" />;
      case "productivity":
        return <Zap className="h-3.5 w-3.5" />;
      default:
        return <Award className="h-3.5 w-3.5" />;
    }
  };

  const getBadgeStyle = () => {
    if (!unlocked) {
      return "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500";
    }

    switch (type) {
      case "streak":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "focus":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "completion":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "milestone":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "productivity":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={`flex items-center gap-1 py-1 px-2 ${getBadgeStyle()} ${className} ${!unlocked ? "opacity-60" : ""}`}
          >
            {getIcon()}
            <span>{label}</span>
            {value && <span className="ml-1 font-bold">{value}</span>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{description}</p>
          {!unlocked && (
            <p className="text-xs text-gray-500 mt-1">Not yet unlocked</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
