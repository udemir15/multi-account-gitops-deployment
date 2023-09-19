import { App } from 'aws-cdk-lib';
import { ActionsSetupStack } from './actions_setup_stack';

const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
const app = new App();

const repositoryOwner = app.node.tryGetContext('repositoryOwner');
const gitDeployableAccounts = app.node.tryGetContext('gitDeployableAccounts');

new ActionsSetupStack(app, 'actions-setup-stack', {
  env: devEnv,
  repositoryOwner: repositoryOwner,
  gitDeployableAccounts: gitDeployableAccounts,
});

app.synth();
