import { Module, Task, TaskStatus, ModuleProgress } from '@/types';

export function calculateModuleProgress(module: Module): ModuleProgress {
  const total = module.tasks.length;
  const completed = module.tasks.filter(task => task.status === 'done').length;
  const ongoing = module.tasks.filter(task => task.status === 'ongoing').length;
  const upcoming = module.tasks.filter(task => task.status === 'upcoming').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    ongoing,
    upcoming,
    percentage
  };
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createNewModule(title: string): Module {
  return {
    id: generateId(),
    title,
    tasks: [],
    isCollapsed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export function createNewTask(title: string): Task {
  return {
    id: generateId(),
    title,
    status: 'upcoming',
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

export function getTaskStatusIcon(status: TaskStatus): string {
  switch (status) {
    case 'upcoming':
      return '⏳';
    case 'ongoing':
      return '🔄';
    case 'done':
      return '✅';
    default:
      return '⏳';
  }
}

export function getTaskStatusLabel(status: TaskStatus): string {
  switch (status) {
    case 'upcoming':
      return 'Upcoming';
    case 'ongoing':
      return 'Ongoing';
    case 'done':
      return 'Done';
    default:
      return 'Upcoming';
  }
}

export function filterTasksByStatus(tasks: Task[], filter: TaskStatus | 'all'): Task[] {
  if (filter === 'all') return tasks;
  return tasks.filter(task => task.status === filter);
}