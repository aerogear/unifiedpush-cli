// tslint:disable-next-line:variable-name
export const MockedVariantHandler = {
  handle: jest.fn((argv, def) => {
    return {
      name: def.name,
      variantID: 'VAR-ID',
      type: def.type,
    };
  }),
};

const getHandler = jest.fn().mockReturnValue(MockedVariantHandler);
const handleMock = jest.fn().mockReturnValue({
  name: 'TEST',
  variantID: 'VAR-ID',
  type: 'android',
});

// tslint:disable-next-line:variable-name
export const MockedVariantHandlerFactory = {
  getHandler: jest.fn().mockReturnValue(MockedVariantHandler),
  initMock: () => {},
  clearMock: () => {
    handleMock.mockClear();
    getHandler.mockClear();
  },
};

jest.mock('../../src/cmds/variants-cmds/handlers', () => ({
  VariantHandlerFactory: MockedVariantHandlerFactory,
}));
