import {Arguments, Argv} from 'yargs';
import {Variant} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {table} from 'table';
import {normalizeFilter} from '../../utils/FilterUtils';

exports.command = 'list';

exports.describe =
  'lists the variants for the application identified by <app-id>';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['filter', 'app-id'], 'Variants list:')
    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'The application id',
      requiresArg: true,
    })
    .option('filter', {
      required: false,
      type: 'string',
      describe: 'Filter to be used to refine the list',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<Record<string, string>>) => {
  const filter: VariantFilter = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter))
    : {};
  const variants = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.search(argv.appId)
    .withFilter(filter)
    .execute();
  if (variants.length !== 0) {
    const tableData = variants.reduce(
      (previousValue: string[][], currentValue: Variant): string[][] => {
        previousValue.push([
          currentValue.name,
          currentValue.variantID!,
          currentValue.type,
        ]);
        return previousValue;
      },
      [['NAME', 'VARIANT-ID', 'TYPE']]
    );
    console.log(table(tableData));
  } else {
    console.log('No variants found');
  }
};
