'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ITask } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { parseISO, startOfDay } from 'date-fns';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  initialData?: ITask;
  submitLabel?: string;
  onSuccess?: () => void;
}

export function TaskForm({ onSubmit, initialData, submitLabel = 'Create Task', onSuccess }: TaskFormProps) {
  const { toast } = useToast();
  
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData ? {
      ...initialData,
      dueDate: parseISO(initialData.dueDate),
    } : {
      title: '',
      description: '',
      dueDate: startOfDay(new Date()),
    },
  });

  async function handleSubmit(data: TaskFormValues) {
    try {
      await onSubmit({
        ...data,
        dueDate: data.dueDate.toISOString(),
        status: 'pending',
      });
      form.reset();
      toast({
        title: "Success",
        description: `Task ${initialData ? 'updated' : 'created'} successfully`,
      });
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submitLabel}</Button>
      </form>
    </Form>
  );
} 