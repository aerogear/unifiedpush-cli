import {ConsoleMock, UnifiedPushAdminClientMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/create';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('applications', () => {
  it('Should create an application', async () => {
    await handler({
      url: 'http://localhost:9999',
      name: 'TEST-APP',
      _: [],
      $0: '',
    });
    expect(ConsoleMock.log).toHaveBeenCalledTimes(2);
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      'Application created successfully'
    );
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `╔══════════╤═════════════════════╗
║ NAME     │ PUSH-APPLICATION-ID ║
╟──────────┼─────────────────────╢
║ TEST-APP │ new-app-push-id     ║
╚══════════╧═════════════════════╝
`
    );
  });
});
