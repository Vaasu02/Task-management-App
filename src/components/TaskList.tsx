'use client';

import { ITask } from "@/types";
import { TaskCard } from "./ui/TaskCard";
import { deleteTask, updateTask } from "@/app/actions/task";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { TaskForm } from "./TaskForm";
import { useState } from "react";

interface TaskListProps {
  tasks: ITask[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const handleDelete = async (taskId: string) => {
    const result = await deleteTask(taskId);
    if (result.success) {
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (taskId: string, status: 'pending' | 'completed') => {
    const result = await updateTask(taskId, { status });
    if (result.success) {
      toast({
        title: "Success",
        description: "Task status updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (data: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask?._id) return;
    
    const result = await updateTask(editingTask._id, data);
    if (result.success) {
      setEditingTask(null);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={(task) => setEditingTask(task)}
          />
        ))}
      </div>

      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm 
              initialData={editingTask}
              onSubmit={handleEdit}
              submitLabel="Update Task"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 