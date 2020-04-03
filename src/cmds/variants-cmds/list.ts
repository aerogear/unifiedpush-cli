import { Arguments, Argv } from 'yargs';
import { PushApplication, PushApplicationFilter, Variant, VariantFilter } from '@aerogear/unifiedpush-admin-client';
import { UPSAdminClientFactory } from '../../utils/UPSAdminClientFactory';
import { table } from 'table';

exports.command = 'list <app-id>';

exports.describe = 'lists the variants for the application identified by <app-id>';

exports.builder = (yargs: Argv) => {
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

const normalizeFilter = (filter: { [key: string]: string }): { [key: string]: string } => {
  const res: { [key: string]: string } = {};
  Object.keys(filter).forEach((key: string) => {
    switch (key.toLowerCase()) {
      case 'name':
        res['name'] = filter[key];
        break;
      case 'variant-id':
        res['variantID'] = filter[key];
        break;
      case 'type':
        res['type'] = filter[key];
        break;
      default:
        res[key] = filter[key];
    }
  });

  return res;
};

exports.handler = async (argv: Arguments) => {
  const filter: VariantFilter | undefined = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter as string))
    : undefined;
  const variants = await UPSAdminClientFactory.getUpsAdminInstance(argv).variants.find(argv.appId as string, filter);
  if (variants.length !== 0) {
    const tableData = variants.reduce(
      (previousValue: string[][], currentValue: Variant): string[][] => {
        previousValue.push([currentValue.name, currentValue.variantID!, currentValue.type]);
        return previousValue;
      },
      [['NAME', 'VARIANT-ID', 'TYPE']]
    );
    console.log(table(tableData));
  } else {
    console.log('No variants found');
  }
};
