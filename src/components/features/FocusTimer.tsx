import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Coffee } from "lucide-react";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

interface FocusTimerProps {
  defaultDuration?: number; // in minutes
  onComplete?: () => void;
  className?: string;
}

const FocusTimer = ({
  defaultDuration = 25,
  onComplete,
  className = "",
}: FocusTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(defaultDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [customDuration, setCustomDuration] = useState(defaultDuration);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3",
    );
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            if (soundEnabled && audioRef.current) {
              audioRef.current.play();
            }
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, soundEnabled, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(customDuration * 60);
  };

  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0];
    setCustomDuration(newDuration);
    if (!isRunning) {
      setTimeLeft(newDuration * 60);
    }
  };

  const progress = (timeLeft / (customDuration * 60)) * 100;

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-full h-[150px] flex items-center justify-center">
          {/* Circular progress indicator */}
          <div className="relative w-[150px] h-[150px]">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              {/* Progress circle */}
              <circle
                className="text-indigo-600 dark:text-indigo-400"
                strokeWidth="4"
                strokeDasharray={283}
                strokeDashoffset={283 * (1 - progress / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>

            {/* Timer display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-mono font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800 border-0"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>

          <Button
            onClick={handleStart}
            className={cn(
              "rounded-full px-6 h-10 text-white",
              isRunning && !isPaused
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-indigo-600 hover:bg-indigo-700",
            )}
          >
            {isRunning && !isPaused ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {isPaused ? "Resume" : "Start"}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800 border-0"
            onClick={handleReset}
            disabled={!isRunning && timeLeft === customDuration * 60}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800 border-0"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Coffee className="h-4 w-4" />
          </Button>
        </div>

        {showSettings && (
          <div className="w-full pt-4 border-t mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">
                Session Length: {customDuration} min
              </span>
            </div>
            <Slider
              value={[customDuration]}
              min={5}
              max={60}
              step={5}
              onValueChange={handleDurationChange}
              disabled={isRunning}
              className="z-10"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5m</span>
              <span>60m</span>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 bg-gray-100 dark:bg-gray-800 border-0"
                onClick={() => setCustomDuration(25)}
                disabled={isRunning || customDuration === 25}
              >
                Pomodoro (25m)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 bg-gray-100 dark:bg-gray-800 border-0"
                onClick={() => setCustomDuration(5)}
                disabled={isRunning || customDuration === 5}
              >
                Short Break (5m)
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FocusTimer;
