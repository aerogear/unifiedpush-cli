import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import * as fs from 'fs';
import {PushApplication, Variant} from '@aerogear/unifiedpush-admin-client';
export const command = 'import';

export const describe =
  'Import a list of applications from a json file together with their variants. Such file can be the json output of the list command';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['in', 'output'], 'Import applications:')
    .option('in', {
      required: true,
      type: 'string',
      describe:
        'Path to the json file containing the applications to be imported.',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments) => {
  const fileToString = (filePath: string): string =>
    fs.readFileSync(filePath, 'utf8');

  const appList: PushApplication[] = JSON.parse(
    fileToString(argv.in as string)
  );

  const newApps: PushApplication[] = [];

  await Promise.all(
    appList.map(async oldApp => {
      const variants: Variant[] = oldApp.variants || [];
      oldApp.variants = [];
      variants.forEach(v => {
        const vtmp = v as Record<string, string>;
        delete vtmp.id;
        delete vtmp.variantID;
      });

      const newAppDefinition = ({...oldApp} as unknown) as Record<
        string,
        string
      >;
      delete newAppDefinition['pushApplicationID'];
      delete newAppDefinition['id'];

      try {
        // creating the apps
        const newApp = await UPSAdminClientFactory.getUpsAdminInstance(argv)
          .applications.create('')
          .withDefinition(newAppDefinition)
          .execute();
        newApps.push(newApp);

        for (const v of variants) {
          await UPSAdminClientFactory.getUpsAdminInstance(argv)
            .variants[v.type].create(newApp.pushApplicationID)
            .withDefinition((v as unknown) as never)
            .execute();
        }
      } catch (err) {
        77;
        console.log(
          'Failed importing app with ID',
          oldApp.pushApplicationID,
          err
        );
      }
    })
  );
  console.log(`${newApps.length} application(s) imported`);
};
