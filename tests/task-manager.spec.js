import { test, expect } from '@playwright/test';
import {
  resetApp,
  openAddTaskModal,
  addTask,
  createTask,
  editTask,
  deleteTask,
  changeTaskStatus,
  searchTask,
  filterByStatus,
  getFutureDateTimeLocal,
  getPastDateTimeLocal,
} from './helpers/task-manager.helper.js';

test.describe('Personal Task Manager E2E', () => {
  test.beforeEach(async ({ page }) => {
    await resetApp(page);
  });

  test('should render default page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Quản Lý Công Việc Cá Nhân');
    await expect(page.locator('.btn-add-task')).toBeVisible();
    await expect(page.locator('.statistics')).toBeVisible();
    await expect(page.locator('.task-list.empty')).toBeVisible();
    await expect(page.locator('.empty-state h3')).toHaveText('Không có công việc');
  });

  test('should open and close add task modal', async ({ page }) => {
    await openAddTaskModal(page);
    await expect(page.locator('#title')).toBeVisible();
    await expect(page.locator('#description')).toBeVisible();
    await expect(page.locator('#deadline')).toBeVisible();

    await page.getByRole('button', { name: 'Hủy' }).click();
    await expect(page.locator('.modal-content')).toHaveCount(0);
  });

  test('should create a task with title only', async ({ page }) => {
    await addTask(page, { title: 'Học Playwright cơ bản' });

    const task = page.locator('.task-item', {
      has: page.locator('h3', { hasText: 'Học Playwright cơ bản' }),
    });

    await expect(task).toBeVisible();
    await expect(page.locator('.task-list.empty')).toHaveCount(0);
  });

  test('should create a task with full information', async ({ page }) => {
    await addTask(page, {
      title: 'Viết testcase automation',
      description: 'Thực hành Playwright cho project task manager',
      deadline: getFutureDateTimeLocal(2),
    });

    const task = page.locator('.task-item', {
      has: page.locator('h3', { hasText: 'Viết testcase automation' }),
    });

    await expect(task).toBeVisible();
    await expect(task.locator('.task-description')).toContainText(
      'Thực hành Playwright cho project task manager'
    );
    await expect(task.locator('.deadline-badge')).toBeVisible();
  });

  test('should show validation error when title is empty', async ({ page }) => {
    await openAddTaskModal(page);
    await page.getByRole('button', { name: /^thêm công việc$/i }).click();

    await expect(page.locator('.error-message')).toContainText(
      'Tên công việc không được để trống'
    );
  });

  test('should show validation error when title contains only spaces', async ({ page }) => {
    await openAddTaskModal(page);
    await page.locator('#title').fill('   ');
    await page.getByRole('button', { name: /^thêm công việc$/i }).click();

    await expect(page.locator('.error-message')).toContainText(
      'Tên công việc không được để trống'
    );
  });

  test('should show validation error when deadline is in the past', async ({ page }) => {
    await openAddTaskModal(page);
    await page.locator('#title').fill('Task deadline lỗi');
    await page.locator('#deadline').fill(getPastDateTimeLocal(1));
    await page.getByRole('button', { name: /^thêm công việc$/i }).click();

    await expect(page.locator('.error-message')).toContainText(
      'Deadline phải là thời điểm sau hiện tại'
    );
  });

  test('should edit title and description of a task', async ({ page }) => {
    await createTask(page, {
      title: 'Task cũ',
      description: 'Mô tả cũ',
    });

    await editTask(page, 'Task cũ', {
      title: 'Task mới',
      description: 'Mô tả mới',
    });

    await expect(page.locator('h3', { hasText: 'Task mới' })).toBeVisible();
    await expect(page.locator('.task-description', { hasText: 'Mô tả mới' })).toBeVisible();
  });

  test('should delete a task', async ({ page }) => {
    await createTask(page, { title: 'Task cần xóa' });
    await deleteTask(page, 'Task cần xóa');

    await expect(page.locator('h3', { hasText: 'Task cần xóa' })).toHaveCount(0);
  });

  test('should change status from TODO to Done', async ({ page }) => {
    await createTask(page, { title: 'Task hoàn thành' });
    await changeTaskStatus(page, 'Task hoàn thành', 'Done');

    const task = page.locator('.task-item', {
      has: page.locator('h3', { hasText: 'Task hoàn thành' }),
    });

    await expect(task.locator('.status-label')).toContainText('Hoàn thành');
  });

  test('should search task by title', async ({ page }) => {
    await createTask(page, { title: 'Học automation testing' });
    await createTask(page, { title: 'Đi siêu thị' });

    await searchTask(page, 'automation');

    await expect(page.locator('h3', { hasText: 'Học automation testing' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Đi siêu thị' })).toHaveCount(0);
  });

  test('should filter Done tasks', async ({ page }) => {
    await createTask(page, { title: 'Task TODO' });
    await createTask(page, { title: 'Task Done' });

    await changeTaskStatus(page, 'Task Done', 'Done');
    await filterByStatus(page, 'Done');

    await expect(page.locator('h3', { hasText: 'Task Done' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Task TODO' })).toHaveCount(0);
  });

  test('should persist tasks after page reload', async ({ page }) => {
    await createTask(page, {
      title: 'Task lưu localStorage',
      description: 'Dữ liệu phải còn sau reload',
    });

    await page.reload();

    await expect(page.locator('h3', { hasText: 'Task lưu localStorage' })).toBeVisible();
    await expect(page.locator('.task-description', { hasText: 'Dữ liệu phải còn sau reload' })).toBeVisible();
  });

  test('should update statistics correctly after creating tasks', async ({ page }) => {
    await createTask(page, { title: 'Task 1' });
    await createTask(page, { title: 'Task 2' });
    await createTask(page, { title: 'Task 3' });

    await changeTaskStatus(page, 'Task 2', 'In Progress');
    await changeTaskStatus(page, 'Task 3', 'Done');

    const stats = page.locator('.statistics');

    await expect(
      stats.locator('.stat-card').filter({ hasText: 'Tổng công việc' }).locator('.stat-value')
    ).toHaveText('3');

    await expect(
      stats.locator('.stat-card.success .stat-value')
    ).toHaveText('1');

    await expect(
      stats.locator('.stat-card.pending .stat-value')
    ).toHaveText('1');

    await expect(
      stats.locator('.stat-card.todo .stat-value')
    ).toHaveText('1');
  });

  test('should trim title and description when creating task', async ({ page }) => {
    await addTask(page, {
      title: '   Task có khoảng trắng   ',
      description: '   Mô tả có khoảng trắng   ',
    });

    await expect(page.locator('h3', { hasText: 'Task có khoảng trắng' })).toBeVisible();
    await expect(page.locator('.task-description', { hasText: 'Mô tả có khoảng trắng' })).toBeVisible();
  });
});