import * as logger from "../utils/logger";
import login from "../actions/login";
import { getChrome, closeChrome } from "../utils/chrome";

export default async function handler(event: any, context: any, callback: any) {
  logger.debug("DEBUG: received event", JSON.stringify(event));
  logger.debug("DEBUG: received context", JSON.stringify(context));

  const { email = "myuser@example.com", password = "password123" } = event;

  const user = { email: email, password: password };
  const chrome: any = await getChrome(["--start-maximized"]);
  const loginResult = await login(user, chrome.page);
  await closeChrome(chrome);
  // write to DynamoDB
}
