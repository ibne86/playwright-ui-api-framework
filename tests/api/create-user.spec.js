import { test } from "@playwright/test";
import { usersApi } from "../../test-data/api/usersApi.js";
import { createUserPayload } from "../../test-data/api/users.js";
import {
  expectStatus,
  expectCreateUserContract,
  expectEchoesPayload,
} from "../../test-data/api/assertions.js";

test.describe("ReqRes - Create user (POST /api/users)", () => {
  let api;

  test.beforeEach(({ request }) => {
    api = new usersApi(request);
  });

  test("SMOKE: POST /api/users returns 201", async () => {
    const { response } = await api.createUser(createUserPayload);
    expectStatus(response, 201);
  });

  test("CONTRACT: response has id and createdAt", async () => {
    const { body } = await api.createUser(createUserPayload);
    expectCreateUserContract(body);
  });

  test("DATA: response echoes the request payload", async () => {
    const { body } = await api.createUser(createUserPayload);
    expectEchoesPayload(body, createUserPayload);
  });
});
