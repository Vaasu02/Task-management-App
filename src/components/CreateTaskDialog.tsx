'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { createTaskAction } from "@/app/actions/createTaskAction";
import { useToast } from "@/hooks/use-toast";

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: Parameters<typeof createTaskAction>[0]) => {
    const result = await createTaskAction(data);
    if (!result.success) {
      toast({
        title: "Error",
        description: result.error || "Something went wrong",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm 
          onSubmit={handleSubmit}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 