'use client';

import { useState, useEffect } from 'react';
import { Module, Task, TaskStatus, AppData } from '@/types';
import { 
  createNewModule, 
  createNewTask, 
  calculateModuleProgress,
  generateId 
} from '@/utils/moduleUtils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTheme } from '@/hooks/useTheme';

// Components
import { ThemeToggle } from '@/components/ThemeToggle';
import { ModuleCard } from '@/components/ModuleCard';
import { AddEditModuleDialog } from '@/components/AddEditModuleDialog';
import { AddEditTaskDialog } from '@/components/AddEditTaskDialog';
import { FilterTabs } from '@/components/FilterTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { Plus, BookOpen, Target, TrendingUp, Award } from 'lucide-react';

// Initial sample data
const initialData: AppData = {
  modules: [
    {
      id: generateId(),
      title: 'React Fundamentals',
      tasks: [
        {
          id: generateId(),
          title: 'Learn JSX syntax and components',
          status: 'done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: generateId(),
          title: 'Understand props and state',
          status: 'ongoing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: generateId(),
          title: 'Master React hooks',
          status: 'upcoming',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isCollapsed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: generateId(),
      title: 'TypeScript Essentials',
      tasks: [
        {
          id: generateId(),
          title: 'Basic types and interfaces',
          status: 'done',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: generateId(),
          title: 'Generics and advanced types',
          status: 'upcoming',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      isCollapsed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  theme: 'light',
  filter: 'all',
};

export default function HomePage() {
  const { theme } = useTheme();
  const [appData, setAppData] = useLocalStorage<AppData>('digital-dominator-data', initialData);
  
  // Dialog states
  const [moduleDialog, setModuleDialog] = useState<{
    open: boolean;
    module?: Module;
  }>({ open: false });
  
  const [taskDialog, setTaskDialog] = useState<{
    open: boolean;
    moduleId?: string;
    task?: Task;
  }>({ open: false });

  // Calculate overall statistics
  const totalTasks = appData.modules.reduce((sum, module) => sum + module.tasks.length, 0);
  const completedTasks = appData.modules.reduce(
    (sum, module) => sum + module.tasks.filter(task => task.status === 'done').length,
    0
  );
  const ongoingTasks = appData.modules.reduce(
    (sum, module) => sum + module.tasks.filter(task => task.status === 'ongoing').length,
    0
  );
  const upcomingTasks = appData.modules.reduce(
    (sum, module) => sum + module.tasks.filter(task => task.status === 'upcoming').length,
    0
  );

  const taskCounts = {
    all: totalTasks,
    upcoming: upcomingTasks,
    ongoing: ongoingTasks,
    done: completedTasks,
  };

  // Module operations
  const handleAddModule = () => {
    setModuleDialog({ open: true });
  };

  const handleEditModule = (module: Module) => {
    setModuleDialog({ open: true, module });
  };

  const handleSaveModule = (title: string) => {
    setAppData(prev => {
      const newModules = [...prev.modules];
      
      if (moduleDialog.module) {
        // Edit existing module
        const index = newModules.findIndex(m => m.id === moduleDialog.module!.id);
        if (index !== -1) {
          newModules[index] = {
            ...newModules[index],
            title,
            updatedAt: new Date(),
          };
        }
      } else {
        // Add new module
        newModules.push(createNewModule(title));
      }
      
      return { ...prev, modules: newModules };
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    if (confirm('Are you sure you want to delete this module and all its tasks?')) {
      setAppData(prev => ({
        ...prev,
        modules: prev.modules.filter(m => m.id !== moduleId),
      }));
    }
  };

  const handleToggleModuleCollapse = (moduleId: string) => {
    setAppData(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? { ...module, isCollapsed: !module.isCollapsed }
          : module
      ),
    }));
  };

  // Task operations
  const handleAddTask = (moduleId: string) => {
    setTaskDialog({ open: true, moduleId });
  };

  const handleEditTask = (moduleId: string, task: Task) => {
    setTaskDialog({ open: true, moduleId, task });
  };

  const handleSaveTask = (title: string) => {
    setAppData(prev => {
      const newModules = [...prev.modules];
      const moduleIndex = newModules.findIndex(m => m.id === taskDialog.moduleId);
      
      if (moduleIndex !== -1) {
        const module = { ...newModules[moduleIndex] };
        
        if (taskDialog.task) {
          // Edit existing task
          const taskIndex = module.tasks.findIndex(t => t.id === taskDialog.task!.id);
          if (taskIndex !== -1) {
            module.tasks[taskIndex] = {
              ...module.tasks[taskIndex],
              title,
              updatedAt: new Date(),
            };
          }
        } else {
          // Add new task
          module.tasks.push(createNewTask(title));
        }
        
        module.updatedAt = new Date();
        newModules[moduleIndex] = module;
      }
      
      return { ...prev, modules: newModules };
    });
  };

  const handleTaskStatusChange = (moduleId: string, taskId: string, status: TaskStatus) => {
    setAppData(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? {
              ...module,
              tasks: module.tasks.map(task =>
                task.id === taskId
                  ? { ...task, status, updatedAt: new Date() }
                  : task
              ),
              updatedAt: new Date(),
            }
          : module
      ),
    }));
  };

  const handleTaskReorder = (moduleId: string, startIndex: number, endIndex: number) => {
    setAppData(prev => ({
      ...prev,
      modules: prev.modules.map(module => {
        if (module.id === moduleId) {
          const newTasks = [...module.tasks];
          const [reorderedTask] = newTasks.splice(startIndex, 1);
          newTasks.splice(endIndex, 0, reorderedTask);
          
          return {
            ...module,
            tasks: newTasks,
            updatedAt: new Date(),
          };
        }
        return module;
      }),
    }));
  };

  const handleDeleteTask = (moduleId: string, taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setAppData(prev => ({
        ...prev,
        modules: prev.modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                tasks: module.tasks.filter(t => t.id !== taskId),
                updatedAt: new Date(),
              }
            : module
        ),
      }));
    }
  };

  const handleFilterChange = (filter: TaskStatus | 'all') => {
    setAppData(prev => ({ ...prev, filter }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Digital Dominator</h1>
                <p className="text-sm text-muted-foreground">Personal Learning Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button onClick={handleAddModule} className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Module</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">
                Across {appData.modules.length} modules
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{ongoingTasks}</div>
              <p className="text-xs text-muted-foreground">
                Currently active tasks
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{upcomingTasks}</div>
              <p className="text-xs text-muted-foreground">
                Ready to start
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <FilterTabs
            activeFilter={appData.filter}
            onFilterChange={handleFilterChange}
            taskCounts={taskCounts}
          />
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {appData.modules.length > 0 ? (
            appData.modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                filter={appData.filter}
                onToggleCollapse={handleToggleModuleCollapse}
                onTaskStatusChange={handleTaskStatusChange}
                onTaskReorder={handleTaskReorder}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onEditModule={handleEditModule}
                onDeleteModule={handleDeleteModule}
              />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <CardTitle className="mb-2">No Learning Modules Yet</CardTitle>
                <CardDescription className="mb-6 max-w-md mx-auto">
                  Get started by creating your first learning module. Organize your learning goals
                  into manageable tasks and track your progress.
                </CardDescription>
                <Button onClick={handleAddModule} size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Create Your First Module
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <AddEditModuleDialog
        open={moduleDialog.open}
        onOpenChange={(open) => setModuleDialog({ open })}
        module={moduleDialog.module}
        onSave={handleSaveModule}
      />

      <AddEditTaskDialog
        open={taskDialog.open}
        onOpenChange={(open) => setTaskDialog({ open })}
        task={taskDialog.task}
        onSave={handleSaveTask}
      />
    </div>
  );
}