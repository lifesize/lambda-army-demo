import * as logger from "../utils/logger";
import getHrefs from "../actions/getHrefs";
import { getChrome, closeChrome } from "../utils/chrome";
import AWS = require("aws-sdk");

export default async function handler(event: any, context: any, callback: any) {
  const { url } = event;
  logger.debug("DEBUG URL:", url);
  const chrome: any = await getChrome(["--start-maximized"]);
  const { id, amount, hrefs } = await getHrefs(url, chrome.page);

  await closeChrome(chrome);

  const dynamodb = new AWS.DynamoDB();

  var params = {
    Item: {
      id: { S: id },
      amount: { N: amount.toString() },
      hrefs: { S: hrefs },
      url: { S: url }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "puppeteer-hrefs"
  };

  logger.debug("DEBUG: Data to write to DynamoDB", JSON.stringify(params));

  try {
    const data: any = await dynamodb.putItem(params).promise();
    logger.debug("DEBUG: Wrote to DB:", data);
  } catch (e) {
    logger.error("Error writing to DynamoDB -", e);
  }
}
