import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';
import {AndroidVariant} from '@aerogear/unifiedpush-admin-client';
import {generateOutput} from '../../../utils/output';
export const command = 'android';

export const describe = 'Create a new android variant';

export const builder = (yargs: Argv) => {
  return yargs
    .group(
      [
        'url',
        'app-id',
        'name',
        'server-key',
        'sender-id',
        'secret',
        'description',
        'output',
      ],
      'Create Variant:'
    )
    .option('server-key', {
      required: true,
      type: 'string',
      describe:
        'The google server-key. See https://aerogear.github.io/aerogear-unifiedpush-server/docs/variants/android for details',
      requiresArg: true,
    })
    .option('sender-id', {
      required: true,
      type: 'string',
      describe:
        'The google sender-id. See https://aerogear.github.io/aerogear-unifiedpush-server/docs/variants/android for details',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<AndroidVariant>) => {
  let cmd = UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.android.create(argv.appId as string)
    .withName(argv.name)
    .withGoogleKey(argv.serverKey as string)
    .withProjectNumber(argv.senderId as string);

  cmd = argv.secret ? cmd.withSecret(argv.secret) : cmd;
  cmd = argv.description ? cmd.withDescription(argv.description) : cmd;

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
