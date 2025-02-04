export interface ITask {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  createdAt?: string;
  updatedAt?: string;
} 