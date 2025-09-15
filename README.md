# 📝 Taskly - Beautiful Todo App

A modern, feature-rich todo application built with Angular 18, featuring a beautiful UI with glass-morphism effects, advanced filtering, and local storage persistence.

![Angular](https://img.shields.io/badge/Angular-18-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![SCSS](https://img.shields.io/badge/SCSS-Styling-pink.svg)
![RxJS](https://img.shields.io/badge/RxJS-Reactive%20Programming-purple.svg)

Demo - https://www.youtube.com/watch?v=AAnNvCZqi44

## ✨ Features

### 🎨 **Beautiful Modern UI**
- **Glass-morphism Design**: Beautiful gradient backgrounds with backdrop blur effects
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Color-coded Priorities**: Visual priority indicators (🔴 High, 🟡 Medium, 🟢 Low)
- **Clash Grotesk Font**: Modern typography for enhanced readability
- **Custom Color Scheme**: Bright Orange (#ff1e00), Dim Blue (#e8f9fd), and Alert Green (#59ce8f) palette

### 📋 **Core Todo Functionality**
- ✅ **Add Todos**: Create new todos with title, description, and priority level
- ✏️ **Edit Todos**: Inline editing with beautiful form modals
- 🗑️ **Delete Todos**: Remove todos with confirmation dialogs
- ☑️ **Toggle Completion**: Mark todos as complete/incomplete with visual feedback

### 🔍 **Advanced Filtering & Search**
- **Status Filters**: Filter by All, Active, or Completed todos
- **Priority Filters**: Filter by High, Medium, Low priority, or All Priorities
- **Real-time Search**: Search across titles, descriptions, and tags
- **Clear Filters**: One-click filter reset functionality
- **Smart Sorting**: Automatic sorting by priority (High → Medium → Low) and creation date

### 📊 **Smart Statistics Dashboard**
- **Live Statistics**: Real-time count of total, active, and completed todos
- **Visual Progress Indicators**: Beautiful animated counters with gradient text

### 💾 **Data Persistence & Management**
- **Local Storage**: All data persists between browser sessions
- **Automatic Saving**: Changes saved instantly without manual intervention
- **Data Recovery**: Seamless data restoration on app reload
- **Error Handling**: Graceful error handling for data loading/saving

### ⚡ **Performance & User Experience**
- **Reactive Programming**: Built with RxJS for optimal performance and real-time updates
- **TrackBy Functions**: Efficient DOM updates with Angular's change detection
- **Memory Management**: Proper subscription cleanup prevents memory leaks
- **Component Lifecycle**: Proper initialization and cleanup with OnDestroy
- **Observable Streams**: Reactive data flow with BehaviorSubject and combineLatest

### 🎯 **Bulk Operations**
- **Mark All Complete**: Complete all active todos with one click
- **Clear Completed**: Remove all completed todos in bulk with confirmation
- **Batch Operations**: Efficient management of multiple todos

### 🔧 **Advanced Features**
- **Real-time Updates**: Instant UI updates without page refresh
- **Form Validation**: Smart validation with user-friendly error messages
- **Confirmation Dialogs**: User-friendly confirmation for destructive actions
- **Empty States**: Beautiful empty state messages with call-to-action buttons
- **Loading States**: Smooth loading and transition animations

### 🎨 **Priority System**
- **Three Priority Levels**: High (🔴), Medium (🟡), Low (🟢)
- **Visual Indicators**: Color-coded priority badges and icons
- **Priority Sorting**: Automatic sorting by priority level
- **Priority Filtering**: Filter todos by specific priority levels

### 📱 **Responsive Design**
- **Mobile Optimized**: Touch-friendly interface for mobile devices
- **Tablet Support**: Optimized layout for tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Adaptive Layout**: Flexible design that works on any screen size

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Angular CLI** (v18 or higher)

### Installation
```bash
# Install Angular CLI globally
npm install -g @angular/cli@18

# Navigate to project directory
cd todo-app

# Install dependencies
npm install

# Start development server
ng serve
```

### Usage
1. **Create Todos**: Click "➕ Add Todo" to create new tasks
2. **Set Priority**: Choose High (🔴), Medium (🟡), or Low (🟢) priority
3. **Add Details**: Include descriptions and organize with tags
4. **Organize**: Use tags to categorize your todos
5. **Filter**: Use search bar and filter buttons to find specific todos
6. **Monitor Stats**: View live statistics of your todos
7. **Manage**: Edit, delete, or mark todos as complete

## 🏗️ Architecture

### **Frontend Stack**
- **Angular 18**: Latest version with standalone components
- **TypeScript**: Full type safety and modern JavaScript features
- **RxJS**: Reactive programming for data flow management
- **SCSS**: Advanced styling with CSS variables and mixins
- **Local Storage**: Client-side data persistence

### **Key Components**
- **TodoListComponent**: Main container with filtering, search, and statistics
- **TodoItemComponent**: Individual todo card with edit/delete functionality
- **TodoService**: Centralized business logic with reactive data streams
- **Todo Model**: Type-safe interfaces for todos, priorities, and filters

### **Data Flow**
- **Reactive Architecture**: Uses RxJS Observables for real-time data updates
- **Service Layer**: Centralized business logic in TodoService
- **Component Communication**: Parent-child communication through Input/Output
- **State Management**: Local state with reactive updates

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### **Project Structure**
```
src/
├── app/
│   ├── components/
│   │   ├── todo-item/          # Individual todo component
│   │   └── todo-list/          # Main todo list component
│   ├── models/
│   │   └── todo.model.ts       # Type definitions
│   ├── services/
│   │   └── todo.service.ts     # Business logic
│   └── app.component.ts        # Root component
├── styles.scss                 # Global styles
└── index.html                  # Main HTML file
```

### **Key Features Implementation**
- **Local Storage**: Automatic saving/loading of todos
- **Filtering**: Multi-criteria filtering with real-time updates
- **Search**: Full-text search across all todo properties
- **Statistics**: Live calculation of todo counts
- **Animations**: Smooth transitions and hover effects

---

**Made with ❤️ using Angular 18**

*Stay productive with Taskly! 🎉*
