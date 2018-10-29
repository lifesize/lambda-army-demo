import * as logger from "../utils/logger";
import screenshot from "../actions/screenshot";
import { getChrome, closeChrome } from "../utils/chrome";
import AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

export default async function handler(event: any, context: any, callback: any) {
  const { url } = event;
  const chrome: any = await getChrome(["--start-maximized"]);
  const screenshotData = await screenshot(url, chrome.page);
  await closeChrome(chrome);

  const bucketName = "puppeteer-screenshots"; // Change this name to be your bucket name
  const fileName = `${uuidv4()}.png`;

  const params = {
    Body: screenshotData,
    Bucket: bucketName,
    Key: fileName,
    ServerSideEncryption: "AES256"
  };

  const s3 = new AWS.S3();

  logger.debug("DEBUG: Bucket name - ", bucketName);

  await s3
    .putObject(params)
    .promise()
    .then((data: any) => {
      logger.debug("DEBUG: Successfully put screenshot (", fileName, ") in S3");
    })
    .catch((err: any) => {
      logger.error("Error putting screenshot in S3:", err);
    });
}
