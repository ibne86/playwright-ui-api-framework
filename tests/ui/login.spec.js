import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";

test("UI: Valid user can login", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginSuccess("standard_user", "secret_sauce");
  await expect(page.locator(".title")).toHaveText("Products");
});

test("UI: Locked out user cannot login", async ({ page }) => {
  const login = new LoginPage(page);
    await login.goto();
    await login.invalidLogin("locked_out_user", "secret_sauce");
    await expect(login.error).toContainText("Epic sadface: Sorry, this user has been locked out."
);
});

test("UI: Invalid user cannot login", async ({ page }) => {
  const login = new LoginPage(page);
    await login.goto();
    await login.invalidLogin("invalid_user", "invalid_pass"); 
    await expect(login.error).toContainText("Epic sadface: Username and password do not match any user in this service");
});

test("UI: Cannot login by empty credentials", async ({ page }) => {
  const login = new LoginPage(page);
    await login.goto();
    await login.invalidLogin("", ""); 
    await expect(login.error).toContainText("Epic sadface: Username is required");
});