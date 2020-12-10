import {ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/rename';
import {UPSAdminClientFactory} from '../../../src/utils/UPSAdminClientFactory';
import * as inquirer from 'inquirer';
import {
  createApplications,
  getAllApplications,
  initMockEngine,
} from '../../mocks/UPSMock';

jest.mock('inquirer', () => ({
  prompt: jest
    .fn()
    .mockReturnValueOnce({confirm: true})
    .mockReturnValue({confirm: false}),
}));

beforeEach(() => {
  ConsoleMock.init();
  initMockEngine();
  ConsoleMock.mockClear();
  const promptMock = (inquirer.prompt as unknown) as jest.Mock<
    typeof inquirer.prompt
  >;
  promptMock.mockClear();
});

afterEach(() => {
  ConsoleMock.uninstall();
});

describe('Rename Application', () => {
  it('Should rename a specified Application', async () => {
    const NEW_NAME = 'RENAME TEST';
    createApplications({appCount: 10});

    const appToUpdate = getAllApplications()[5];

    expect(
      getAllApplications().find(
        app => app.pushApplicationID === appToUpdate.pushApplicationID
      )!.name
    ).not.toEqual(NEW_NAME);

    await handler({
      url: 'http://localhost:9999',
      appId: appToUpdate.pushApplicationID,
      name: 'RENAME TEST',
      _: [] as string[],
      $0: '',
    });
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      'Application renamed successfully'
    );
    expect(
      getAllApplications().find(
        app => app.pushApplicationID === appToUpdate.pushApplicationID
      )!.name
    ).toEqual(NEW_NAME);
  });
});
