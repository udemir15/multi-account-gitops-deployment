import { awscdk } from 'projen';
import { ApprovalLevel } from 'projen/lib/awscdk';

const project = new awscdk.AwsCdkTypeScriptApp({
  authorEmail: 'utku.demir@luminis.eu',
  authorName: 'Utku Demir',
  cdkVersion: '2.96.2',
  defaultReleaseBranch: 'main',
  name: 'actions-setup',
  description: 'A CDK project for Simple Api GitOps Deployments',
  repository: 'https://github.com/udemir15/simple-api.git',
  github: false,
  projenrcTs: true,
  keywords: [
    'AWS CDK',
    'projen',
    'Typescript',
    'Deployment',
  ],
  requireApproval: ApprovalLevel.NEVER,
  gitignore: ['.idea'],
  license: 'MIT',
  licensed: true,

  // deps: [], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
