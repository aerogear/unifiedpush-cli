const log = console.log;
const mockLog = jest.fn();

// tslint:disable-next-line:variable-name
export const ConsoleMock = {
  log: mockLog,
  init: () => {
    console.log = mockLog;
    mockLog.mockClear();
  },
  mockClear: () => mockLog.mockClear(),
  uninstall: () => (console.log = log),
};
