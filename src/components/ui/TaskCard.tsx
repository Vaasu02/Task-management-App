import { ITask } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { format, parseISO } from 'date-fns';
import { Badge } from './badge';
import { Button } from './button';
import { Pencil, Trash2, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

interface TaskCardProps {
  task: ITask;
  onEdit?: (task: ITask) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: 'pending' | 'completed') => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  // Format dates on the client side only
  const formattedDueDate = format(parseISO(task.dueDate), 'MMM d, yyyy');
  const formattedCreatedAt = task.createdAt 
    ? format(parseISO(task.createdAt), 'MMM d, yyyy h:mm a')
    : null;

  return (
    <Card className="task-card w-full border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-100">{task.title}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge 
            variant={task.status === 'completed' ? 'default' : 'secondary'}
            className={task.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}
          >
            {task.status}
          </Badge>
          <div className="flex items-center gap-1">
            {/* Status Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onStatusChange?.(task._id!, 
                task.status === 'completed' ? 'pending' : 'completed'
              )}
              title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
              className="hover:bg-white/10"
            >
              {task.status === 'completed' ? 
                <XCircle className="h-4 w-4 text-zinc-400" /> : 
                <CheckCircle className="h-4 w-4 text-zinc-400" />
              }
            </Button>

            {/* Edit Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit?.(task)}
              title="Edit task"
              className="hover:bg-white/10"
            >
              <Pencil className="h-4 w-4 text-zinc-400" />
            </Button>

            {/* Delete Button with Confirmation */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Delete task"
                  className="hover:bg-white/10"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    This action cannot be undone. This will permanently delete the task.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete?.(task._id!)}
                    className="bg-red-500/20 text-red-300 hover:bg-red-500/30"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400">{task.description}</p>
        <div className="mt-4 flex flex-col gap-1 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Due: {formattedDueDate}
          </div>
          {formattedCreatedAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Created: {formattedCreatedAt}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 