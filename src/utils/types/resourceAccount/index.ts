import { TDeleteModalProps } from "../modal";

export type TCreateResourceAccount = {
  accountType: { label: string; value: string };
  displayName: string;
  location: string;
  phoneNumber: string;
  userPrincipalName: string;
  validDomains: { label: string; value: string };
};

export type TCreateResourceAccountPayloadStorage = {
  accountType: string;
  displayName: string;
  location: string;
  phoneNumber?: string;
  userPrincipalName: string;
};

export type TValidDomains = {
  verifiedDomains: Array<string>;
};

export type TResourceAccountLicenses = {
  skuId: string;
  skuPartNumber: string;
};

export type TResourceAccountDataDraas = {
  connectionId: number;
  id: number;
  numberId: number;
  phoneNumber: string;
  status: string;
};

export type TResourceAccountDataMsTeams = {
  accountType: string;
  displayName: string;
  id: string;
  licenses: TResourceAccountLicenses[];
  location: string;
  phoneNumber: string;
  userPrincipalName: string;
};
export type TResourceAccountData = {
  draas: TResourceAccountDataDraas;
  msTeams: TResourceAccountDataMsTeams;
};

export type TCountryCode = {
  label: string;
  value: string;
};

export type TModifyResourceAccount = {
  accountType: string;
  displayName: string;
  location: string;
  phoneNumber?: string | null;
};

export type TDeleteResourceAccountModal = TDeleteModalProps & {
  data: TResourceAccountData[];
  setResoureAccountCurrentId: (id: string) => void;
};

export type TCountryCodesItem = {
  code: string;
  createdOn: string;
  id: number;
  isoCode: string;
  name: string;
  updatedOn: string;
};

export type TCountryCodes = {
  countryCodes: TCountryCodesItem[];
};
