import {Arguments} from 'yargs';
import * as inquirer from 'inquirer';
import * as crypto from 'crypto';
import * as urlBase64 from 'urlsafe-base64';
import {VariantHandler} from './VariantHandler';
import {Variant} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../../utils/UPSAdminClientFactory';
import {VariantDef} from './VariantDef';
import {WebPushVariant} from '@aerogear/unifiedpush-admin-client';

export class WebPushVariantHandler implements VariantHandler {
  private readonly questions = (def: VariantDef): Array<{}> => [
    {
      name: 'alias',
      type: 'input',
      message: 'Alias:',
      when: () => def.type === 'web_push' && !def.alias,
    },
  ];

  private static generateVAPIDKeys() {
    const curve = crypto.createECDH('prime256v1');
    curve.generateKeys();

    let publicKeyBuffer = curve.getPublicKey();
    let privateKeyBuffer = curve.getPrivateKey();

    // Occasionally the keys will not be padded to the correct length resulting
    // in errors, hence this padding.
    // See https://github.com/web-push-libs/web-push/issues/295 for history.
    if (privateKeyBuffer.length < 32) {
      const padding = Buffer.alloc(32 - privateKeyBuffer.length);
      padding.fill(0);
      privateKeyBuffer = Buffer.concat([padding, privateKeyBuffer]);
    }

    if (publicKeyBuffer.length < 65) {
      const padding = Buffer.alloc(65 - publicKeyBuffer.length);
      padding.fill(0);
      publicKeyBuffer = Buffer.concat([padding, publicKeyBuffer]);
    }

    return {
      publicKey: urlBase64.encode(publicKeyBuffer),
      privateKey: urlBase64.encode(privateKeyBuffer),
    };
  }

  // async handle(argv: Arguments, def: {}): Promise<Variant> {
  //   const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;
  //
  //   return UPSAdminClientFactory.getUpsAdminInstance(argv).variants.create(
  //     argv.appId as string,
  //     {
  //       ...answers,
  //       ...def,
  //       ...WebPushVariantHandler.generateVAPIDKeys(),
  //     } as WebPushVariant
  //   );
  // }

  async handle(argv: Arguments, def: {}): Promise<Variant> {
    const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;

    return UPSAdminClientFactory.getUpsAdminInstance(argv)
      .variants.web_push.create(argv.appId as string)
      .withAlias(answers['alias'])
      .execute();
  }
}

// async handle(argv: Arguments, def: {}): Promise<Variant> {
//   const answers = (await inquirer.prompt(this.questions(def))) as VariantDef;
//
// return UPSAdminClientFactory.getUpsAdminInstance(argv).variants.web_push
//     .create(argv.appId as string)
//     .withAlias(answers['alias'])
//     .execute()
// }
