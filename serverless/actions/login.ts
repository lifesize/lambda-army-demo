import * as logger from "../utils/logger";
export default async function login(user: any, page: any) {
  logger.log("INFO: Logging in as:", user.email);

  // Selectors for elements (pseudo page object)
  const usernameField: String = "input#username";
  const passwordField: String = "input#password";
  const loginButton: String = "button[type=submit]";
  const loggedInFlash: String = "div.flash.success";

  await page.goto("https://the-internet.herokuapp.com/login");
  await page.waitForSelector(usernameField, { visible: true });
  await page.type(usernameField, user.email);
  await page.waitForSelector(passwordField, { visible: true });
  await page.type(passwordField, user.password);
  await page.waitForSelector(loginButton, { visible: true });
  await page.click(loginButton);

  try {
    await page.waitForSelector(loggedInFlash, {
      visible: true,
      timeout: 5000
    });
    return true;
  } catch (e) {
    logger.error("Error waiting for welcome message", e.toString());
    return false;
  }
}
