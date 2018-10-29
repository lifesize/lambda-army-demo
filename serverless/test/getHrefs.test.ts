import * as puppeteer from "puppeteer";
import getHrefs from "../actions/getHrefs";
import * as logger from "../utils/logger";

let browser: any, page: any;

describe("get hrefs action", () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false
    });

    logger.log("CHROME BROWSER VERSION: ", await browser.version());
    page = await browser.newPage();

    jest.setTimeout(200000);
  });

  afterEach(async () => {
    await browser.close();
  });

  test("should return href data", async () => {
    try {
      const data = await getHrefs("https://www.amazon.com", page);
      expect(data.amount).toBeGreaterThan(0);
      expect(data.hrefs).toBeTruthy();
      expect(data.id).toBeTruthy();
    } catch (e) {
      await page.screenshot({ path: "./test/screenshots/hrefs-error.png" });
      throw e;
    }
  });
});
