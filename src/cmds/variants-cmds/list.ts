import {Arguments, Argv} from 'yargs';
import {Variant, VariantFilter} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {table} from 'table';
import {normalizeFilter} from '../../utils/FilterUtils';

exports.command = 'list <app-id>';

exports.describe =
  'lists the variants for the application identified by <app-id>';

export const builder = (yargs: Argv) => {
  return yargs
    .group('filter', 'Variants list:')
    .option('filter', {
      required: false,
      type: 'string',
      describe: 'Filter to be used to refine the list',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<Record<string, string>>) => {
  const filter: VariantFilter | undefined = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter))
    : undefined;
  const variants = await UPSAdminClientFactory.getUpsAdminInstance(
    argv
  ).variants.find(argv.appId, filter);
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
