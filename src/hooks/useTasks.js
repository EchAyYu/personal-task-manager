import { useState, useCallback } from 'react';
import { getTasks, saveTasks } from '../utils/localStorage';
import { createNewTask, updateTask } from '../utils/taskUtils';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => getTasks());

  // Add a new task
  const addTask = useCallback((title, description = '', deadline = null) => {
    const newTask = createNewTask(title, description, deadline);
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    return newTask;
  }, [tasks]);

  // Update an existing task
  const updateTaskInList = useCallback((taskId, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? updateTask(task, updates) : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }, [tasks]);

  // Delete a task
  const deleteTask = useCallback((taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }, [tasks]);

  // Update task status
  const updateTaskStatus = useCallback((taskId, status) => {
    updateTaskInList(taskId, { status });
  }, [updateTaskInList]);

  // Bulk delete tasks
  const deleteTasks = useCallback((taskIds) => {
    const updatedTasks = tasks.filter(task => !taskIds.includes(task.id));
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }, [tasks]);

  // Clear all tasks
  const clearAllTasks = useCallback(() => {
    setTasks([]);
    saveTasks([]);
  }, []);

  return {
    tasks,
    addTask,
    updateTaskInList,
    deleteTask,
    updateTaskStatus,
    deleteTasks,
    clearAllTasks,
    setTasks
  };
};
