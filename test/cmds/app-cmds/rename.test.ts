import {Arguments} from 'yargs';
import {UnifiedPushAdminClientMock, ConsoleMock} from '../../mocks';
import {handler} from '../../../src/cmds/app-cmds/rename';
import {UPSAdminClientFactory} from '../../../src/utils/UPSAdminClientFactory';
import * as inquirer from 'inquirer';

jest.mock('inquirer', () => ({
  prompt: jest
    .fn()
    .mockReturnValueOnce({confirm: true})
    .mockReturnValue({confirm: false}),
}));

beforeEach(() => {
  ConsoleMock.init();
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
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
    const testApp = await UPSAdminClientFactory.getUpsAdminInstance({
      _: [],
      $0: '',
    })
      .applications.create('applicationToRename')
      .execute();

    await handler({
      url: 'http://localhost:9999',
      appId: testApp.pushApplicationID,
      name: 'NewName',
      _: [] as string[],
      $0: '',
    });
    expect(ConsoleMock.log).toHaveBeenCalled();
    expect(ConsoleMock.log).toHaveBeenCalledWith(
      'Application renamed successfully'
    );
  });
});
