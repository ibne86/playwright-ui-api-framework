export class LoginPage {
  constructor(page) {
    this.page = page;

    // SauceDemo uses data-test attributes
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.loginBtn = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
}
  async goto() {
    await this.page.goto("/");
  }

  // Common action for both positve and negative login
  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

    // Positive case
  async loginSuccess(user, pass) {
    await this.login(user, pass);
    await this.page.waitForURL("**/inventory.html");
  }

  // Negative case
  async invalidLogin(user, pass) {
    await this.login(user, pass);
    await this.error.waitFor();
  }
}