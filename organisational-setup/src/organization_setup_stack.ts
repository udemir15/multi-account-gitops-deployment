import * as orgs from '@pepperize/cdk-organizations';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface OrganizationSetupStackProps extends StackProps {
  environments: string[];
}

export class OrganizationSetupStack extends Stack {
  constructor(scope: Construct, id: string, props: OrganizationSetupStackProps) {
    super(scope, id, props);

    const organization = new orgs.Organization(this, 'organization', {
      featureSet: orgs.FeatureSet.ALL,
    });

    const deployment = new orgs.OrganizationalUnit(this, 'deployment', {
      organizationalUnitName: 'Deployment',
      parent: organization.root,
    });

    // Create an account
    new orgs.Account(this, 'deployment-account', {
      accountName: 'DeploymentAccount',
      email: 'utku.demir+deployment@luminis.eu',
      roleName: 'OrganizationAccountAccessRole',
      iamUserAccessToBilling: orgs.IamUserAccessToBilling.ALLOW,
      parent: deployment,
    });

    props.environments.forEach(appEnvironment => {
      const environmentOrganizationalUnit = new orgs.OrganizationalUnit(this, appEnvironment, {
        organizationalUnitName: appEnvironment,
        parent: organization.root,
      });

      new orgs.Account(this, `${appEnvironment}-account`, {
        accountName: `${appEnvironment}-account`,
        email: `utku.demir+${appEnvironment}env@luminis.eu`,
        roleName: 'OrganizationAccountAccessRole',
        iamUserAccessToBilling: orgs.IamUserAccessToBilling.DENY,
        parent: environmentOrganizationalUnit,
      });
    });
    organization.enablePolicyType(orgs.PolicyType.SERVICE_CONTROL_POLICY);
  }
}
