import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ tasks, onTaskUpdate, onTaskDelete, onTaskDuplicate, onTaskEdit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth, -i);
    calendarDays.push({ date, isCurrentMonth: false });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push({ date, isCurrentMonth: true });
  }
  
  // Next month's leading days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    calendarDays.push({ date, isCurrentMonth: false });
  }

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-text-primary">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Export
          </Button>
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-text-secondary bg-secondary-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((calendarDay, index) => {
            const dayTasks = getTasksForDate(calendarDay.date);
            const completedTasks = dayTasks.filter(task => task.completed);
            const pendingTasks = dayTasks.filter(task => !task.completed);
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-border cursor-pointer transition-all duration-200 ${
                  !calendarDay.isCurrentMonth 
                    ? 'bg-secondary-50 text-text-muted' :'bg-surface hover:bg-secondary-50'
                } ${
                  isToday(calendarDay.date) 
                    ? 'bg-primary-50 border-primary-200' :''
                } ${
                  isSelected(calendarDay.date) 
                    ? 'ring-2 ring-primary' :''
                }`}
                onClick={() => setSelectedDate(calendarDay.date)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isToday(calendarDay.date) ? 'text-primary' : ''
                  }`}>
                    {calendarDay.date.getDate()}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-xs text-text-muted">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                {/* Task Indicators */}
                <div className="space-y-1">
                  {pendingTasks.slice(0, 3).map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`text-xs p-1 rounded truncate ${
                        task.priority === 'high' ? 'bg-error-100 text-error-700' :
                        task.priority === 'medium'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  
                  {completedTasks.slice(0, 2).map((task, taskIndex) => (
                    <div
                      key={`completed-${taskIndex}`}
                      className="text-xs p-1 rounded truncate bg-secondary-100 text-secondary-600 line-through opacity-60"
                      title={`${task.title} (Completed)`}
                    >
                      {task.title}
                    </div>
                  ))}

                  {dayTasks.length > 5 && (
                    <div className="text-xs text-text-muted">
                      +{dayTasks.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Tasks */}
      {selectedDate && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Tasks for {selectedDate.toLocaleDateString()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDate(null)}
              iconName="X"
            />
          </div>

          {getTasksForDate(selectedDate).length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Calendar" size={32} className="text-text-muted mb-2 mx-auto" />
              <p className="text-text-muted">No tasks scheduled for this date</p>
            </div>
          ) : (
            <div className="space-y-3">
              {getTasksForDate(selectedDate).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors"
                >
                  <button
                    onClick={() => onTaskUpdate({ ...task, completed: !task.completed })}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      task.completed
                        ? 'bg-success border-success text-white' :'border-border hover:border-primary'
                    }`}
                  >
                    {task.completed && <Icon name="Check" size={12} />}
                  </button>

                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`w-2 h-2 rounded-full ${getTaskPriorityColor(task.priority)}`}></span>
                      <span className="text-xs text-text-muted capitalize">{task.priority} priority</span>
                      <span className="text-xs text-text-muted">•</span>
                      <span className="text-xs text-text-muted capitalize">{task.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onTaskEdit(task)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => onTaskDelete(task.id)}
                      iconName="Trash2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
