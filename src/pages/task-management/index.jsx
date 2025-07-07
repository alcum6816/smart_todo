import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TaskItem from './components/TaskItem';
import TaskFilters from './components/TaskFilters';
import TaskCreator from './components/TaskCreator';
import ViewToggle from './components/ViewToggle';
import KanbanBoard from './components/KanbanBoard';
import CalendarView from './components/CalendarView';
import BulkActions from './components/BulkActions';
import VoiceTaskInput from './components/VoiceTaskInput';

const TaskManagement = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all',
    category: 'all',
    status: 'all',
    sortBy: 'dueDate'
  });

  // Mock tasks data
  const mockTasks = [
    {
      id: 1,
      title: "Review project proposal and provide feedback",
      description: "Go through the detailed project proposal document and provide comprehensive feedback on technical feasibility, timeline, and resource requirements.",
      priority: "high",
      category: "work",
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      aiEstimate: "2 hours",
      aiTags: ["review", "feedback", "urgent"],
      aiInsights: "This task requires focused attention and should be completed during your peak productivity hours (9-11 AM based on your patterns).",
      suggestedTime: "9:00 AM - 11:00 AM",
      dependencies: ["Receive proposal document"]
    },
    {
      id: 2,
      title: "Call client about upcoming meeting",
      description: "Schedule a call with the client to discuss the agenda for next week\'s strategic planning meeting.",
      priority: "medium",
      category: "work",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      aiEstimate: "30 min",
      aiTags: ["communication", "meeting", "client"],
      aiInsights: "Best time to call based on client\'s timezone and availability patterns is between 2-4 PM.",
      suggestedTime: "2:00 PM - 4:00 PM"
    },
    {
      id: 3,
      title: "Complete quarterly report",
      description: "Compile and analyze Q3 performance metrics, create visualizations, and prepare executive summary.",
      priority: "high",
      category: "work",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      aiEstimate: "4 hours",
      aiTags: ["report", "analysis", "quarterly"],
      aiInsights: "Break this task into smaller chunks: data collection (1h), analysis (2h), report writing (1h).",
      suggestedTime: "Morning sessions over 2 days"
    },
    {
      id: 4,
      title: "Buy groceries for the week",
      description: "Get fresh vegetables, fruits, dairy products, and pantry essentials for meal planning.",
      priority: "low",
      category: "personal",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      createdAt: new Date().toISOString(),
      aiEstimate: "1 hour",
      aiTags: ["shopping", "weekly", "essentials"],
      aiInsights: "Combine with other errands to optimize travel time. Best shopping time is early morning or late evening to avoid crowds."
    },
    {
      id: 5,
      title: "Schedule annual health checkup",
      description: "Book appointment with primary care physician for annual physical examination and health screening.",
      priority: "medium",
      category: "health",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      aiEstimate: "15 min",
      aiTags: ["health", "appointment", "annual"],
      aiInsights: "Book early morning appointments to avoid delays. Consider scheduling lab work on the same day."
    },
    {
      id: 6,
      title: "Learn React 18 new features",
      description: "Study concurrent features, automatic batching, and new hooks in React 18. Complete hands-on tutorial.",
      priority: "medium",
      category: "learning",
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      aiEstimate: "3 hours",
      aiTags: ["learning", "react", "development"],
      aiInsights: "Break into 30-minute focused sessions. Practice with small projects to reinforce learning."
    },
    {
      id: 7,
      title: "Prepare presentation slides",
      description: "Create engaging slides for next week\'s team presentation on project progress and future roadmap.",
      priority: "high",
      category: "work",
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      completed: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      aiEstimate: "2 hours",
      aiTags: ["presentation", "slides", "team"],
      aiInsights: "Completed ahead of schedule. Great job on time management!"
    },
    {
      id: 8,
      title: "Exercise - Morning run",
      description: "30-minute morning run in the park to maintain fitness routine and start the day energized.",
      priority: "low",
      category: "health",
      dueDate: new Date().toISOString(),
      completed: true,
      createdAt: new Date().toISOString(),
      aiEstimate: "30 min",
      aiTags: ["exercise", "routine", "morning"],
      aiInsights: "Excellent consistency with morning exercise routine. Keep it up!"
    }
  ];

  // Initialize tasks
  useEffect(() => {
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  // Handle search from header
  useEffect(() => {
    if (location.state?.searchQuery) {
      setFilters(prev => ({ ...prev, search: location.state.searchQuery }));
    }
  }, [location.state]);

  // Filter and sort tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm) ||
        task.aiTags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Apply priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      if (filters.status === 'completed') {
        filtered = filtered.filter(task => task.completed);
      } else if (filters.status === 'pending') {
        filtered = filtered.filter(task => !task.completed);
      } else if (filters.status === 'overdue') {
        filtered = filtered.filter(task => 
          !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
        );
      }
    }

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        const start = filters.startDate ? new Date(filters.startDate) : new Date(0);
        const end = filters.endDate ? new Date(filters.endDate) : new Date('2099-12-31');
        return taskDate >= start && taskDate <= end;
      });
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'aiRecommended':
          // AI-based sorting (mock implementation)
          return (b.priority === 'high' ? 1 : 0) - (a.priority === 'high' ? 1 : 0);
        case 'dueDate':
        default:
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, filters]);

  const handleTaskToggle = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setIsTaskCreatorOpen(true);
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setSelectedTasks(prev => prev.filter(id => id !== taskId));
  };

  const handleTaskDuplicate = (task) => {
    const duplicatedTask = {
      ...task,
      id: Date.now(),
      title: `${task.title} (Copy)`,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, duplicatedTask]);
  };

  const handleTaskCreate = (newTask) => {
    if (editingTask) {
      setTasks(prev => prev.map(task =>
        task.id === editingTask.id ? { ...newTask, id: editingTask.id } : task
      ));
      setEditingTask(null);
    } else {
      setTasks(prev => [...prev, newTask]);
    }
    setIsTaskCreatorOpen(false);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskSelection = (taskId, isSelected) => {
    if (isSelected) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id));
    }
  };

  const handleBulkAction = (action, taskIds, value) => {
    switch (action) {
      case 'complete':
        setTasks(prev => prev.map(task =>
          taskIds.includes(task.id) ? { ...task, completed: true } : task
        ));
        break;
      case 'incomplete':
        setTasks(prev => prev.map(task =>
          taskIds.includes(task.id) ? { ...task, completed: false } : task
        ));
        break;
      case 'priority':
        setTasks(prev => prev.map(task =>
          taskIds.includes(task.id) ? { ...task, priority: value } : task
        ));
        break;
      case 'duplicate':
        const tasksToduplicate = tasks.filter(task => taskIds.includes(task.id));
        const duplicatedTasks = tasksToDouble.map(task => ({
          ...task,
          id: Date.now() + Math.random(),
          title: `${task.title} (Copy)`,
          completed: false,
          createdAt: new Date().toISOString()
        }));
        setTasks(prev => [...prev, ...duplicatedTasks]);
        break;
      case 'delete':
        setTasks(prev => prev.filter(task => !taskIds.includes(task.id)));
        break;
      case 'ai-optimize':
        // AI optimization logic
        console.log('AI optimizing tasks:', taskIds);
        break;
      case 'ai-group':
        // AI grouping logic
        console.log('AI grouping tasks:', taskIds);
        break;
      case 'ai-deadlines':
        // AI deadline suggestions
        console.log('AI suggesting deadlines for tasks:', taskIds);
        break;
      case 'ai-breakdown':
        // AI task breakdown
        console.log('AI breaking down tasks:', taskIds);
        break;
    }
    setSelectedTasks([]);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      priority: 'all',
      category: 'all',
      status: 'all',
      sortBy: 'dueDate'
    });
  };

  const renderTaskList = () => {
    if (filteredTasks.length === 0) {
      return (
        <div className="text-center py-12">
          <Icon name="CheckSquare" size={48} className="text-text-muted mb-4 mx-auto" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No tasks found</h3>
          <p className="text-text-muted mb-4">
            {filters.search || filters.priority !== 'all' || filters.category !== 'all' || filters.status !== 'all' ?'Try adjusting your filters or search terms' :'Create your first task to get started with AI-powered productivity'
            }
          </p>
          <Button
            variant="primary"
            onClick={() => setIsTaskCreatorOpen(true)}
            iconName="Plus"
          >
            Create Task
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {/* Select All */}
        <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">
              Select all ({filteredTasks.length} tasks)
            </span>
          </label>
          
          {selectedTasks.length > 0 && (
            <span className="text-sm text-primary font-medium">
              {selectedTasks.length} selected
            </span>
          )}
        </div>

        {/* Task List */}
        {filteredTasks.map((task) => (
          <div key={task.id} className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-5"
            />
            <div className="flex-1">
              <TaskItem
                task={task}
                viewMode="list"
                onToggleComplete={handleTaskToggle}
                onEdit={handleTaskEdit}
                onDelete={handleTaskDelete}
                onDuplicate={handleTaskDuplicate}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <TaskFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isOpen={isFiltersOpen}
              onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <ViewToggle
                currentView={currentView}
                onViewChange={setCurrentView}
                taskCount={filteredTasks.length}
              />
              
              <Button
                variant="primary"
                onClick={() => setIsTaskCreatorOpen(true)}
                iconName="Plus"
              >
                New Task
              </Button>
            </div>

            {/* Task Views */}
            {currentView === 'list' && renderTaskList()}
            
            {currentView === 'kanban' && (
              <KanbanBoard
                tasks={filteredTasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskDuplicate={handleTaskDuplicate}
                onTaskEdit={handleTaskEdit}
              />
            )}
            
            {currentView === 'calendar' && (
              <CalendarView
                tasks={filteredTasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskDuplicate={handleTaskDuplicate}
                onTaskEdit={handleTaskEdit}
              />
            )}
          </div>
        </div>
      </div>

      {/* Task Creator Modal */}
      <TaskCreator
        isOpen={isTaskCreatorOpen}
        onClose={() => {
          setIsTaskCreatorOpen(false);
          setEditingTask(null);
        }}
        onCreateTask={handleTaskCreate}
        editingTask={editingTask}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedTasks={selectedTasks}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedTasks([])}
      />

      {/* Voice Task Input */}
      <VoiceTaskInput
        onTaskCreate={handleTaskCreate}
        isVisible={currentView === 'list'}
      />
    </div>
  );
};

export default TaskManagement;
