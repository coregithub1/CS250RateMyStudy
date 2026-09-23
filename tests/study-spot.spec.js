const { test, expect } = require('@playwright/test');

// These tests check frontend requirements against a mocked Supabase API.
// They do NOT prove that the team's real database policies are configured.
async function mockSupabase(page, { failInsert = false, failLoad = false } = {}) {
  const saved = [];
  // Deterministic image fixture: photo-host availability is a manual live check.
  await page.route('**/test-photo.svg', route => route.fulfill({
    contentType: 'image/svg+xml',
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#ddd"/></svg>',
  }));
  await page.route('https://skeleton-test.supabase.co/**', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 200 });
    if (url.pathname === '/auth/v1/signup') return route.fulfill({ json: {
      access_token: 'test-access-token', refresh_token: 'test-refresh-token',
      expires_in: 3600, token_type: 'bearer',
      user: { id: '11111111-1111-4111-8111-111111111111', aud: 'authenticated', role: 'authenticated', is_anonymous: true },
    } });
    if (url.pathname === '/rest/v1/study_spots') {
      if (failLoad) return route.fulfill({ status: 400, json: { message: 'Test load failure' } });
      return route.fulfill({ json: { id: 'love-library', name: 'Love Library', image_url: '/test-photo.svg', image_alt: 'Exterior of Love Library at San Diego State University' } });
    }
    if (url.pathname === '/rest/v1/reviews') {
      expect(url.searchParams.get('select')).not.toContain('user_id');
      if (request.method() === 'POST') {
        if (failInsert) return route.fulfill({ status: 403, json: { message: 'Denied' } });
        const body = request.postDataJSON();
        expect(body).toMatchObject({ spot_id: 'love-library', user_id: '11111111-1111-4111-8111-111111111111' });
        const row = { id: 'review-1', rating: body.rating, comment: body.comment, created_at: '2026-09-23T12:00:00Z' };
        saved.unshift(row);
        return route.fulfill({ status: 201, json: row });
      }
      expect(url.searchParams.get('spot_id')).toBe('eq.love-library');
      return route.fulfill({ json: saved });
    }
    throw new Error(`Unexpected API request: ${request.method()} ${url.pathname}`);
  });
  return saved;
}

test('REQ-1: the study spot has a loaded photograph', async ({ page }) => {
  await mockSupabase(page);
  await page.goto('/');
  const photo = page.getByRole('img', { name: /Exterior of Love Library/ });
  await expect(photo).toBeVisible();
  await expect.poll(() => photo.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
});

test('REQ-3: submit a rating/comment and retrieve it after refresh', async ({ page }) => {
  const saved = await mockSupabase(page);
  await page.goto('/');
  await page.getByLabel('Your rating').selectOption('4');
  await page.getByLabel('Your comment').fill('  A comfortable place to study.  ');
  await page.getByRole('button', { name: 'Submit review' }).click();
  await expect(page.getByRole('status')).toHaveText('Your review has been saved.');
  expect(saved).toHaveLength(1);
  expect(saved[0]).toMatchObject({ rating: 4, comment: 'A comfortable place to study.' });
  await page.reload();
  await expect(page.getByRole('listitem')).toContainText('A comfortable place to study.');
  await expect(page.getByRole('listitem')).toContainText('4 / 5');
});

test('REQ-3: a failed save preserves the comment and does not claim success', async ({ page }) => {
  await mockSupabase(page, { failInsert: true });
  await page.goto('/');
  await page.getByLabel('Your rating').selectOption('3');
  await page.getByLabel('Your comment').fill('Keep this draft.');
  await page.getByRole('button', { name: 'Submit review' }).click();
  await expect(page.getByRole('main').getByRole('alert')).toContainText('could not confirm');
  await expect(page.getByLabel('Your comment')).toHaveValue('Keep this draft.');
  await expect(page.getByRole('listitem')).toHaveCount(0);
});

test('REQ-3: whitespace-only comments are rejected', async ({ page }) => {
  const saved = await mockSupabase(page);
  await page.goto('/');
  await page.getByLabel('Your rating').selectOption('5');
  await page.getByLabel('Your comment').fill('   ');
  await page.getByRole('button', { name: 'Submit review' }).click();
  await expect(page.getByRole('main').getByRole('alert')).toContainText('Choose a rating');
  expect(saved).toHaveLength(0);
});

test('a load failure gives a retry action', async ({ page }) => {
  await mockSupabase(page, { failLoad: true });
  await page.goto('/');
  await expect(page.getByRole('main').getByRole('alert')).toContainText('could not load');
  await expect(page.getByRole('button', { name: 'Try again' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit review' })).toHaveCount(0);
});
