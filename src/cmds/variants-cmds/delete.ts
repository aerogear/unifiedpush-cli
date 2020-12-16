import {Arguments, Argv} from 'yargs';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
export const command = 'delete';

export const describe = 'delete variant(s)';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['app-id', 'name', 'developer', 'type'], 'Delete Variants:')
    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'The application id',
      requiresArg: true,
    })
    .option('name', {
      required: false,
      type: 'string',
      describe: 'Deletes all the variants matching the specified name',
      requiresArg: true,
    })
    .option('developer', {
      required: false,
      type: 'string',
      describe: 'Deletes all the variants matching the specified developer',
      requiresArg: true,
    })
    .option('type', {
      required: false,
      type: 'string',
      describe: 'Deletes all the variants of the specified type',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<VariantFilter>) => {
  const filter = {
    pushApplicationID: argv.appId as string,
    ...argv,
  };
  const deletedVariants = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.delete(argv.appId as string)
    .withFilter(filter)
    .execute();
  console.log(`${deletedVariants.length} variant(s) deleted`);
};
