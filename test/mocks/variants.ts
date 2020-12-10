import {DataStore} from './DataStore';
import * as nock from 'nock';
import {
  VariantDefinition,
  VariantType,
} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {PushApplication, Variant} from '@aerogear/unifiedpush-admin-client';
import {VARIANTS} from './constants';

export class VariantsMock {
  private readonly datastore;
  private readonly app: PushApplication;
  constructor(datastore: DataStore, app: PushApplication) {
    this.datastore = datastore;
    this.app = app;
    VARIANTS.forEach(varType =>
      this.setUpCreateVariantMock(app.pushApplicationID, varType)
    );
  }

  public readonly createVariant = (
    variantName: string,
    variantType: string
  ): Variant => {
    const variant = this.datastore.createVariant(this.app.pushApplicationID, {
      name: variantName,
      type: variantType as VariantType,
    });
    this.setupDeleteVariantMock(variant);
    this.setupGetVariantMock(variant.variantID, variantType);
    return variant;
  };

  private readonly setupGetVariantMock = (id: string, variantType: string) => {
    nock('http://localhost:9999')
      .get(
        `/rest/applications/${this.app.pushApplicationID}/${variantType}/${id}`
      )
      .reply(() => {
        const app = this.datastore.getApp(this.app.pushApplicationID);
        const variant = app?.variants?.find(
          vv => vv.variantID === id && vv.type === variantType
        );
        if (!app || !variant) {
          return [404];
        }

        return [204, variant];
      });
  };

  private readonly setupDeleteVariantMock = (v: Variant) => {
    nock('http://localhost:9999')
      .delete(
        `/rest/applications/${this.app.pushApplicationID}/${v.type}/${v.variantID}`
      )
      .reply(() => {
        const app = this.datastore.getApp(this.app.pushApplicationID);
        const variant = app?.variants?.find(
          vv => vv.variantID === v.variantID && vv.type === v.type
        );
        if (!app || !variant) {
          return [404];
        }

        app.variants = app.variants!.filter(
          vv => vv.variantID !== v.variantID || vv.type !== v.type
        );
        return [204];
      });
  };

  private readonly setUpCreateVariantMock = (
    appId: string,
    variantType: string
  ): void => {
    nock('http://localhost:9999')
      .post(`/rest/applications/${appId}/${variantType}`)
      .reply((url, body) => {
        const def = body as VariantDefinition;
        if (!VARIANTS.find(t => t === variantType)) {
          return [400];
        }

        const app = this.datastore
          .getAllApps()
          .find(pushApp => pushApp.pushApplicationID === appId);

        if (!app) {
          return [404];
        }

        const variant = this.datastore.createVariant(app.pushApplicationID, {
          type: variantType as VariantType,
          ...def,
        });
        app.variants = app.variants || [];
        app.variants.push(variant);
        return [200, variant];
      });
  };
}
