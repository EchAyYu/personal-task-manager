import { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onSubmit, initialTask = null, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [deadline, setDeadline] = useState(initialTask?.deadline || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Tên công việc không được để trống';
    }

    if (deadline) {
      const deadlineDate = new Date(deadline);
      if (deadlineDate <= new Date()) {
        newErrors.deadline = 'Deadline phải là thời điểm sau hiện tại';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      title,
      description,
      deadline: deadline || null
    });

    // Reset form if not editing
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Tên công việc *</label>
        <input
          id="title"
          type="text"
          placeholder="Nhập tên công việc..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Mô tả</label>
        <textarea
          id="description"
          placeholder="Nhập mô tả chi tiết (tùy chọn)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={errors.deadline ? 'error' : ''}
        />
        {errors.deadline && <span className="error-message">{errors.deadline}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {initialTask ? 'Cập nhật' : 'Thêm công việc'}
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
