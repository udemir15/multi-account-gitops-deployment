import { awscdk } from 'projen';
import { ApprovalLevel } from 'projen/lib/awscdk';

const project = new awscdk.AwsCdkTypeScriptApp({
  authorEmail: 'utku.demir@luminis.eu',
  authorName: 'Utku Demir',
  cdkVersion: '2.96.2',
  defaultReleaseBranch: 'main',
  name: 'simple-api',
  description: 'A CDK project for Simple Api GitOps Deployments',
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
});
project.synth();
