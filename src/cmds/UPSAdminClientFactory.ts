import { UnifiedPushAdminClient } from '@aerogear/unifiedpush-admin-client';
import { Arguments } from 'yargs';
import {
  BasicCredentials,
  KeycloakCredentials,
} from '@aerogear/unifiedpush-admin-client/dist/src/UnifiedPushAdminClient';

export class UPSAdminClientFactory {
  static getUpsAdminInstance(argv: Arguments) {
    const type = argv['auth-type'] as string;

    return type === 'basic'
      ? new UnifiedPushAdminClient(
          argv.url as string,
          { username: argv.username as string, password: argv.password as string, type: 'basic' } as BasicCredentials
        )
      : new UnifiedPushAdminClient(
          argv.url as string,
          {
            username: argv.username as string,
            password: argv.password as string,
            type: 'keycloak',
            kcUrl: argv.kcUrl as string,
            realm: argv.realm as string,
            client_id: argv.clientId as string,
          } as KeycloakCredentials
        );
  }
}
