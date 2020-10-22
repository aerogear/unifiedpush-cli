/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {UnifiedPushAdminClientMock, ConsoleMock} from '../../mocks';
import {UpsAdminClient} from '@aerogear/unifiedpush-admin-client';
import {UPSAdminClientFactory} from '../../../src/utils/UPSAdminClientFactory';
import {handler} from '../../../src/cmds/app-cmds/list';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('applications', () => {
  it('Should list all applications', async () => {
    await UPSAdminClientFactory.getUpsAdminInstance({_: [], $0: ''})
      .applications.create('application 1')
      .execute();

    // @ts-ignore
    await handler({url: 'http://localhost:9999'});
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `╔═══════════════╤═════════════════════╤══════════╤═══════════════╤═══════════════╗
║ NAME          │ PUSH-APPLICATION-ID │ VARIANTS │ INSTALLATIONS │ SENT-MESSAGES ║
╟───────────────┼─────────────────────┼──────────┼───────────────┼───────────────╢
║ application 1 │ new-app-push-id     │ 0        │ undefined     │ undefined     ║
╚═══════════════╧═════════════════════╧══════════╧═══════════════╧═══════════════╝
`
    );
  });

  it('Should return "no applications found"', async () => {
    const filter = {name: 'wrong name'};
    // @ts-ignore
    await handler({
      url: 'http://localhost:9999',
      filter: JSON.stringify(filter),
    });
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(ConsoleMock.log).toHaveBeenCalledWith('No applications found');
  });
});
