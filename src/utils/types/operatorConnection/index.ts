import { TDeleteModalProps } from "../modal";

export type IStartOnboardingProccessData = {
  [key: string]: string;
};

export type IStartOnboardingProccess = {
  email?: string;
  msTenantId?: string;
  companyName?: string;
};

export type IOperatorConnectionStrings = keyof IStartOnboardingProccess;

export type IDeleteNumbers = {
  countryCode: string;
  nsn: string | number;
};

export type IOcNumbersDraas = {
  connectionId: number;
  countryCode: number;
  fullNumber: string;
  id: number;
  nsn: string;
};

export type IOcNumbersMsTeams = {
  batch: string;
  country: string;
  number: string;
  provisionedOnMSTeams: boolean;
  uploadedOn: string;
  usage: string;
};

export type IOcNumbers = {
  draas?: IOcNumbersDraas;
  msTeams: IOcNumbersMsTeams;
};

export type TDeleteOcNumbersModal = TDeleteModalProps & {
  data: IOcNumbers[];
};

export type IUsages = {
  addressRequired: boolean;
  allowedNumberTypes: Array<string>;
  capabilities: Array<string>;
  description: string;
  id: string;
  serviceType: string;
};

type ICivicAddressesLocations = {
  default: boolean;
  description?: string;
  id: string;
};

export type ICivicAddresses = {
  city: string;
  companyName: string;
  country: string;
  description: string;
  id: string;
  locations: ICivicAddressesLocations[];
  number: string;
  postalCode: string;
  state: string;
  street: string;
};

export type NumberRangeArray = {
  startRange: string;
  endRange: string;
  range: Array<string>;
};
