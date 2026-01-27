import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { users, uiText } from "../../test-data/ui/index.js";

test("UI: Add item to cart updates badge count", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);

  await login.goto();
  await login.loginSuccess(users.standard.username, users.standard.password);
  await products.addBackpackToCart();
  await expect(products.cartBadge).toHaveText(uiText.cartBadgeAfterAdd);
});

test("UI: Cart page shows the added item", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.loginSuccess(users.standard.username, users.standard.password);
  await products.addBackpackToCart();
  await products.openCart();
  await expect(cart.itemNames.first()).toContainText(uiText.backpackName);
});

test("UI: Remove item clears cart", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  
  await login.goto();
  await login.loginSuccess(users.standard.username, users.standard.password);
  await products.addBackpackToCart();
  await expect(products.cartBadge).toHaveText(uiText.cartBadgeAfterAdd);
  await products.removeBackpackFromCart();
  await expect(products.cartBadge).toHaveCount(0);
});