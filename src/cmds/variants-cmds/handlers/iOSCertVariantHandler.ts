import {VariantHandler} from './VariantHandler';
import {Arguments} from 'yargs';
import {Variant} from '@aerogear/unifiedpush-admin-client';
import {VariantDef} from './VariantDef';
import * as inquirer from 'inquirer';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';
import * as fs from 'fs';

export class IOSCertVariantHandler implements VariantHandler {
  private readonly questions = (def: VariantDef): Array<{}> => [
    {
      name: 'certificate',
      type: 'input',
      message: 'Path to your P12 file:',
      validate: (path: string) =>
        fs.existsSync(path) ? true : 'Specified path do not exists',
      when: () => !def.certificate,
    },
    {
      name: 'password',
      type: 'input',
      message: 'P12 file password:',
      validate: (pwd: string) => pwd.trim().length > 0,
      when: () => !def.password,
    },
    {
      name: 'production',
      type: 'confirm',
      message: 'Is this a production certificate?',
      when: () => def.production === null || def.production === undefined,
    },
  ];

  async handle(argv: Arguments, def: {}): Promise<Variant> {
    const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;

    return UPSAdminClientFactory.getUpsAdminInstance(argv)
      .variants.ios.create(argv.appId as string)
      .withName(argv.name as string)
      .withCertificate(answers['certificate'])
      .withPassphrase(answers['password'])
      .isProduction()
      .execute();
  }
}
