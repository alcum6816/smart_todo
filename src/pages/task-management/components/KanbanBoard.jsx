import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import TaskItem from './TaskItem';

const KanbanBoard = ({ tasks, onTaskUpdate, onTaskDelete, onTaskDuplicate, onTaskEdit }) => {
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { 
      id: 'todo', 
      title: 'To Do', 
      color: 'bg-secondary-100 text-secondary-600',
      tasks: tasks.filter(task => !task.completed && !isOverdue(task))
    },
    { 
      id: 'inProgress', 
      title: 'In Progress', 
      color: 'bg-warning-100 text-warning-600',
      tasks: tasks.filter(task => task.status === 'inProgress')
    },
    { 
      id: 'overdue', 
      title: 'Overdue', 
      color: 'bg-error-100 text-error-600',
      tasks: tasks.filter(task => isOverdue(task) && !task.completed)
    },
    { 
      id: 'completed', 
      title: 'Completed', 
      color: 'bg-success-100 text-success-600',
      tasks: tasks.filter(task => task.completed)
    }
  ];

  function isOverdue(task) {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && !task.completed;
  }

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (!draggedTask) return;

    let updatedTask = { ...draggedTask };
    
    switch (columnId) {
      case 'todo':
        updatedTask.completed = false;
        updatedTask.status = 'todo';
        break;
      case 'inProgress':
        updatedTask.completed = false;
        updatedTask.status = 'inProgress';
        break;
      case 'completed':
        updatedTask.completed = true;
        updatedTask.status = 'completed';
        break;
      default:
        break;
    }

    onTaskUpdate(updatedTask);
    setDraggedTask(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div
          key={column.id}
          className="bg-surface border border-border rounded-lg overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className={`p-4 ${column.color} border-b border-border`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{column.title}</h3>
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium">
                {column.tasks.length}
              </span>
            </div>
          </div>

          {/* Column Content */}
          <div className="p-4 space-y-3 min-h-[400px]">
            {column.tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="Package" size={32} className="text-text-muted mb-2" />
                <p className="text-sm text-text-muted">No tasks in {column.title.toLowerCase()}</p>
              </div>
            ) : (
              column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  className={`cursor-move transition-all duration-200 ${
                    draggedTask?.id === task.id ? 'opacity-50 scale-95' : ''
                  }`}
                >
                  <TaskItem
                    task={task}
                    viewMode="kanban"
                    onToggleComplete={(id) => {
                      const updatedTask = { ...task, completed: !task.completed };
                      onTaskUpdate(updatedTask);
                    }}
                    onEdit={onTaskEdit}
                    onDelete={onTaskDelete}
                    onDuplicate={onTaskDuplicate}
                  />
                </div>
              ))
            )}

            {/* Add Task Button for Todo Column */}
            {column.id === 'todo' && (
              <button className="w-full p-3 border-2 border-dashed border-border rounded-lg text-text-muted hover:text-text-primary hover:border-primary transition-all duration-200 flex items-center justify-center space-x-2">
                <Icon name="Plus" size={16} />
                <span className="text-sm">Add Task</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
