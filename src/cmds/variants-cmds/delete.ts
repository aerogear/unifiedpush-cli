import {Arguments, Argv} from 'yargs';
import {UPSAdminClientFactory} from '../../utils/UPSAdminClientFactory';
import * as inquirer from 'inquirer';
import {normalizeFilter} from '../../utils/FilterUtils';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';

export const command = 'delete';

export const describe = 'delete variant(s)';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['app-id'], 'Delete Variant:')
    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'Id of the application owning the variant(s)',
      requiresArg: true,
    })
    .option('filter', {
      required: false,
      type: 'string',
      describe:
        'A filter to select the variant(s) to be deleted. If not specified, all variants will be deleted.',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<Record<string, string>>) => {
  const filter: VariantFilter = argv.filter
    ? normalizeFilter(JSON.parse(argv.filter))
    : {};
  const variants = await UPSAdminClientFactory.getUpsAdminInstance(argv)
    .variants.search(argv.appId)
    .withFilter(filter)
    .execute();
  const questions: Array<{}> = [
    {
      name: 'confirm',
      type: 'confirm',
      message: `${variants.length} variant(s) will be deleted. Proceed?`,
      default: false,
    },
  ];

  const answers: Record<string, string> = await inquirer.prompt(questions);
  if (answers.confirm) {
    const deletedVariants = await UPSAdminClientFactory.getUpsAdminInstance(
      argv
    )
      .variants.delete(argv.appId)
      .withFilter(filter)
      .execute();
    console.log(
      `${deletedVariants.filter(variant => variant).length} variant(s) deleted`
    );
  }
};
