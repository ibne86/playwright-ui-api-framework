export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator(".title");

    // Cart
    this.cartLink = page.locator(".shopping_cart_link");
    this.cartBadge = page.locator(".shopping_cart_badge");

    // Buttons for Sauce Labs Backpack
    this.addBackpackBtn = page.getByTestId("add-to-cart-sauce-labs-backpack");
    this.removeBackpackBtn = page.getByTestId("remove-sauce-labs-backpack");

    // Menu / Logout
    this.menuBtn = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async addBackpackToCart() {
    await this.addBackpackBtn.click();
  }

  async removeBackpackFromCart() {
    await this.removeBackpackBtn.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuBtn.click();
    await this.logoutLink.click();
  }
}
