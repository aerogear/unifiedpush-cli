import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';
import {IOSTokenVariant} from '@aerogear/unifiedpush-admin-client';
import * as fs from 'fs';
import {generateOutput} from '../../../utils/output';
export const command = 'ios-token';

export const describe =
  'Create a new ios token variant. For details see:\nhttps://aerogear.github.io/aerogear-unifiedpush-server/docs/variants/ios#apns-token-authentication';

export const builder = (yargs: Argv) => {
  return yargs
    .group(
      [
        'app-id',
        'name',
        'bundle-id',
        'team-id',
        'key-id',
        'private-key',
        'secret',
        'description',
        'output',
      ],
      'Create Variant:'
    )
    .option('bundle-id', {
      required: true,
      type: 'string',
      describe:
        'The variant bundle-id (for example org.aerogear.PushHelloWorld)',
      requiresArg: true,
    })
    .option('team-id', {
      required: true,
      type: 'string',
      describe: 'The variant team-id',
      requiresArg: true,
    })
    .option('key-id', {
      required: true,
      type: 'string',
      describe: 'The variant key-id',
      requiresArg: true,
    })
    .option('private-key', {
      required: true,
      type: 'string',
      describe: 'The variant private key as downloaded from the apple website',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<IOSTokenVariant>) => {
  const fileToString = (filePath: string): string =>
    fs.readFileSync(filePath, 'utf8');

  let cmd = UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.ios_token.create(argv.appId as string)
    .withName(argv.name as string)
    .withBundleID(argv.bundleId)
    .withKeyID(argv.keyId)
    .withTeamID(argv.teamId)
    .withPrivateKey(fileToString(argv.privateKey));

  cmd = argv.secret ? cmd.withSecret(argv.secret) : cmd;
  cmd = argv.description ? cmd.withDescription(argv.description) : cmd;
  cmd = argv.production ? cmd.isProduction() : cmd.isDevelopment();

  const variant = await cmd.execute();

  console.log(
    generateOutput({
      intro: 'Variant created',
      headers: ['NAME', 'VARIANT-ID', 'TYPE'],
      properties: ['name', 'variantID', 'type'],
      value: [variant],
      format: argv.output as string,
    })
  );
};
