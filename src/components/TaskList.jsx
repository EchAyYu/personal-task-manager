import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onDelete, onUpdateStatus, onEdit, statusFilter }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list empty">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3>Không có công việc</h3>
          <p>
            {statusFilter === 'All'
              ? 'Hãy thêm một công việc mới để bắt đầu!'
              : `Không có công việc ${statusFilter}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
