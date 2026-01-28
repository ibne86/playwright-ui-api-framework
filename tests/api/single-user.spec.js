import { test } from "@playwright/test";
import { usersApi } from "../../api/usersApi.js";
import {
  expectStatus,
  expectSingleUserContract,
  expectExactUser,
} from "../../api/assertions.js";
import { reqresUsers } from "../../test-data/api/users.js";

test.describe("ReqRes - Single user (GET /api/users/2)", () => {
  let api;

  test.beforeEach(({ request }) => {
    api = new usersApi(request);
  });

  test("SMOKE: returns 200", async () => {
    const { response } = await api.getSingleUser(2);
    expectStatus(response, 200);
  });

  test("CONTRACT: response has expected shape", async () => {
    const { body } = await api.getSingleUser(2);
    expectSingleUserContract(body);
  });

  test("DATA: returns expected user #2", async () => {
    const { body } = await api.getSingleUser(2);
    expectExactUser(body.data, reqresUsers.user2);
  });
});