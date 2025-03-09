import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Moon, Sun, Bell, BellOff, Save, Trash2 } from "lucide-react";

interface SettingsPanelProps {
  onSave?: (settings: SettingsData) => void;
  initialSettings?: SettingsData;
}

interface SettingsData {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  defaultSessionDuration: number;
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  color: string;
}

const SettingsPanel = ({
  onSave = () => {},
  initialSettings = {
    theme: "system",
    notifications: true,
    defaultSessionDuration: 25,
    categories: [
      { id: "1", name: "Work", color: "#4f46e5" },
      { id: "2", name: "Administrative", color: "#0ea5e9" },
      { id: "3", name: "Content Creation", color: "#8b5cf6" },
      { id: "4", name: "Finance", color: "#10b981" },
      { id: "5", name: "Learning", color: "#f59e0b" },
      { id: "6", name: "Personal", color: "#ec4899" },
    ],
  },
}: SettingsPanelProps) => {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#4f46e5",
  });
  const [activeTab, setActiveTab] = useState("general");

  const handleThemeChange = (value: string) => {
    setSettings({
      ...settings,
      theme: value as "light" | "dark" | "system",
    });
  };

  const handleNotificationsChange = (checked: boolean) => {
    setSettings({
      ...settings,
      notifications: checked,
    });
  };

  const handleSessionDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value) || 0;
    setSettings({
      ...settings,
      defaultSessionDuration: value,
    });
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") return;

    const newCategoryWithId = {
      id: Date.now().toString(),
      ...newCategory,
    };

    setSettings({
      ...settings,
      categories: [...settings.categories, newCategoryWithId],
    });

    setNewCategory({ name: "", color: "#4f46e5" });
  };

  const handleDeleteCategory = (id: string) => {
    setSettings({
      ...settings,
      categories: settings.categories.filter((category) => category.id !== id),
    });
  };

  const handleSaveSettings = () => {
    onSave(settings);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customize how FocusFlow looks on your device
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-gray-500" />
                  <Select
                    value={settings.theme}
                    onValueChange={handleThemeChange}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Moon className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    Default Session Duration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Set the default duration for new work sessions (in minutes)
                  </p>
                </div>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={settings.defaultSessionDuration}
                  onChange={handleSessionDurationChange}
                  className="w-24"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Manage Categories</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Customize the categories used to organize your tasks
              </p>

              <div className="space-y-4 mb-8">
                {settings.categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex items-end space-x-3">
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">Category Name</label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    placeholder="Enter category name"
                  />
                </div>
                <div className="space-y-2 w-24">
                  <label className="text-sm font-medium">Color</label>
                  <Input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, color: e.target.value })
                    }
                    className="h-9 p-1 cursor-pointer"
                  />
                </div>
                <Button onClick={handleAddCategory} className="mb-0">
                  Add Category
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Enable Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications when sessions end
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {settings.notifications ? (
                    <Bell className="h-5 w-5 text-gray-500" />
                  ) : (
                    <BellOff className="h-5 w-5 text-gray-500" />
                  )}
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={handleNotificationsChange}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 pt-4 border-t flex justify-end">
          <Button onClick={handleSaveSettings} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
