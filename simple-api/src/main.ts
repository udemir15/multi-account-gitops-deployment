import { App } from 'aws-cdk-lib';
import { SimpleApiStack } from './simple_api_stack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const environment = process.env.ENVIRONMENT || '';

new SimpleApiStack(app, 'simple-api', { env: devEnv, environment: environment });

app.synth();
