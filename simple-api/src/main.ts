import { App } from 'aws-cdk-lib';
import { SimpleApiStack } from './simple_api_stack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.AWS_ACCOUNT,
  region: process.env.AWS_REGION,
};

const app = new App();

const environment = process.env.ENVIRONMENT || 'dev';

new SimpleApiStack(app, `${environment}-simple-api`, {
  env: devEnv,
  environment: environment,
});

app.synth();
