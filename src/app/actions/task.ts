'use server'

import { connectToDatabase } from "@/lib/db";
import { Task } from "@/models/Task";
import { ITask } from "@/types";
import { revalidatePath } from "next/cache";

// Helper function to serialize MongoDB documents
function serializeTask(task: any): ITask {
  return {
    _id: task._id.toString(),
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.toISOString(),
    status: task.status,
    createdAt: task.createdAt?.toISOString(),
    updatedAt: task.updatedAt?.toISOString(),
  };
}

export async function createTask(data: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
    await connectToDatabase();
    const task = await Task.create(data);
    revalidatePath('/');
    return { success: true, data: serializeTask(task) };
  } catch (error) {
    return { success: false, error: 'Failed to create task' };
  }
}

export async function getTasks() {
  try {
    await connectToDatabase();
    const tasks = await Task.find().sort({ createdAt: -1 });
    const serializedTasks = tasks.map(serializeTask);
    return { success: true, data: serializedTasks };
  } catch (error) {
    return { success: false, error: 'Failed to fetch tasks' };
  }
}

export async function updateTask(taskId: string, data: Partial<ITask>) {
  try {
    await connectToDatabase();
    const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
    revalidatePath('/');
    return { success: true, data: task ? serializeTask(task) : null };
  } catch (error) {
    return { success: false, error: 'Failed to update task' };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectToDatabase();
    await Task.findByIdAndDelete(taskId);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete task' };
  }
} 