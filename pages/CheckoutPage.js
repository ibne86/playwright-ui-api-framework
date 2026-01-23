export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Step 1: Information
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueBtn = page.getByTestId("continue");

    // Step 2: Overview
    this.finishBtn = page.getByTestId("finish");

    // Step 3: Complete order
    this.completeHeader = page.getByTestId("complete-header");
    this.backHomeBtn = page.getByTestId("back-to-products");
  }

  async fillCustomerInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}