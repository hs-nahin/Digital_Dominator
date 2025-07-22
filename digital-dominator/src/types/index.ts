export type TaskStatus = 'upcoming' | 'ongoing' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  tasks: Task[];
  isCollapsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppData {
  modules: Module[];
  theme: 'light' | 'dark';
  filter: TaskStatus | 'all';
}

export interface ModuleProgress {
  total: number;
  completed: number;
  ongoing: number;
  upcoming: number;
  percentage: number;
}