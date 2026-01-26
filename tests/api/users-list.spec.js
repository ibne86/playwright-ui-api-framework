import { test, expect } from "@playwright/test";

test.describe("ReqRes - Users list", () => {
  test("SMOKE: GET /api/users?page=2 returns 200", async ({ request }) => {
    const response = await request.get("/api/users?page=2");
    expect(response.status()).toBe(200);
  });

  test("CONTRACT: response has expected shape", async ({ request }) => {
    const response = await request.get("/api/users?page=2");
    const body = await response.json();

    expect(body).toEqual(
      expect.objectContaining({
        page: 2,
        data: expect.any(Array),
        per_page: expect.any(Number),
        total: expect.any(Number),
        total_pages: expect.any(Number),
      })
    );
  });

  test("DATA: first user has required fields", async ({ request }) => {
    const response = await request.get("/api/users?page=2");
    const body = await response.json();

    expect(body.data.length).toBeGreaterThan(0);

    const user = body.data[0];
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        avatar: expect.any(String),
      })
    );
  });
});
