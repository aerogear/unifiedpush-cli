import {PushApplication} from '@aerogear/unifiedpush-admin-client';

export const createApplicationMock = (
  pushAppArray: PushApplication[],
  name: string
) => ({
  execute: async (): Promise<PushApplication> => {
    const app = {
      pushApplicationID: 'new-app-push-id',
      name,
      masterSecret: 'Shhhhhhh!',
      developer: 'Test Developer 1',
    };
    pushAppArray.push(app);
    return app;
  },
});
