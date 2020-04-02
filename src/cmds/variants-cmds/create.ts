import { Arguments, Argv } from 'yargs';
import * as inquirer from 'inquirer';
import { table } from 'table';
import { VariantHandlerFactory } from './handlers';
import { VariantDef } from './handlers/VariantDef';
exports.command = 'create';

exports.describe = 'create a new variant';

exports.builder = (yargs: Argv) => {
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

exports.handler = async (argv: Arguments<VariantDef>) => {
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
      //validate: (answer: string) => answer.trim().length > 0
    },
  ];

  const answers = { ...((await inquirer.prompt(questions)) as VariantDef), ...variantDef };

  const variant = await VariantHandlerFactory.getInquirer(answers.type).handle(argv, answers);

  console.log('Variant created');
  console.log(
    table([
      ['NAME', 'VARIANT-ID', 'TYPE'],
      [variant.name, variant.variantID, variant.type],
    ])
  );
};
