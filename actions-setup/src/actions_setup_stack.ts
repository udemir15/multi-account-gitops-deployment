import { Stack, StackProps } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface ActionsSetupStackProps extends StackProps {
  repositoryOwner: string;
  gitDeployableAccounts: string[];
}

export class ActionsSetupStack extends Stack {
  constructor(scope: Construct, id: string, props: ActionsSetupStackProps) {
    super(scope, id, props);

    const githubOidcProvider = new iam.OpenIdConnectProvider(this, 'github-oidc-provider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
      thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1'],
    });

    const webIdentityPrincipal = new iam.WebIdentityPrincipal(githubOidcProvider.openIdConnectProviderArn, {
      StringEquals: {
        'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
      },
      StringLike: {
        'token.actions.githubusercontent.com:sub': `repo:${props.repositoryOwner}/*`,
      },
    });

    new iam.Role(this, 'github-actions-deploy-role', {
      roleName: 'github-actions-deploy-role',
      assumedBy: webIdentityPrincipal,
      inlinePolicies: {
        AllowCrossAccount: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: ['sts:AssumeRole'],
              resources: [
                `arn:aws:iam::${this.account}:role/cdk-hnb659fds-*-role-${this.account}-*`,
                ...props.gitDeployableAccounts.map(appAccount => `arn:aws:iam::${appAccount}:role/cdk-hnb659fds-*-role-${appAccount}-*`),
              ],
            }),
          ],
        }),
      },
    },
    );
  }
}
