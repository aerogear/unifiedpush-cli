import { table } from 'table';
import { Arguments, Argv } from 'yargs';
import { PushApplication, PushApplicationFilter, UnifiedPushAdminClient } from '@aerogear/unifiedpush-admin-client';
import { UPSAdminClientFactory } from '../UPSAdminClientFactory';

exports.command = 'list';

exports.describe = 'lists the applications';

exports.builder = (yargs: Argv) => {
  return yargs
    .group('filter', 'Applications list:')
    .option('filter', {
      required: false,
      type: 'string',
      describe: 'Filter to be used to refine the list (JSon format)',
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
      case 'push-application-id':
        res['pushApplicationID'] = filter[key];
        break;
      default:
        res[key] = filter[key];
    }
  });

  return res;
};

exports.handler = async (argv: Arguments) => {
  const filter: PushApplicationFilter | undefined = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter as string))
    : undefined;
  const apps = await UPSAdminClientFactory.getUpsAdminInstance(argv).applications.find(filter);
  if (apps.length !== 0) {
    const tableData = apps.reduce(
      (previousValue: string[][], currentValue: PushApplication): string[][] => {
        previousValue.push([
          currentValue.name,
          currentValue.pushApplicationID!,
          `${currentValue.variants?.length || 0}`,
        ]);
        return previousValue;
      },
      [['NAME', 'PUSH-APPLICATION-ID', 'VARIANTS']]
    );
    console.log(table(tableData));
  } else {
    console.log('No applications found');
  }
};
