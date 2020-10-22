import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';

export const command = 'rename';

export const describe = 'rename one application';

export const builder = (yargs: Argv) => {
  return yargs
    .group('app-id', 'Rename Application:')
    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'The push application ID of the app to be renamed',
      requiresArg: true,
    })
    .option('name', {
      required: true,
      type: 'string',
      describe: 'The new name',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments) => {
  await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .applications.update(argv.appId as string)
    .withName(argv.name as string)
    .execute();
  console.log('Application renamed successfully');
};
