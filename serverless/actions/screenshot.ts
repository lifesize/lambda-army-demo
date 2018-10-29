import * as logger from "../utils/logger";
export default async function screenshot(url: String, page: any) {
  logger.debug("DEBUG: Navigating to -", url);
  await page.goto(url);

  return await page.screenshot({ fullPage: true });
}
