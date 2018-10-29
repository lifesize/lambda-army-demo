# Lambda Army

Load testing with Puppeteer + Lambdas + Artillery

## Pre-Requisites

- AWS Account
- Node and NPM
- `npm install -g artillery artillery-lambda-engine serverless`

Note this was developed and tested on a Mac, unsure of performance on other operating systems.

## Serverless Directory

This holds the code for the AWS Lambda than will run puppeteer.

To deploy to your AWS account, make sure you have your credentials setup and do the following:

- Ensure serverless framework is installed globally (see pre-requisites)
- Update the S3 bucket name (in serverless.yaml and handlers/screenshot.ts) to a bucket that does not exist
- `npm run deploy`

Currently, it will deploy to us-east-1 region, but you can change that in the serverless.yml if you desire.

## Artillery Directory

This holds the code for running the artillery load tests that target the lambdas.

```bash
cd artillery
npm install
npm run test:login
# or
# npm run test:href
# npm run test:screenshot
```

Each of these should fire off 5 lambdas for their tests. `test:href` will write to the dynamo we setup in the serverless.yml, while `test:screenshot` will dump screenshots in the s3 bucket. `test:login` does not interact with any other AWS resources, but you can look at the cloudwatch logs for each invocation to see what it's doing.

### artillery-engine-lambda

This is currently using a forked branch of artillery-engine-lambda, as part of it went out of date. A PR is open to address this issue - https://github.com/orchestrated-io/artillery-engine-lambda/pull/2. Until it's merged, use the forked repo.

### Running Tests Locally

The actual scripts that get run are in the handlers live in `serverless/actions`, this is where we interact with puppeteer to drive the browser.
By breaking it up this way, we can run the actions locally to test out the scripts and debug.

To run the tests do:

```bash
cd serverless
npm install
npm run test
```

By default, the tests will run NON-headless, so you can see the browser doing things. You can configure this in the tests
by changing the options when launching puppeteer.

```javascript
browser = await puppeteer.launch({
  headless: false // or true
});
```
