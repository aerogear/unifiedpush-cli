/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {UnifiedPushAdminClientMock, ConsoleMock} from '../../mocks';
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
    // @ts-ignore
    await handler({url: 'http://localhost:9999'});
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `╔═══════════════╤═════════════════════╤══════════╤═══════════════╤═══════════════╗
║ NAME          │ PUSH-APPLICATION-ID │ VARIANTS │ INSTALLATIONS │ SENT-MESSAGES ║
╟───────────────┼─────────────────────┼──────────┼───────────────┼───────────────╢
║ Application 1 │ 1:1                 │ 3        │ undefined     │ undefined     ║
╟───────────────┼─────────────────────┼──────────┼───────────────┼───────────────╢
║ Application 2 │ 2:2                 │ 2        │ undefined     │ undefined     ║
╟───────────────┼─────────────────────┼──────────┼───────────────┼───────────────╢
║ Application 3 │ 3:3                 │ 1        │ undefined     │ undefined     ║
╟───────────────┼─────────────────────┼──────────┼───────────────┼───────────────╢
║ Application 4 │ 4:4                 │ 0        │ undefined     │ undefined     ║
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
