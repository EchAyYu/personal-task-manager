import { isOverdue, isNearDeadline, formatDate } from '../utils/taskUtils';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onDelete, onUpdateStatus, onEdit }) => {
  const isTaskOverdue = isOverdue(task);
  const isTaskNearDeadline = isNearDeadline(task);

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(task.id, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'TODO':
        return '#ef4444';
      case 'In Progress':
        return '#f59e0b';
      case 'Done':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'TODO':
        return 'Chưa bắt đầu';
      case 'In Progress':
        return 'Đang làm';
      case 'Done':
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  return (
    <div className={`task-item ${isTaskOverdue ? 'overdue' : ''} ${isTaskNearDeadline ? 'near-deadline' : ''}`}>
      <div className="task-header">
        <div className="task-title-section">
          <h3 className={task.status === 'Done' ? 'completed' : ''}>{task.title}</h3>
          {task.deadline && (
            <span className={`deadline-badge ${isTaskOverdue ? 'overdue' : isTaskNearDeadline ? 'warning' : ''}`}>
              📅 {formatDate(task.deadline)}
              {isTaskOverdue && ' (Quá hạn)'}
              {isTaskNearDeadline && ' (Sắp hết hạn)'}
            </span>
          )}
        </div>
        <div className="task-actions">
          <button className="btn-edit" onClick={() => onEdit(task)} title="Chỉnh sửa">
            ✏️
          </button>
          <button className="btn-delete" onClick={() => onDelete(task.id)} title="Xóa">
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="status-selector">
          <label>Trạng thái:</label>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="status-dropdown"
          >
            <option value="TODO">Chưa bắt đầu</option>
            <option value="In Progress">Đang làm</option>
            <option value="Done">Hoàn thành</option>
          </select>
          <span className="status-label" style={{ color: getStatusColor(task.status) }}>
            {getStatusLabel(task.status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
