// Constants for the task manager

export const TASK_STATUSES = {
  TODO: 'TODO',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

export const STATUS_OPTIONS = [
  { value: 'TODO', label: 'Chưa bắt đầu' },
  { value: 'In Progress', label: 'Đang làm' },
  { value: 'Done', label: 'Hoàn thành' }
];

export const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};

export const STATUS_COLORS = {
  'TODO': '#ef4444',
  'In Progress': '#f59e0b',
  'Done': '#10b981'
};

export const FILTER_OPTIONS = [
  { value: 'All', label: 'Tất cả' },
  { value: 'TODO', label: 'Chưa bắt đầu' },
  { value: 'In Progress', label: 'Đang làm' },
  { value: 'Done', label: 'Hoàn thành' }
];
