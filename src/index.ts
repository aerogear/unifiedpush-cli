#!/usr/bin/env node
import * as yargs from 'yargs';
import {Argv} from 'yargs';

const keyCloakOptions = (yargs: Argv): Argv => {
  return yargs
    .group(
      ['username', 'password', 'kc-url', 'realm', 'client-id', 'auth-type'],
      'Keycloak Auth:'
    )
    .option('k', {
      alias: 'kc-url',
      required: false,
      type: 'string',
      describe: 'URL of the keycloak server',
      requiresArg: true,
    })
    .option('realm', {
      required: false,
      type: 'string',
      describe: 'The authentication realm used for keycloak authentication',
      default: 'aerogear',
      requiresArg: true,
    })
    .option('client-id', {
      required: false,
      type: 'string',
      describe: 'Client id to be used to authenticate with keycloak',
      default: 'unified-push-server-js',
      requiresArg: true,
    })
    .option('auth-type', {
      required: false,
      type: 'string',
      describe: 'The type of authentication',
      default: 'basic',
      choices: ['basic', 'keycloak'],
      requiresArg: true,
    });
};

const authOptions = (yargs: Argv): Argv => {
  const res = yargs
    .group(['username', 'password', 'auth-type'], 'Basic Auth:')
    .option('u', {
      required: false,
      alias: 'username',
      type: 'string',
      describe: 'username',
      requiresArg: true,
    })
    .option('p', {
      required: false,
      alias: 'password',
      type: 'string',
      describe: 'password',
      requiresArg: true,
    })
    .implies('username', 'password')
    .implies('password', 'username');

  return keyCloakOptions(res);
};

const extractErrorDetails = (msg: string, err: any): string => {
  if (msg) {
    return msg;
  }

  if (err.response?.data) {
    return err.response.data;
  }

  return err.message;
};

authOptions(yargs)
  .demandCommand()
  .option('U', {
    alias: 'url',
    required: true,
    type: 'string',
    describe: 'URL of the UPS server',
    requiresArg: true,
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .option('output', {
    alias: 'o',
    choices: ['table', 'json'],
    default: 'table',
    required: false,
    type: 'string',
    describe: 'The output to be generated',
    requiresArg: true,
  })
  .commandDir('cmds', {
    extensions: process.env.upscli_test ? ['js', 'ts'] : ['js'],
  })
  .strict()
  .fail((msg, err) => {
    console.log('ERROR -', extractErrorDetails(msg, err));
    if (msg) {
      console.log("ups: try 'ups --help' for more information");
    }
    /* eslint-disable-next-line no-process-exit */
    process.exit(1);
  })
  .showHelpOnFail(false)
  .exitProcess(true)
  .usage('$0 --url <url> [auth] <command>')
  .parse();
