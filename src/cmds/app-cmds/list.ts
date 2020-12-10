import {table} from 'table';
import {Arguments, Argv} from 'yargs';
import {
  PushApplication,
  PushApplicationFilter,
} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {normalizeFilter} from '../../utils/FilterUtils';

export const command = 'list';

export const describe = 'lists the applications';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['page', 'filter'], 'Applications list:')
    .option('page', {
      required: false,
      type: 'number',
      describe: 'page to be shown',
      requiresArg: true,
    })
    .option('filter', {
      required: false,
      type: 'string',
      describe: 'Filter to be used to refine the list (JSon format)',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments) => {
  const filter: PushApplicationFilter = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter as string))
    : {};

  // filter.includeActivity = true;
  // filter.includeDeviceCount = true;

  const page: number = (argv.page as number) || 0;
  const apps = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .applications.search()
    .withFilter(filter)
    .page(page)
    .execute();

  if (apps.list.length !== 0) {
    const tableData = apps.list.reduce(
      (
        previousValue: string[][],
        currentValue: PushApplication
      ): string[][] => {
        previousValue.push([
          currentValue.name,
          currentValue.pushApplicationID!,
          `${currentValue.variants?.length || 0}`,
          `${currentValue.metadata?.deviceCount}`,
          `${currentValue.metadata?.activity}`,
        ]);
        return previousValue;
      },
      [
        [
          'NAME',
          'PUSH-APPLICATION-ID',
          'VARIANTS',
          'INSTALLATIONS',
          'SENT-MESSAGES',
        ],
      ]
    );
    console.log(table(tableData));
  } else {
    console.log('No applications found');
  }
};
