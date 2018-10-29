import * as puppeteer from "puppeteer";
import screenshot from "../actions/screenshot";
import * as logger from "../utils/logger";

let browser: any, page: any;

describe("call extension action", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true
    });

    logger.log("CHROME BROWSER VERSION: ", await browser.version());
    page = await browser.newPage();

    jest.setTimeout(200000);
  });

  afterEach(async () => {
    await browser.close();
  });

  test("should login with correct credentials", async () => {
    try {
      const data = await screenshot("https://www.amazon.com", page);
      console.log("DATA: ", data);
      expect(data);
    } catch (e) {
      await page.screenshot({
        path: "./test/screenshots/screenshot-error.png"
      });
      throw e;
    }
  });
});
