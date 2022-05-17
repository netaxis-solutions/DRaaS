export type Location = {
  id: number;
  street: string;
  number: string;
  postbox?: string;
  postalCode: PostalCode;
};

export type PostalCode = {
  id: number;
  code: string;
  city: string;
  state: string;
  region?: {
    id: number;
    name: string;
  };
  country?: {
    id: number;
    name: string;
    isoCode: string;
  };
};
