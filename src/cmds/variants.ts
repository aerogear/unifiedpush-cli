import {Argv} from 'yargs';

exports.command = 'variants';

exports.describe = 'manage the variants';

exports.builder = (yargs: Argv) => {
  return yargs
    .commandDir('variants-cmds', {
      extensions: process.env.upscli_test ? ['js', 'ts'] : ['js'],
    })
    .demandCommand()
    .help();
};
