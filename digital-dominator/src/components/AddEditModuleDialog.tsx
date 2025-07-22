import { useState, useEffect } from 'react';
import { Module } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddEditModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  module?: Module;
  onSave: (title: string) => void;
}

export function AddEditModuleDialog({
  open,
  onOpenChange,
  module,
  onSave,
}: AddEditModuleDialogProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (module) {
      setTitle(module.title);
    } else {
      setTitle('');
    }
  }, [module, open]);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim());
      onOpenChange(false);
      setTitle('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {module ? 'Edit Module' : 'Add New Module'}
          </DialogTitle>
          <DialogDescription>
            {module 
              ? 'Update the module title below.'
              : 'Create a new learning module to organize your tasks.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="col-span-3"
              placeholder="Enter module title..."
              autoFocus
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {module ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}