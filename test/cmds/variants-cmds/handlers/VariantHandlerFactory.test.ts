import { VariantHandlerFactory } from '../../../../src/cmds/variants-cmds/handlers';
import { AndroidVariantHandler } from '../../../../src/cmds/variants-cmds/handlers/AndroidVariantHandler';
import { IOSCertVariantHandler } from '../../../../src/cmds/variants-cmds/handlers/iOSCertVariantHandler';
import { IOSTokenVariantHandler } from '../../../../src/cmds/variants-cmds/handlers/iOSTokenVariantHandler';
import { WebPushVariantHandler } from '../../../../src/cmds/variants-cmds/handlers/WebPushVariantHandler';

describe('Variant Handler Factory', () => {
  it('Should return an AndroidVariantHandler', () => {
    expect(VariantHandlerFactory.getHandler('android')).toBeInstanceOf(AndroidVariantHandler);
  });
  it('Should return an IOSCertVariantHandler', () => {
    expect(VariantHandlerFactory.getHandler('ios')).toBeInstanceOf(IOSCertVariantHandler);
  });

  it('Should return an IOSTokenVariantHandler', () => {
    expect(VariantHandlerFactory.getHandler('ios_token')).toBeInstanceOf(IOSTokenVariantHandler);
  });

  it('Should return an WebPushVariantHandler', () => {
    expect(VariantHandlerFactory.getHandler('web_push')).toBeInstanceOf(WebPushVariantHandler);
  });

  it('Should throw an error', () => {
    expect(() => VariantHandlerFactory.getHandler('bad_variant')).toThrowError("Unknown variant type 'bad_variant'");
  });
});
