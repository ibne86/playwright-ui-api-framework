import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { users, uiText, errors } from "../../test-data/ui/index.js";

test("UI: Valid user can login", async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.loginSuccess(users.standard.username, users.standard.password);
  await expect(page.locator(".title")).toHaveText(uiText.productsTitle);
});

test("UI: Locked out user cannot login", async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.invalidLogin(users.lockedOut.username, users.lockedOut.password);
  await expect(login.error).toContainText(errors.lockedOut);
});

test("UI: Invalid user cannot login", async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.invalidLogin(users.invalid.username, users.invalid.password);
  await expect(login.error).toContainText(errors.invalidUser);
});

test("UI: Cannot login by empty credentials", async ({ page }) => {
  const login = new LoginPage(page);
  
  await login.goto();
  await login.invalidLogin(users.empty.username, users.empty.password);
  await expect(login.error).toContainText(errors.usernameRequired);
});