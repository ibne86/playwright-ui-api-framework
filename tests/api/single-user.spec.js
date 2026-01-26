import { test, expect } from "@playwright/test";
import { reqresUsers } from "../../test-data/api/users.js";

test.describe("ReqRes - Single user (GET /api/users/2)", () => {
  test("SMOKE: returns 200", async ({ request }) => {
    const response = await request.get("/api/users/2");
    expect(response.status()).toBe(200);
  });

  test("CONTRACT: response has expected shape", async ({ request }) => {
    const response = await request.get("/api/users/2");
    const body = await response.json();

    expect(body).toEqual(
      expect.objectContaining({
        data: expect.any(Object),
        support: expect.any(Object),
      })
    );

    expect(body.data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String),
        first_name: expect.any(String),
        last_name: expect.any(String),
        avatar: expect.any(String),
      })
    );
  });

  test("DATA: returns expected user #2", async ({ request }) => {
    const response = await request.get("/api/users/2");
    const body = await response.json();

    expect(body.data).toEqual(reqresUsers.user2);
  });
});