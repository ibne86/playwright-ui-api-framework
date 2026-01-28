import { expect } from "@playwright/test";

export function expectStatus(response, expectedStatus = 200) {
  expect(response.status()).toBe(expectedStatus);
  expect(response.ok()).toBeTruthy();
}

export function expectUserContract(user) {
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      avatar: expect.any(String),
    })
  );
}

export function expectSingleUserContract(body) {
  expect(body).toEqual(
    expect.objectContaining({
      data: expect.any(Object),
      support: expect.any(Object),
    })
  );

  expectUserContract(body.data);
}

export function expectUsersListContract(body, { page } = {}) {
  expect(body).toEqual(
    expect.objectContaining({
      page: expect.any(Number),
      per_page: expect.any(Number),
      total: expect.any(Number),
      total_pages: expect.any(Number),
      data: expect.any(Array),
    })
  );

  if (page !== undefined) {
    expect(body.page).toBe(page);
  }
}

export function expectUsersListHasUsers(body) {
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
}

export function expectExactUser(actualUser, expectedUser) {
  expect(actualUser).toEqual(expectedUser);
}