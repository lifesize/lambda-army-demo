const launchChrome = require("@serverless-chrome/lambda");
const request = require("request-promise-native");
const puppeteer = require("puppeteer-core");
const logger = require("./logger");

export async function getChrome(flags: Array<String>) {
  logger.log("INFO: Starting puppeteer");
  const chrome = await launchChrome({ flags: flags });
  logger.log("DEBUG: Chrome debug URL is... ", chrome.url);
  const response = await request({
    method: "GET",
    url: `${chrome.url}/json/version`,
    json: true,
    timeout: 5000
  });

  logger.debug("DEBUG: Response - ", response);

  const debugUrl = response.webSocketDebuggerUrl;

  logger.debug("DEBUG: debugUrl is", debugUrl);
  const browser = await puppeteer.connect({
    browserWSEndpoint: debugUrl
  });

  logger.debug("DEBUG: puppeteer connected");
  const version = await browser.version();
  logger.debug("DEBUG: Chrome version", version);

  const page = await browser.newPage();

  // Setup console watcher
  page.on("console", (msg: any) => {
    let text = msg.text();
    switch (true) {
      case /Webapp version: .+/.test(text):
        let webappVersion = text.match(/Webapp version: (.+)/)[1];
        logger.debug("CHROME DEBUG: Web app version is", webappVersion);
        break;
      case /Nucleus version: .+/.test(text):
        let nucleusVersion = text.match(/Nucleus version: (.+)/)[1];
        logger.debug("CHROME DEBUG: Nucleus Version is", nucleusVersion);
        break;
      case msg.type() === "error": //&& text != "JSHandle@error":
        logger.error("CHROME ERROR:", text);
        break;
    }
  });

  return { browser: browser, page: page, instance: chrome };
}

export async function closeChrome(chrome: any) {
  logger.debug("DEBUG: moving on to cleanup...");
  await chrome.browser.close();
  setTimeout(() => chrome.instance.kill(), 0);
}
