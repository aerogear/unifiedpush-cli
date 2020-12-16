import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';
import * as fs from 'fs';
import {IOSVariant} from '@aerogear/unifiedpush-admin-client';
import {generateOutput} from '../../../utils/output';
export const command = 'ios-cert';

export const describe = 'Create a new iOS variant (certificate)';

export const builder = (yargs: Argv) => {
  return yargs
    .group(
      [
        'app-id',
        'name',
        'certificate',
        'passphrase',
        'production',
        'secret',
        'description',
        'output',
      ],
      'Create Variant:'
    )
    .option('certificate', {
      required: true,
      type: 'string',
      describe: 'The path to the ".p12" file containing the Apple certificate',
      requiresArg: true,
    })
    .option('passphrase', {
      required: true,
      type: 'string',
      describe: 'The passphrase to be used to access the certificate',
      requiresArg: true,
    })
    .option('production', {
      required: false,
      type: 'boolean',
      describe: 'Must be specified to create a production variant',
      requiresArg: false,
    })
    .help();
};

export const handler = async (argv: Arguments<IOSVariant>) => {
  const fileToString = (filePath: string): string =>
    fs.readFileSync(filePath, 'utf8');

  let cmd = UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.ios.create(argv.appId as string)
    .withName(argv.name)
    .withCertificate(fileToString(argv.certificate))
    .withPassphrase(argv.passphrase);

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
