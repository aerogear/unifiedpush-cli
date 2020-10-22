import {
  PushApplication,
  PushApplicationFilter,
  Variant,
} from '@aerogear/unifiedpush-admin-client';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';

export const utils = {
  applyPushApplicationFilter: (
    apps: PushApplication[],
    filter?: PushApplicationFilter
  ): PushApplication[] => {
    if (filter) {
      return apps.filter(
        app =>
          (!filter.name || filter.name === app.name) &&
          (!filter.description || filter.description === app.description) &&
          (!filter.pushApplicationID ||
            filter.pushApplicationID === app.pushApplicationID) &&
          (!filter.developer || filter.developer === app.developer)
      );
    }
    return apps;
  },

  applyVariantFilter: (
    variants: Variant[],
    filter?: VariantFilter
  ): Variant[] => {
    if (filter) {
      return variants.filter(
        variant =>
          (!filter.name || filter.name === variant.name) &&
          (!filter.description || filter.description === variant.description) &&
          (!filter.variantID || filter.variantID === variant.variantID) &&
          (!filter.developer || filter.developer === variant.developer) &&
          (!filter.type || filter.type === variant.type)
      );
    }
    return variants;
  },
};
