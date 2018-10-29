import * as puppeteer from "puppeteer";
import login from "../actions/login";
import * as logger from "../utils/logger";

let browser: any, page: any;

describe("login action", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    jest.setTimeout(20000);
  });

  afterEach(async () => {
    await browser.close();
  });

  test("should login with correct credentials", async () => {
    const user = { email: "tomsmith", password: "SuperSecretPassword!" };
    const isLoggedIn = await login(user, page);
    expect(isLoggedIn).toBe(true);
  });

  test("should fail with bad credentials", async () => {
    const user = { email: "foo", password: "bar" };
    const isLoggedIn: any = await login(user, page);
    expect(isLoggedIn).toBe(false);
  });
});
