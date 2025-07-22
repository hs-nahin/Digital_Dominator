import { TaskStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { getTaskStatusIcon } from '@/utils/moduleUtils';
import { cn } from '@/lib/utils';

interface FilterTabsProps {
  activeFilter: TaskStatus | 'all';
  onFilterChange: (filter: TaskStatus | 'all') => void;
  taskCounts: {
    all: number;
    upcoming: number;
    ongoing: number;
    done: number;
  };
}

export function FilterTabs({ activeFilter, onFilterChange, taskCounts }: FilterTabsProps) {
  const filters: Array<{ key: TaskStatus | 'all'; label: string; icon: string }> = [
    { key: 'all', label: 'All', icon: '📚' },
    { key: 'upcoming', label: 'Upcoming', icon: '⏳' },
    { key: 'ongoing', label: 'Ongoing', icon: '🔄' },
    { key: 'done', label: 'Done', icon: '✅' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={activeFilter === filter.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "flex items-center gap-2 transition-all",
            activeFilter === filter.key && "shadow-md"
          )}
        >
          <span>{filter.icon}</span>
          <span className="hidden sm:inline">{filter.label}</span>
          <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">
            {taskCounts[filter.key]}
          </span>
        </Button>
      ))}
    </div>
  );
}