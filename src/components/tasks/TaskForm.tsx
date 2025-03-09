import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface TaskFormProps {
  onSubmit?: (task: {
    description: string;
    category: string;
    duration?: number;
    notes?: string;
  }) => void;
  isSubmitting?: boolean;
}

const TaskForm = ({
  onSubmit = () => {},
  isSubmitting = false,
}: TaskFormProps) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("work");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      description,
      category,
      duration: duration ? parseInt(duration) : undefined,
      notes: notes || undefined,
    });

    // Reset form after submission
    setDescription("");
    setCategory("work");
    setDuration("");
    setNotes("");
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Add Completed Task
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Task Description</Label>
            <Input
              id="description"
              placeholder="What did you accomplish?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="admin">Administrative</SelectItem>
                <SelectItem value="content">Content Creation</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="How long did it take?"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional details?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting || !description}
            className="w-full"
          >
            {isSubmitting ? "Adding..." : "Add Task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaskForm;
