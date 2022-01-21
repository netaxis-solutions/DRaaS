export type EntitlementsListType = {
  country_code: string;
  entitlement: number;
  id: number;
  license_model_id: number;
  name: string;
  numberType: string;
  regions: [];
  serviceCapabilities: string;
  vanityType: string;
  assigned?: string;
  reserved?: string;
  disconnected?: string;
  entitlementType?: number;
};

export type EntitlementsTypeListType = {
  country_code: string;
  id: number;
  name: string;
  numberType: string;
  createdOn?: string;
  updatedOn?: string;
  description: "";
  serviceCapabilities: string;
  vanityType: string;
  externalReference?: string;
};

export type CreateNewEntitlement = {
  externalReference?: string;
  licenseModelId: number;
  entitlement?: number;
};

export type EntitlementData = {
  entitlements: EntitlementsListType[];
};

export type TAddEntitlementFormProps = {
  handleCancel: () => void;
};
