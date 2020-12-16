import {Argv} from 'yargs';
export const command = 'create';

export const describe = 'create a new variant';

exports.builder = (yargs: Argv) => {
  return yargs

    .option('app-id', {
      required: true,
      type: 'string',
      describe: 'Id of the application owning the variant',
      requiresArg: true,
    })
    .option('name', {
      required: true,
      type: 'string',
      describe: 'The name of the variant to be created',
      requiresArg: true,
    })
    .commandDir('create-cmds', {
      extensions: process.env.upscli_test ? ['js', 'ts'] : ['js'],
    })
    .demandCommand()
    .option('secret', {
      required: false,
      type: 'string',
      describe:
        'The variant secret. This is useful if you are migrating a variant from one server to another. ' +
        'If not specified, it will be autogenerated',
      requiresArg: true,
    })
    .option('description', {
      required: false,
      type: 'string',
      describe: 'The variant description ',
      requiresArg: true,
    })
    .option('output', {
      alias: 'o',
      choices: ['table', 'json'],
      default: 'table',
      required: false,
      type: 'string',
      describe: 'The output to be generated',
      requiresArg: true,
    })
    .help();
};
