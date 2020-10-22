import {Arguments} from 'yargs';
import {Variant} from '@aerogear/unifiedpush-admin-client';
import {VariantHandler} from './VariantHandler';
import {VariantDef} from './VariantDef';
import * as inquirer from 'inquirer';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';

export class AndroidVariantHandler implements VariantHandler {
  private readonly questions = (def: VariantDef): Array<{}> => [
    {
      name: 'googleKey',
      type: 'input',
      message: 'Server Key:',
      when: () => !def.googleKey && def.type === 'android',
    },
    {
      name: 'projectNumber',
      type: 'input',
      message: 'Sender ID:',
      when: () => !def.projectNumber && def.type === 'android',
    },
  ];

  async handle(argv: Arguments, def: {}): Promise<Variant> {
    const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;
    return await UPSAdminClientFactory.getUpsAdminInstance(argv)
      .variants.android.create(argv.appId as string)
      .withName(argv.name as string)
      .withGoogleKey(answers['googleKey'])
      .withProjectNumber(answers['projectNumber'])
      .execute();
  }
}
