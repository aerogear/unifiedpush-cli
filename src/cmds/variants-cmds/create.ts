import { Arguments, Argv } from 'yargs';
import * as inquirer from 'inquirer';
import { table } from 'table';
import { VariantHandlerFactory } from './handlers';
import { VariantDef } from './handlers/VariantDef';

export const command = 'create';

export const describe = 'create a new variant';

export const builder = (yargs: Argv) => {
  return yargs
    .group(['app-id'], 'Create Variant:')
    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'Id of the application owning the variant',
      requiresArg: true,
    })
    .option('def', {
      required: false,
      type: 'string',
      describe: 'JSon string describing the variant',
      requiresArg: true,
    })
    .help();
};

export const handler = async (argv: Arguments<VariantDef>) => {
  const variantDef = argv.def ? JSON.parse(argv.def) : {};

  const questions: Array<{}> = [
    {
      name: 'name',
      type: 'input',
      message: 'Variant name:',
      when: () => !variantDef?.name,
    },
    {
      name: 'type',
      type: 'list',
      message: 'Type:',
      choices: ['android', 'ios', 'ios_token', 'web_push'],
      when: () => !variantDef?.type,
    },
  ];

  const answers = { ...((await inquirer.prompt(questions)) as VariantDef), ...variantDef };

  const variant = await VariantHandlerFactory.getHandler(answers.type).handle(argv, answers);

  console.log('Variant created');
  console.log(
    table([
      ['NAME', 'VARIANT-ID', 'TYPE'],
      [variant.name, variant.variantID, variant.type],
    ])
  );
};
