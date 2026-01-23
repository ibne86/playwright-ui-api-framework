import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { CheckoutPage } from "../../pages/CheckoutPage.js";

test("UI: checkout happy path completes order", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.loginSuccess("standard_user", "secret_sauce");
  await products.addBackpackToCart();
  await products.openCart();
  await cart.clickCheckout();
  await checkout.fillCustomerInfo("Test", "User", "12345");
  await checkout.continue();
  await checkout.finish();
  await expect(checkout.completeHeader).toContainText("Thank you for your order!");
  await expect(checkout.backHomeBtn).toBeVisible();
});