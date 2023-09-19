import { awscdk } from 'projen';

const project = new awscdk.AwsCdkTypeScriptApp({
  authorEmail: 'utku.demir@luminis.eu',
  authorName: 'Utku Demir',
  cdkVersion: '2.96.2',
  defaultReleaseBranch: 'main',
  name: 'organisational-setup',
  description: 'A CDK project for Organizational Account Deployments',
  repository: 'https://github.com/udemir15/organisational-setup.git',
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

  deps: ['@pepperize/cdk-organizations'], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
