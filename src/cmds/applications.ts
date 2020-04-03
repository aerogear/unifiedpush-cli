import { Argv } from 'yargs';
exports.command = 'applications';

exports.describe = 'manage the applications';

exports.builder = (yargs: Argv) => {
  return yargs
    .commandDir('./app-cmds', { extensions: process.env.upscli_test ? ['js', 'ts'] : ['js'] })
    .demandCommand()
    .help();
};
