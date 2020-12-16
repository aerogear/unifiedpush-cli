import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/create';
import {getAllApplications, initMockEngine} from '../../mocks/UPSMock';
import {IDGenerator} from '../../mocks/DataStore';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  //UnifiedPushAdminClientMock.mockClear();
  initMockEngine();
  ConsoleMock.init();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('applications', () => {
  it('Should create an application', async () => {
    const appId = IDGenerator.peek();

    await handler({
      url: 'http://localhost:9999',
      name: 'TEST-APP',
      output: 'json',
      _: [],
      $0: '',
    });

    const testApp = getAllApplications().find(
      app => app.pushApplicationID === appId
    );

    expect(ConsoleMock.log).toHaveBeenCalledTimes(1);
    expect(ConsoleMock.log).toHaveBeenCalledWith(JSON.stringify([testApp]));
  });
});
