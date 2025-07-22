import { Module, Task, TaskStatus } from '@/types';
import { calculateModuleProgress, filterTasksByStatus } from '@/utils/moduleUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TaskItem } from './TaskItem';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Edit2, 
  Trash2,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

interface ModuleCardProps {
  module: Module;
  filter: TaskStatus | 'all';
  onToggleCollapse: (moduleId: string) => void;
  onTaskStatusChange: (moduleId: string, taskId: string, status: TaskStatus) => void;
  onTaskReorder: (moduleId: string, startIndex: number, endIndex: number) => void;
  onAddTask: (moduleId: string) => void;
  onEditTask: (moduleId: string, task: Task) => void;
  onDeleteTask: (moduleId: string, taskId: string) => void;
  onEditModule: (module: Module) => void;
  onDeleteModule: (moduleId: string) => void;
}

export function ModuleCard({
  module,
  filter,
  onToggleCollapse,
  onTaskStatusChange,
  onTaskReorder,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onEditModule,
  onDeleteModule,
}: ModuleCardProps) {
  const progress = calculateModuleProgress(module);
  const filteredTasks = filterTasksByStatus(module.tasks, filter);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    onTaskReorder(
      module.id,
      result.source.index,
      result.destination.index
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => onToggleCollapse(module.id)}
            >
              {module.isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <BookOpen className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-lg font-semibold truncate">
              {module.title}
            </CardTitle>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEditModule(module)}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDeleteModule(module.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{progress.completed}/{progress.total} tasks completed</span>
            <span>{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </div>
      </CardHeader>

      {!module.isCollapsed && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>⏳ {progress.upcoming}</span>
                <span>🔄 {progress.ongoing}</span>
                <span>✅ {progress.completed}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddTask(module.id)}
                className="h-8"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Task
              </Button>
            </div>

            {filteredTasks.length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={module.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "space-y-2 max-h-96 overflow-y-auto scrollbar-thin",
                        snapshot.isDraggingOver && "bg-muted/50 rounded-lg p-2"
                      )}
                    >
                      {filteredTasks.map((task, index) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          index={index}
                          onStatusChange={(taskId, status) =>
                            onTaskStatusChange(module.id, taskId, status)
                          }
                          onEdit={(task) => onEditTask(module.id, task)}
                          onDelete={(taskId) => onDeleteTask(module.id, taskId)}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {filter === 'all' 
                    ? 'No tasks yet. Add your first task to get started!'
                    : `No ${filter} tasks found.`
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}