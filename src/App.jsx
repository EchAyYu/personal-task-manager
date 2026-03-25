import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import Statistics from './components/Statistics';
import Modal from './components/Modal';
import { useTasks } from './hooks/useTasks';
import { filterAndSortTasks, getTaskStats } from './utils/taskUtils';
import './styles/TaskItem.css';
import './styles/TaskList.css';
import './styles/TaskForm.css';
import './styles/SearchBar.css';
import './styles/Statistics.css';
import './styles/Modal.css';
import './App.css';

function App() {
  const { tasks, addTask, updateTaskInList, deleteTask, updateTaskStatus } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = filterAndSortTasks(tasks, searchTerm, statusFilter);
  const stats = getTaskStats(tasks);

  const handleAddTask = (taskData) => {
    if (editingTask) {
      updateTaskInList(editingTask.id, {
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline
      });
      setEditingTask(null);
    } else {
      addTask(taskData.title, taskData.description, taskData.deadline);
    }
    setIsFormOpen(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>📋 Quản Lý Công Việc Cá Nhân</h1>
        <p>Quản lý hiệu quả các công việc hàng ngày của bạn</p>
      </header>

      <section className="app-content">
        <Statistics stats={stats} />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          taskCount={tasks.length}
        />

        <button
          className="btn-add-task"
          onClick={() => {
            setEditingTask(null);
            setIsFormOpen(true);
          }}
        >
          ➕ Thêm công việc mới
        </button>

        <Modal
          isOpen={isFormOpen}
          title={editingTask ? '✏️ Chỉnh sửa công việc' : '➕ Thêm công việc mới'}
          onClose={handleCloseForm}
        >
          <TaskForm
            onSubmit={handleAddTask}
            initialTask={editingTask}
            onCancel={handleCloseForm}
          />
        </Modal>

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onUpdateStatus={updateTaskStatus}
          onEdit={handleEdit}
          statusFilter={statusFilter}
        />
      </section>

      <footer className="app-footer">
        <p>© 2024 Task Manager - Quản Lý Công Việc Hiệu Quả</p>
      </footer>
    </main>
  );
}

export default App;
