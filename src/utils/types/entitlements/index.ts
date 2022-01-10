export type EntitlementsListType = {
  country_code: string;
  entitlement: number;
  id: number;
  license_model_id: number;
  name: string;
  number_type: string;
  regions: [];
  service_capabilities: string;
  vanity_type: null | string;
  assigned?: string;
  reserved?: string;
  disconnected?: string;
};

export type EntitlementData = {
  entitlements: EntitlementsListType[];
};
