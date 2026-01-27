import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { CheckoutPage } from "../../pages/CheckoutPage.js";
import { users, checkout } from "../../test-data/ui/index.js";

test("UI: checkout happy path completes order", async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await login.goto();
  await login.loginSuccess(users.standard.username, users.standard.password);
  await products.addBackpackToCart();
  await products.openCart();
  await cart.clickCheckout();
  await checkoutPage.fillCustomerInfo(
    checkout.customer.firstName,
    checkout.customer.lastName,
    checkout.customer.postalCode
  );
  await checkoutPage.continue();
  await checkoutPage.finish();
  await expect(checkoutPage.completeHeader).toContainText(checkout.successHeader);
  await expect(checkoutPage.backHomeBtn).toBeVisible();
});