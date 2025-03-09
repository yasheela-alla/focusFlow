import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AchievementBadge from "./AchievementBadge";
import { Progress } from "../ui/progress";
import { Award } from "lucide-react";

interface Achievement {
  id: string;
  type:
    | "streak"
    | "focus"
    | "completion"
    | "milestone"
    | "productivity"
    | "custom";
  label: string;
  description: string;
  value?: number | string;
  unlocked: boolean;
  progress?: number;
}

interface AchievementsPanelProps {
  achievements?: Achievement[];
  className?: string;
}

const AchievementsPanel = ({
  achievements = [
    {
      id: "1",
      type: "streak",
      label: "3-Day Streak",
      description: "Complete at least one task for 3 consecutive days",
      value: "3",
      unlocked: true,
      progress: 100,
    },
    {
      id: "2",
      type: "focus",
      label: "Deep Focus",
      description: "Complete a 25-minute focus session without interruptions",
      unlocked: true,
      progress: 100,
    },
    {
      id: "3",
      type: "completion",
      label: "Task Master",
      description: "Complete 50 tasks",
      value: "12/50",
      unlocked: false,
      progress: 24,
    },
    {
      id: "4",
      type: "milestone",
      label: "First Week",
      description: "Use FocusFlow for a full week",
      unlocked: true,
      progress: 100,
    },
    {
      id: "5",
      type: "productivity",
      label: "Productivity Guru",
      description: "Log 10 hours of focused work in a single day",
      value: "2.5/10",
      unlocked: false,
      progress: 25,
    },
  ],
  className = "",
}: AchievementsPanelProps) => {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="mr-2 h-5 w-5 text-amber-500" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {unlockedCount} of {totalCount} unlocked
          </span>
          <span className="text-sm font-medium">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2 mb-6" />

        <div className="flex flex-wrap gap-2">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="mb-2">
              <AchievementBadge
                type={achievement.type}
                label={achievement.label}
                description={achievement.description}
                value={achievement.value}
                unlocked={achievement.unlocked}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsPanel;
