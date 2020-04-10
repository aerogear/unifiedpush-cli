import * as yargs from 'yargs';
import { UnifiedPushAdminClientMock, AdminClientMock } from '../mocks/MockUnifiedPushAdminClient';

process.env.upscli_test = 'true';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  UnifiedPushAdminClientMock.mockClear();
});

describe('applications list', () => {
  it('should call find with no filters', async () => {
    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(false);

    const output = await new Promise(resolve => {
      parser.parse(
        'applications list --url http://127.0.0.1:9999 --auth-type basic',
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });

    expect(AdminClientMock.applications.find).toHaveBeenCalledTimes(1);
    expect(AdminClientMock.applications.find.mock.calls[0][0]).toBeUndefined();
  });

  it('should call find with a filters', async () => {
    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(false);

    const filter = { name: 'Application 1' };

    const output = await new Promise(resolve => {
      parser.parse(
        `applications --url http://127.0.0.1:9999 --auth-type basic list --filter '${JSON.stringify(filter)}'`,
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });

    expect(AdminClientMock.applications.find).toHaveBeenCalledTimes(1);
    expect(AdminClientMock.applications.find.mock.calls[0][0]).toEqual(filter);
  });

  it('should accept push-application-idand developer filters', async () => {
    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(false);

    const filter = { 'push-application-id': 'appid', developer: 'test' };

    const output = await new Promise(resolve => {
      parser.parse(
        `applications --url http://127.0.0.1:9999 --auth-type basic list --filter '${JSON.stringify(filter)}'`,
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });
    expect(AdminClientMock.applications.find).toHaveBeenCalledTimes(1);
    expect(AdminClientMock.applications.find.mock.calls[0][0]).toEqual({
      pushApplicationID: 'appid',
      developer: 'test',
    });
  });
});

describe('applications create', () => {
  it('should call create', async () => {
    const parser = yargs.commandDir('../../src/cmds', { extensions: ['js', 'ts'] }).showHelpOnFail(false);

    const output = await new Promise(resolve => {
      parser.parse(
        'applications --url http://127.0.0.1:9999 --auth-type basic create --name Test1',
        (err: Error, argv: {}, output: string) => {
          resolve(output);
        }
      );
    });

    expect(AdminClientMock.applications.create).toHaveBeenCalledTimes(1);
    expect(AdminClientMock.applications.create.mock.calls[0][0]).toEqual('Test1');
  });
});
