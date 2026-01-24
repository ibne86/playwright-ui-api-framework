import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductsPage } from "../../pages/ProductsPage.js";

test("UI: user can logout and return to login page", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.goto();
  await login.loginSuccess("standard_user", "secret_sauce");

  await products.logout();

  await expect(page.getByTestId("login-button")).toBeVisible();
});