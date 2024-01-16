import { awscdk } from 'projen';

const project = new awscdk.AwsCdkTypeScriptApp({
  authorEmail: 'utku.demir@luminis.eu',
  authorName: 'Utku Demir',
  cdkVersion: '2.96.2',
  defaultReleaseBranch: 'main',
  name: 'organisational-setup',
  description: 'A CDK project for Organizational Account Deployments',
  github: false,
  projenrcTs: true,
  keywords: [
    'AWS CDK',
    'projen',
    'Typescript',
    'Deployment',
  ],
  gitignore: ['.idea'],
  license: 'MIT',
  licensed: true,

  deps: ['@pepperize/cdk-organizations'],
});
project.synth();
