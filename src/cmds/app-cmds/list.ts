import {Arguments, Argv} from 'yargs';
import {
  PushApplication,
  PushApplicationFilter,
} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import {generateOutput} from '../../utils/output';

export const command = 'list';

export const describe = 'lists the applications';

export const builder = (yargs: Argv) => {
  return yargs
    .group(
      ['app-id', 'name', 'description', 'developer', 'output'],
      'Applications list:'
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
    .applications.search()
    .withFilter({
      pushApplicationID: argv.appId as string,
      name: argv.name,
      developer: argv.developer,
      description: argv.description,
    })
    .page(-1)
    .execute();

  console.log(
    generateOutput({
      format: argv.output as string,
      headers: [
        'NAME',
        'PUSH-APPLICATION-ID',
        'VARIANTS',
        'INSTALLATIONS',
        'SENT-MESSAGES',
      ],
      properties: ['name', 'id', 'varCount', 'deviceCount', 'activity'],
      transformer: (app: PushApplication) => ({
        name: app.name,
        id: app.pushApplicationID,
        varCount: `${app.variants?.length || 0}`,
        deviceCount: `${app.metadata?.deviceCount || 0}`,
        activity: `${app.metadata?.activity || 0}`,
      }),
      value: apps.list,
    })
  );
};
