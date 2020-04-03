import * as yargs from 'yargs';
import { PushApplication, PushApplicationFilter, UnifiedPushAdminClient } from '@aerogear/unifiedpush-admin-client';
import { mockData } from '../mockData';

process.env.upscli_test = 'true';

const findApplicationsMock = jest.fn((filter?: PushApplicationFilter): PushApplication[] => {
  return mockData;
});

const createApplicationMock = jest.fn(
  (name: string): PushApplication => {
    return mockData[0];
  }
);

function MockUnifiedPushAdminClient() {
  return {
    applications: {
      find: findApplicationsMock,
      create: createApplicationMock,
    },
  };
}

jest.mock('@aerogear/unifiedpush-admin-client', () => {
  return {
    UnifiedPushAdminClient: MockUnifiedPushAdminClient,
  };
});

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  findApplicationsMock.mockClear();
  createApplicationMock.mockClear();
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

    expect(findApplicationsMock).toHaveBeenCalledTimes(1);
    expect(findApplicationsMock.mock.calls[0][0]).toBeUndefined();
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

    expect(findApplicationsMock).toHaveBeenCalledTimes(1);
    expect(findApplicationsMock.mock.calls[0][0]).toEqual(filter);
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

    expect(createApplicationMock).toHaveBeenCalledTimes(1);
    expect(createApplicationMock.mock.calls[0][0]).toEqual('Test1');
  });
});
