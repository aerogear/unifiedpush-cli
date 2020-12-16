import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {generateOutput} from '../../utils/output';
export const command = 'create';

export const describe = 'create a new application';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['url', 'name', 'output'], 'Create application:')
    .option('name', {
      required: true,
      type: 'string',
      describe: 'Name of the application to create',
      requiresArg: true,
      conflicts: 'in',
    })
    .help();
};

export const handler = async (argv: Arguments) => {
  const app = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .applications.create(argv.name as string)
    .execute();

  console.log(
    generateOutput({
      intro: 'Application created successfully',
      headers: ['NAME', 'PUSH-APPLICATION-ID'],
      properties: ['name', 'pushApplicationID'],
      format: argv.output as string,
      value: [(app as unknown) as Record<string, unknown>],
    })
  );
};
