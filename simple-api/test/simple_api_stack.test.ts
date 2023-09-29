import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SimpleApiStack } from '../src/simple_api_stack';

test('Simple Api Stack created', () => {
  const app = new App();
  const stack = new SimpleApiStack(app, 'SimpleApiStack', {
    environment: 'testenv',
  });
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::Lambda::Function', 1);
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Stage', 1);
});
