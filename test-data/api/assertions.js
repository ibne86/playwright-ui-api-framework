// test-data/api/assertions.js
import { expect } from "@playwright/test";

export function expectStatus(response, expectedStatus) {
  expect(response.status()).toBe(expectedStatus);
}

export function expectCreateUserContract(body) {
  expect(body).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      createdAt: expect.any(String),
    })
  );
}

export function expectEchoesPayload(body, payload) {
  // ReqRes "create user (legacy)" echoes back whatever you send
  expect(body).toEqual(expect.objectContaining(payload));
}