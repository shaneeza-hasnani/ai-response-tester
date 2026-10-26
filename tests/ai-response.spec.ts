import { test, expect } from '@playwright/test';

test('responds to a valid question', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByLabel('Your question').fill('What is RAG?');

  await page.getByRole('button', { name: 'Ask' }).click();

  await expect(
    page.getByRole('status')
  ).toHaveText('You asked: What is RAG?');
});

test('rejects an empty question', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', { name: 'Ask' }).click();

  await expect(
    page.getByRole('status')
  ).toHaveText('Please enter a question.');
});

test('handles an API server error', async ({ page }) => {
  await page.route('**/api/ask', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'AI service temporarily unavailable.'
      })
    });
  });

  await page.goto('http://localhost:3000');

  await page.getByLabel('Your question').fill('What is RAG?');

  await page.getByRole('button', { name: 'Ask' }).click();

  await expect(page.getByRole('status')).toHaveText(
    'AI service temporarily unavailable.'
  );
});

test('shows loading state while waiting for API', async ({ page }) => {
  await page.route('**/api/ask', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        answer: 'RAG stands for Retrieval-Augmented Generation.'
      })
    });
  });

  await page.goto('http://localhost:3000');

  await page.getByLabel('Your question').fill('What is RAG?');

  await page.getByRole('button', { name: 'Ask' }).click();

  // Check that the loading message appears
  await expect(page.getByRole('status')).toHaveText('Loading...');

  // Check that the final response appears
  await expect(page.getByRole('status')).toHaveText(
    'RAG stands for Retrieval-Augmented Generation.'
  );
});