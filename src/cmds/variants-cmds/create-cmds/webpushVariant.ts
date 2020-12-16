import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';
import {WebPushVariant} from '@aerogear/unifiedpush-admin-client';
import {generateOutput} from '../../../utils/output';
export const command = 'web-push';

export const describe = 'Create a new WebPush variant';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['url', 'app-id', 'name', 'alias', 'output'], 'Create Variant:')
    .option('alias', {
      required: true,
      type: 'string',
      describe:
        'The application server contact information (this must be a mailto or an https url)',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<WebPushVariant>) => {
  let cmd = UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.web_push.create(argv.appId as string)
    .withName(argv.name)
    .withAlias(argv.alias);

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
