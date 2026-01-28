import { test } from "@playwright/test";
import { usersApi } from "../../api/usersApi.js";
import {
  expectStatus,
  expectUsersListContract,
  expectUsersListHasUsers,
  expectUserContract,
} from "../../api/assertions.js";

test.describe("ReqRes - Users list", () => {
  let api;

  test.beforeEach(({ request }) => {
    api = new usersApi(request);
  });

  test("SMOKE: GET /api/users?page=2 returns 200", async () => {
    const { response } = await api.getUsersList(2);
    expectStatus(response, 200);
  });

  test("CONTRACT: response has expected shape", async () => {
    const { body } = await api.getUsersList(2);
    expectUsersListContract(body, { page: 2 });
  });

  test("DATA: list has users and user objects match contract", async () => {
    const { body } = await api.getUsersList(2);

    expectUsersListHasUsers(body);
    expectUserContract(body.data[0]);
  });
});