import {Arguments, Argv} from 'yargs';
import {PushApplicationFilter} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';

export const command = 'delete';

export const describe = 'delete applications';

export const builder = (yargs: Argv) => {
  return yargs
    .group(
      ['name', 'app-id', 'description', 'developer'],
      'Delete Applications:'
    )
    .option('name', {
      required: false,
      type: 'string',
      describe: 'Returns all the applications with a given name',
      requiresArg: true,
    })
    .option('app-id', {
      required: false,
      type: 'string',
      describe: 'Return the application identified by the given id',
      requiresArg: true,
    })
    .option('description', {
      required: false,
      type: 'string',
      describe: 'Returns all the applications matching the given description',
      requiresArg: true,
    })
    .option('developer', {
      required: false,
      type: 'string',
      describe: 'Returns all the applications matching the given developer',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<PushApplicationFilter>) => {
  const apps = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .applications.delete()
    .withFilter({
      pushApplicationID: argv.appId as string,
      ...argv,
    })
    .execute();
  console.log(`${apps.length} application(s) deleted`);
};
