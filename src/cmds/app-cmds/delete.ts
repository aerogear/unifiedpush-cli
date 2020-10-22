import {Arguments, Argv} from 'yargs';
import {PushApplicationFilter} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {normalizeFilter} from '../../utils/FilterUtils';
import * as inquirer from 'inquirer';

export const command = 'delete';

export const describe = 'delete applications';

export const builder = (yargs: Argv) => {
  return yargs
    .group('filter', 'Delete Applications:')
    .option('filter', {
      required: false,
      type: 'string',
      describe:
        'A filter to select the application(s) to be deleted (JSon). If not specified, all applications will be deleted.',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments) => {
  const filter: PushApplicationFilter = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter as string))
    : {};

  const apps = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .applications.search()
    .withFilter(filter)
    .execute();

  if (apps.list.length !== 0) {
    const questions: Array<{}> = [
      {
        name: 'confirm',
        type: 'confirm',
        message: `${apps.total} application(s) will be deleted. Proceed?`,
        default: false,
      },
    ];
    const answers: Record<string, string> = await inquirer.prompt(questions);
    if (answers.confirm) {
      await UPSAdminClientFactory.getUpsAdminInstance(argv)
        .applications.delete()
        .withFilter(filter)
        .execute();
      console.log(`${apps.list.length} application(s) deleted`);
    }
  } else {
    console.log('0 applications deleted');
  }
};
