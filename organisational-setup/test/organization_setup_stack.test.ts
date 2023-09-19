import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { OrganizationSetupStack } from '../src/organization_setup_stack';

test('Organization Setup Stack created', () => {
  const app = new App();
  const stack = new OrganizationSetupStack(app, 'OrganizationSetupStack', {
    environments: ['dev', 'test', 'prod'],
  });
  const template = Template.fromStack(stack);

  template.resourceCountIs('Custom::Organizations_Organization', 1);
  template.resourceCountIs('Custom::Organizations_OrganizationalUnitProvider', 4);
  template.resourceCountIs('Custom::Organizations_Account', 4);
  template.resourceCountIs('AWS::IAM::Role', 1);
});
