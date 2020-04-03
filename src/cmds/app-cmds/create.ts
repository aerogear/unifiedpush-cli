import { Arguments, Argv } from 'yargs';
import { table } from 'table';
import { UPSAdminClientFactory } from '../../utils/UPSAdminClientFactory';
exports.command = 'create';

exports.describe = 'create a new application';

exports.builder = (yargs: Argv) => {
  return yargs
    .group(['name'], 'Create application:')
    .option('name', {
      required: true,
      type: 'string',
      describe: 'Name of the application to create',
      requiresArg: true,
      conflicts: 'in',
    })
    .help();
};

exports.handler = async (argv: Arguments) => {
  const app = await UPSAdminClientFactory.getUpsAdminInstance(argv).applications.create(argv.name as string);

  console.log('Application created successfully');
  console.log(
    table([
      ['NAME', 'PUSH-APPLICATION-ID'],
      [app.name, app.pushApplicationID],
    ])
  );
};
