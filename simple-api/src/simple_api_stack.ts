import { Stack, StackProps } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { EndpointType } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface SimpleApiStackProps extends StackProps {
  environment: string;
}

export class SimpleApiStack extends Stack {
  constructor(scope: Construct, id: string, props: SimpleApiStackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
                exports.handler = async function(event, context) {
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: "Hello, World from ${props.environment} environment!" })
                    };
                };
            `),
    });

    // Define the API Gateway
    new apigateway.LambdaRestApi(this, 'Endpoint', {
      handler: helloLambda,
      proxy: true,
      deploy: true,
      cloudWatchRole: true,
      endpointTypes: [EndpointType.EDGE],
    });
  }
}
