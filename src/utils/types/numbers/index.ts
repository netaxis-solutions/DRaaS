import { TDeleteModalProps } from "../modal";

export type PhoneNumberType = {
  assigned: boolean;
  countryCode: string;
  fullNumber: string;
  nsn: string;
  numberType: string;
  source: string;
};

export type NumberRangesType = {
  countryCode: string;
  createdOn: string;
  id: number;
  nbAvailable: number;
  nbTotal: number;
  numberType: string;
  rangeEnd: number;
  rangeStart: number;
  region: number;
  updatedOn: string;
};

export type NumberSuggestionsType = Array<[number, number]>;

export type FormattedNumberSuggestionsType = {
  rangeStart: number;
  rangeEnd: number;
  rangeSize: number;
};

export type TDeleteAssignedNumbersModalProps = TDeleteModalProps & {
  numbers: PhoneNumberType[];
};

export type CountryCodeWithNSN = { countryCode: string; nsn: number };

export type CountryCodeWithRanges = {
  countryCode: string;
  ranges: NumberSuggestionsType;
};

export type AssignReservedPayload = {
  countryCode: string;
  numbers: Array<number>;
};

export type ReservedNumbers = {
  countryCode: string;
  id: number;
  nsn: string;
  numberType: string;
  region: string;
  state: string;
  stateUpdatedOn: string;
};
