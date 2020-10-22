import {Variant} from '@aerogear/unifiedpush-admin-client';
import {VariantFilter} from '@aerogear/unifiedpush-admin-client/dist/src/commands/variants/Variant';
import {utils} from '../../../../utils/Utils';
import {mockData} from '../../../../mockData';

// export const findVariantsMock = jest.fn(
//   (appId: string, filter?: Record<string, string>): Variant[] =>
//     utils.applyVariantFilter(
//       mockData.find(app => app.pushApplicationID === appId)!.variants!,
//       filter
//     ) || []
// );

export const findVariantsMock = jest.fn(
  (pushVariantArray: Variant[], filter: VariantFilter | undefined): {} => ({
    list: utils.applyVariantFilter(pushVariantArray, filter),
  })
);
