const uuidv4 = require("uuid/v4");
import * as logger from "../utils/logger";

export default async function login(url: String, page: any) {
  logger.debug("DEBUG: Navigating to -", url);
  await page.goto(url);

  const hrefs = await page.$$eval("a", (links: Array<any>) => {
    return links.map((link: any) => {
      return link.href;
    });
  });

  return {
    hrefs: hrefs.toString(),
    amount: hrefs.length,
    id: uuidv4()
  };
}
