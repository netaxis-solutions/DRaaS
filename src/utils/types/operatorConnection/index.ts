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
