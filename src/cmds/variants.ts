import { Argv } from 'yargs';

exports.command = 'variants';

exports.describe = 'manage the variants';

exports.builder = (yargs: Argv) => {
  return yargs
    .commandDir('variants-cmds')
    .demandCommand()
    .help();
};
