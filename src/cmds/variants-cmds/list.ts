import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {generateOutput} from '../../utils/output';

exports.command = 'list';

exports.describe =
  'lists the variants for the application identified by <app-id>';

export const builder = (yargs: Argv) => {
  return yargs
    .group(
      ['url', 'app-id', 'variant-id', 'type', 'name', 'developer', 'output'],
      'List variants:'
    )
    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'The application id',
      requiresArg: true,
    })
    .option('variant-id', {
      required: false,
      type: 'string',
      describe: 'The variant id',
      requiresArg: true,
    })
    .option('name', {
      required: false,
      type: 'string',
      describe: 'Returns all the variants matching the specified name',
      requiresArg: true,
    })
    .option('developer', {
      required: false,
      type: 'string',
      describe: 'Returns all the variants matching the specified developer',
      requiresArg: true,
    })
    .option('type', {
      required: false,
      type: 'string',
      describe: 'Returns all the variants of the specified type',
      requiresArg: true,
    })
    .option('output', {
      alias: 'o',
      choices: ['table', 'json'],
      default: 'table',
      required: false,
      type: 'string',
      describe: 'The output to be generated',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<VariantFilter>) => {
  const filter: VariantFilter = {
    variantID: argv.variantId as string,
    ...argv,
  };

  const variants = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.search(argv.appId as string)
    .withFilter(filter)
    .execute();

  console.log(
    generateOutput({
      headers: ['NAME', 'VARIANT-ID', 'TYPE'],
      properties: ['name', 'variantID', 'type'],
      value: variants,
      format: argv.output as string,
    })
  );
};
