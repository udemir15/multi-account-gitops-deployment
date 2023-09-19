import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ActionsSetupStack } from '../src/actions_setup_stack';

test('Actions Setup Stack created', () => {
  const app = new App();
  const stack = new ActionsSetupStack(app, 'ActionsSetupStack', {
    repositoryOwner: 'testowner',
    gitDeployableAccounts: ['dev', 'test', 'prod'],
  });
  const template = Template.fromStack(stack);

  template.resourceCountIs('Custom::AWSCDKOpenIdConnectProvider', 1);
  template.resourceCountIs('AWS::IAM::Role', 2);
});
