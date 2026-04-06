import { expect } from '@playwright/test';

export async function resetApp(page) {
  await page.goto('/');

  await page.evaluate(() => {
    localStorage.clear();
  });

  await page.reload();

  await expect(page.locator('h1')).toContainText('Quản Lý Công Việc Cá Nhân');
}

export async function openAddTaskModal(page) {
  await page.getByRole('button', { name: /thêm công việc mới/i }).click();
  await expect(page.locator('.modal-content h2')).toContainText('Thêm công việc mới');
}

export async function addTask(page, { title, description = '', deadline = '' }) {
  await openAddTaskModal(page);

  await page.locator('#title').fill(title);

  if (description) {
    await page.locator('#description').fill(description);
  }

  if (deadline) {
    await page.locator('#deadline').fill(deadline);
  }

  await page.getByRole('button', { name: /^thêm công việc$/i }).click();
}

export async function createTask(page, data) {
  await addTask(page, data);
  await expect(page.locator('.task-item h3', { hasText: data.title.trim() })).toBeVisible();
}

export async function editTask(page, oldTitle, { title, description, deadline }) {
  const taskItem = page.locator('.task-item', {
    has: page.locator('h3', { hasText: oldTitle }),
  });

  await taskItem.locator('.btn-edit').click();

  await expect(page.locator('.modal-content h2')).toContainText('Chỉnh sửa công việc');

  if (title !== undefined) {
    await page.locator('#title').fill(title);
  }

  if (description !== undefined) {
    await page.locator('#description').fill(description);
  }

  if (deadline !== undefined) {
    await page.locator('#deadline').fill(deadline);
  }

  await page.getByRole('button', { name: /cập nhật/i }).click();
}

export async function deleteTask(page, title) {
  const taskItem = page.locator('.task-item', {
    has: page.locator('h3', { hasText: title }),
  });

  await taskItem.locator('.btn-delete').click();
}

export async function changeTaskStatus(page, title, statusValue) {
  const taskItem = page.locator('.task-item', {
    has: page.locator('h3', { hasText: title }),
  });

  await taskItem.locator('.status-dropdown').selectOption(statusValue);
}

export async function searchTask(page, keyword) {
  await page.locator('.search-input').fill(keyword);
}

export async function filterByStatus(page, statusValue) {
  await page.locator('.status-filter').selectOption(statusValue);
}

export function getFutureDateTimeLocal(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setMinutes(date.getMinutes() + 5);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getPastDateTimeLocal(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() - days);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}