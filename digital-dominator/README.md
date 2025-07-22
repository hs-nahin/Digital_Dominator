# Digital Dominator - Personal Learning Tracker

A modern, responsive web application for tracking your personal learning progress. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

### 🎯 Core Functionality
- **Learning Modules**: Organize your learning into collapsible modules
- **Task Management**: Add, edit, delete, and reorder tasks within modules
- **Progress Tracking**: Visual progress bars and statistics for each module
- **Three Task States**: 
  - ⏳ Upcoming (default)
  - 🔄 Ongoing (in progress)
  - ✅ Done (completed with strikethrough)

### 🎨 User Experience
- **Responsive Design**: Works flawlessly on mobile, tablet, and desktop
- **Dark/Light Theme**: Toggle between themes with preference saved locally
- **Drag & Drop**: Reorder tasks within modules using intuitive drag and drop
- **Smart Filtering**: Filter tasks by status (All, Upcoming, Ongoing, Done)
- **Local Storage**: All data persists between sessions

### 🛠 Technical Features
- **Next.js 14**: Modern React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Beautiful, accessible UI components
- **React Beautiful DND**: Smooth drag and drop functionality
- **Responsive Grid**: Adaptive layouts for all screen sizes

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-dominator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### Creating Your First Module
1. Click the "Add Module" button in the header
2. Enter a descriptive title for your learning module
3. Click "Create" to add the module

### Managing Tasks
- **Add Task**: Click the "Add Task" button within any module
- **Change Status**: Click the status dropdown (⏳/🔄/✅) to update task progress
- **Edit Task**: Click the edit icon to modify task title
- **Delete Task**: Click the trash icon to remove a task
- **Reorder Tasks**: Drag and drop tasks using the grip handle

### Using Filters
- **All**: Show all tasks regardless of status
- **Upcoming**: Show only tasks that haven't been started
- **Ongoing**: Show only tasks currently in progress
- **Done**: Show only completed tasks

### Theme Toggle
Click the sun/moon icon in the header to switch between light and dark themes.

## Project Structure

```
digital-dominator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── AddEditModuleDialog.tsx
│   │   ├── AddEditTaskDialog.tsx
│   │   ├── FilterTabs.tsx
│   │   ├── ModuleCard.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskStatusDropdown.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   └── useTheme.ts
│   ├── lib/                  # Utility libraries
│   │   └── utils.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   └── utils/                # Utility functions
│       └── moduleUtils.ts
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json
```

## Key Components

### ModuleCard
The main component for displaying learning modules with:
- Collapsible interface
- Progress tracking
- Task management
- Drag and drop support

### TaskItem
Individual task component featuring:
- Status dropdown
- Edit/delete actions
- Drag handle for reordering
- Visual status indicators

### Dialogs
Modal dialogs for:
- Adding/editing modules
- Adding/editing tasks
- Form validation and keyboard shortcuts

## Data Persistence

All application data is stored in the browser's localStorage:
- Learning modules and tasks
- Theme preference
- Filter settings
- Module collapse states

## Responsive Design

The application uses a mobile-first approach with breakpoints:
- **Mobile**: < 640px - Single column layout
- **Tablet**: 640px - 1024px - Optimized touch interactions
- **Desktop**: > 1024px - Full feature set with hover states

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons
- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd) - Drag and drop