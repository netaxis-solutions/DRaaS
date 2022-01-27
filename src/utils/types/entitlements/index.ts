import { TDeleteModalProps } from "../modal";

export type EntitlementsListType = {
  countryCode: string;
  entitlement: number;
  id: string;
  license_model_id: number;
  name: string;
  numberType: string;
  regions: [];
  serviceCapabilities: string;
  vanityType: string;
  assigned: number;
  reserved?: number;
  disconnected?: number;
  entitlementType?: number;
};

export type EntitlementsTypeListType = {
  countryCode: string;
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

export type EditEntitlementType = {
  entitlement: string;
  entitlementID: string;
};

export type CreateNewEntitlement = {
  externalReference?: string;
  licenseModelId: number;
  entitlement?: number;
};

export type EntitlementData = {
  entitlements: EntitlementsListType[];
};

export type AvailableEntitlements = {
  [key: string]: {
    [key: string]: number;
  };
};

export type TAddEntitlementFormProps = {
  handleCancel: () => void;
};

export type TDeleteEntitlementModalProps = TDeleteModalProps & {
  entitlement: EntitlementsListType[];
};
