import { VariantHandler } from './VariantHandler';
import { Arguments } from 'yargs';
import { IOSTokenVariant, Variant } from '@aerogear/unifiedpush-admin-client';
import { fileToString } from './utils';
import { VariantDef } from './VariantDef';
import * as inquirer from 'inquirer';
import { UPSAdminClientFactory } from '../../UPSAdminClientFactory';

export class IOSTokenVariantHandler implements VariantHandler {
  private readonly questions = (def: VariantDef): Array<{}> => [
    {
      name: 'privateKey',
      type: 'input',
      message: 'Path to Private Key file:',
      filter: fileToString,
      when: () => !def.privateKey,
    },
    {
      name: 'keyId',
      type: 'input',
      message: 'Key Id:',
      validate: (keyId: string) => keyId.length === 10 || 'Key ID must be 10 characters long',
      when: () => !def.keyId,
    },
    {
      name: 'teamId',
      type: 'input',
      message: 'Team Id:',
      validate: (teamId: string) => teamId.length === 10 || 'Team ID must be 10 characters long',
      when: () => !def.teamId,
    },
    {
      name: 'bundleId',
      type: 'input',
      message: 'Bundle Id:',
      when: () => !def.bundleId,
    },
    {
      name: 'production',
      type: 'confirm',
      message: 'Is this a production certificate?',
      when: () => !def.production,
    },
  ];

  async handle(argv: Arguments, def: {}): Promise<Variant> {
    const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;

    return UPSAdminClientFactory.getUpsAdminInstance(argv).variants.create(
      argv.appId as string,
      { ...answers, ...def } as IOSTokenVariant
    );
  }
}
