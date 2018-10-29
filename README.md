# Lambda Army

Load testing with Puppeteer + Lambdas + Artillery

## Pre-Requisites

- AWS Account
- Node and NPM
- `npm install -g artillery artillery-lambda-engine serverless`

Note this was developed and tested on a Mac, unsure of performance on other operating systems.

## Serverless Directory

This holds the code for the AWS Lambda than will run puppeteer.

To deploy to your AWS account, make sure you have your credentials setup and run `npm run build && sls deploy`.
Currently, it will deploy to us-east-1 region, but you can change that in the serverless.yml if you desire.

### Running locally

The actual scripts that get run are in `serverless/actions`, this is where we interact with puppeteer to drive the browser.
By breaking it up this way, we can run the actions locally to test out the scripts and debug.

To run a test do

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

## Artillery Directory

This holds the code for running the artillery load tests that target the lambdas.
