import { VariantHandler } from './VariantHandler';
import { WebPushVariantHandler } from './WebPushVariantHandler';
import { AndroidVariantHandler } from './AndroidVariantHandler';
import { IOSTokenVariantHandler } from './iOSTokenVariantHandler';
import { IOSCertVariantHandler } from './iOSCertVariantHandler';

export abstract class VariantHandlerFactory {
  static getInquirer(type: string): VariantHandler {
    switch (type) {
      case 'web_push':
        return new WebPushVariantHandler();
      case 'android':
        return new AndroidVariantHandler();
      case 'ios_token':
        return new IOSTokenVariantHandler();
      case 'ios':
        return new IOSCertVariantHandler();
      default:
        throw new Error(`Unknown variant type '${type}'`);
    }
  }
}
