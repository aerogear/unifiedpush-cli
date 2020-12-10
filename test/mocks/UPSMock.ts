import * as nock from 'nock';
import {DataStore} from './DataStore';
import {ApplicationsMock} from './applications';
import {VARIANTS} from './constants';

const datastore = new DataStore();
let applicationMocks: ApplicationsMock | undefined = undefined;

export const initMockEngine = () => {
  datastore.reset();
  nock.cleanAll();
  applicationMocks = new ApplicationsMock(datastore);
};

// applications mocks
export const createApplication = (name: string) =>
  applicationMocks!.createApplication(datastore, name);

export const getAllApplications = () => datastore.getAllApps();

// variants mocks
export const createVariant = (
  appId: string,
  name: string,
  variantType: string
) => applicationMocks!.createVariant(appId, name, variantType);

export const deleteApplication = (id: string) =>
  datastore.deleteApplication(id);

interface CreateAppParams {
  appCount?: number;
  variantCount?: number;
  appNamePrefix?: string;
  variantNamePrefix?: string;
  variantType?: string;
  minVariantCount?: number;
}

export const createApplications = ({
  appCount = 10,
  variantCount = -1,
  appNamePrefix = 'APP-',
  variantNamePrefix = 'VAR-',
  variantType = undefined,
  minVariantCount = 3,
}: CreateAppParams) => {
  const randomVariantType = () => {
    return VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  };

  for (let i = 0; i < appCount; i++) {
    const app = createApplication(`${appNamePrefix}${i}`);
    for (
      let j = 0;
      j <
      (variantCount !== -1
        ? variantCount
        : Math.floor(Math.random() * 20 + minVariantCount));
      j++
    ) {
      createVariant(
        app.pushApplicationID,
        `${variantNamePrefix}${j}`,
        variantType ?? randomVariantType()
      );
    }
  }
};
