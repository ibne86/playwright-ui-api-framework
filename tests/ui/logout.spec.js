import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { users } from "../../test-data/ui/index.js";

test("UI: user can logout and return to login page", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.goto();
  await login.loginSuccess(users.standard.username, users.standard.password);
  await products.logout();
  await expect(page.getByTestId("login-button")).toBeVisible();
});