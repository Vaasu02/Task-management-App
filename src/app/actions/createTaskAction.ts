'use server';

import { createTask } from "./task";
import { ITask } from "@/types";

export async function createTaskAction(data: Omit<ITask, '_id' | 'createdAt' | 'updatedAt'>) {
  return createTask(data);
} 