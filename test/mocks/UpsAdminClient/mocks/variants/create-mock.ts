import {AndroidVariant, Variant} from '@aerogear/unifiedpush-admin-client';

export const createVariantsMock = (
  pushVariantArray: Variant[],
  name: string
) => ({
  execute: async (): Promise<Variant> => {
    const appId = '2:2';
    const newVariant = {
      name,
      type: 'android',
      googleKey: 'Test-Google-Key',
      projectNumber: 'Test-Project-number',
    } as AndroidVariant;
    pushVariantArray.push(newVariant);
    return newVariant;
  },
});
// export const createVariantsMock = jest.fn(
//   (appId: string, def: Record<string, string>): Variant =>
//     ({...def, variantID: 'TEST-ID', developer: 'TEST-DEVELOPER'} as Variant)
// );
