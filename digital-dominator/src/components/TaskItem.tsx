import { Task, TaskStatus } from '@/types';
import { TaskStatusDropdown } from './TaskStatusDropdown';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Draggable } from '@hello-pangea/dnd';

interface TaskItemProps {
  task: Task;
  index: number;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, index, onStatusChange, onEdit, onDelete }: TaskItemProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "flex items-center justify-between p-3 bg-card border rounded-lg transition-all duration-200",
            snapshot.isDragging && "shadow-lg rotate-2 scale-105",
            task.status === 'done' && "opacity-60"
          )}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              {...provided.dragHandleProps}
              className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <span
              className={cn(
                "flex-1 text-sm font-medium truncate",
                task.status === 'done' && "line-through"
              )}
            >
              {task.title}
            </span>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <TaskStatusDropdown
              status={task.status}
              onStatusChange={(status) => onStatusChange(task.id, status)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(task)}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
}