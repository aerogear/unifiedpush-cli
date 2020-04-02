import { Arguments } from 'yargs';
import { AndroidVariant, Variant } from '@aerogear/unifiedpush-admin-client';
import { VariantHandler } from './VariantHandler';
import { VariantDef } from './VariantDef';
import * as inquirer from 'inquirer';
import { UPSAdminClientFactory } from '../../UPSAdminClientFactory';

export class AndroidVariantHandler implements VariantHandler {
  private readonly questions = (def: VariantDef): Array<{}> => [
    {
      name: 'googleKey',
      type: 'input',
      message: 'Server Key:',
      when: (argv: Arguments) => !def.googleKey && def.type === 'android',
    },
    {
      name: 'projectNumber',
      type: 'input',
      message: 'Sender ID:',
      when: (argv: Arguments) => !def.projectNumber && def.type === 'android',
    },
  ];

  async handle(argv: Arguments, def: {}): Promise<Variant> {
    const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;

    return UPSAdminClientFactory.getUpsAdminInstance(argv).variants.create(
      argv.appId as string,
      { ...answers, ...def } as AndroidVariant
    );
  }
}
