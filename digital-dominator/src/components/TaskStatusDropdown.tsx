import { TaskStatus } from '@/types';
import { getTaskStatusIcon, getTaskStatusLabel } from '@/utils/moduleUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface TaskStatusDropdownProps {
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
}

export function TaskStatusDropdown({ status, onStatusChange }: TaskStatusDropdownProps) {
  const statuses: TaskStatus[] = ['upcoming', 'ongoing', 'done'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <span className="mr-1">{getTaskStatusIcon(status)}</span>
          <span className="hidden sm:inline">{getTaskStatusLabel(status)}</span>
          <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statuses.map((statusOption) => (
          <DropdownMenuItem
            key={statusOption}
            onClick={() => onStatusChange(statusOption)}
            className="cursor-pointer"
          >
            <span className="mr-2">{getTaskStatusIcon(statusOption)}</span>
            {getTaskStatusLabel(statusOption)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}