import { App } from 'aws-cdk-lib';
import { OrganizationSetupStack } from './organization_setup_stack';

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
const environments = ['dev', 'test', 'prod'];

const app = new App();

new OrganizationSetupStack(app, 'organisational-setup-stack', {
  env: devEnv,
  environments: environments,
});

app.synth();
