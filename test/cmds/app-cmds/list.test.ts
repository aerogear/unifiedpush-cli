/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/list';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../mocks/UPSMock';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  // UnifiedPushAdminClientMock.mockClear();
  initMockEngine();
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('applications', () => {
  it('Should list all applications', async () => {
    // create 5 applications
    createApplications({appCount: 5, variantCount: 3});

    const apps = getAllApplications();

    // @ts-ignore
    await handler({url: 'http://localhost:9999'});
    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      `╔═══════╤══════════════════════════════════════╤══════════╤═══════════════╤═══════════════╗
║ NAME  │ PUSH-APPLICATION-ID                  │ VARIANTS │ INSTALLATIONS │ SENT-MESSAGES ║
╟───────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ ${apps[0].name} │ ${apps[0].pushApplicationID} │ 3        │ NaN           │ NaN           ║
╟───────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ ${apps[1].name} │ ${apps[1].pushApplicationID} │ 3        │ NaN           │ NaN           ║
╟───────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ ${apps[2].name} │ ${apps[2].pushApplicationID} │ 3        │ NaN           │ NaN           ║
╟───────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ ${apps[3].name} │ ${apps[3].pushApplicationID} │ 3        │ NaN           │ NaN           ║
╟───────┼──────────────────────────────────────┼──────────┼───────────────┼───────────────╢
║ ${apps[4].name} │ ${apps[4].pushApplicationID} │ 3        │ NaN           │ NaN           ║
╚═══════╧══════════════════════════════════════╧══════════╧═══════════════╧═══════════════╝
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
