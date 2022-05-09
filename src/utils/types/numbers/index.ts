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

export type DocumentsType = Array<{
  name: string;
  allowedFormats: Array<string>;
}>;

export type PortingRequirements = Array<{
  id: string;
  name: string;
  inputs: Array<{
    section: string;
    parameters: Array<{
      name: string;
      type: string;
      mandatory: boolean;
    }>;
  }>;
  numbering: { startsWith: string; minDigits: number; maxDigits: number };
  documents: DocumentsType;
}>;

export type RequestType = {
  id: number;
  portId: string;
  createdOn: string;
  dueDate: string;
  kind: string;
  donor: {
    id: number;
    name: string;
  };
  status: string;
  numbers: Array<string>;
  ranges: [
    {
      from: string;
      to: string;
    },
  ];
};

export type PortingRequestPayload = {
  numbers?: Array<string>;
  ranges?: Array<{
    from: string;
    to: string;
  }>;
  donorId: number;
  contactEmail: string;
  dueDate: string;
  lastName?: string;
  companyName?: string;
  houseNumber?: string;
  houseNumberExt?: string;
  zipCode?: string;
  customerId?: string;
  note?: string;
};
