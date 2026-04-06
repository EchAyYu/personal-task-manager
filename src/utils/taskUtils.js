// Task utility functions
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const isOverdue = (task) => {
  if (!task || !task.deadline || task.status === 'Done') return false;
  const deadlineDate = new Date(task.deadline);
  const now = new Date();
  return deadlineDate < now;
};

export const isNearDeadline = (task) => {
  if (!task || !task.deadline || task.status === 'Done') return false;
  const now = new Date();
  const deadlineDate = new Date(task.deadline);
  const diff = deadlineDate - now;
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
};

export const isDeadlineToday = (deadline) => {
  if (!deadline) return false;
  const today = new Date().toDateString();
  const deadlineDate = new Date(deadline).toDateString();
  return today === deadlineDate;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Hôm nay';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Ngày mai';
  }

  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const getTaskStats = (tasks) => {
  const total = tasks.length;
  const todo = tasks.filter(t => t.status === 'TODO').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Done').length;
  const overdue = tasks.filter(t => isOverdue(t)).length;

  return {
    total,
    todo,
    inProgress,
    completed,
    overdue
  };
};

export const filterAndSortTasks = (tasks, searchTerm, statusFilter) => {
  let filtered = tasks;

  // Filter by status
  if (statusFilter !== 'All') {
    filtered = filtered.filter(task => task.status === statusFilter);
  }

  // Filter by search term
  if (searchTerm.trim()) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(lowerSearchTerm) ||
      task.description.toLowerCase().includes(lowerSearchTerm)
    );
  }

  // Sort by deadline (overdue first, then by date, then by status)
  filtered.sort((a, b) => {
    // Overdue tasks first
    const aOverdue = isOverdue(a) ? 0 : 1;
    const bOverdue = isOverdue(b) ? 0 : 1;
    if (aOverdue !== bOverdue) return aOverdue - bOverdue;

    // Then by deadline
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    if (a.deadline) return -1;
    if (b.deadline) return 1;

    // Then by creation date (newest first)
    return b.createdAt - a.createdAt;
  });

  return filtered;
};

export const createNewTask = (title, description = '', deadline = null) => {
  return {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    status: 'TODO',
    deadline: deadline || null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
};

export const updateTask = (task, updates) => {
  return {
    ...task,
    ...updates,
    updatedAt: Date.now()
  };
};
