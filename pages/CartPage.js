export class CartPage {
  constructor(page) {
    this.page = page;

    // Cart items
    this.items = page.locator(".cart_item");
    this.itemNames = page.locator(".inventory_item_name");

    // Remove button
    this.removeBackpackBtn = page.getByTestId("remove-sauce-labs-backpack");

    // Checkout button
    this.checkoutBtn = page.getByTestId("checkout");
  }

  async removeBackpack() {
    await this.removeBackpackBtn.click();
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }
}
