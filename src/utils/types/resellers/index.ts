export type ResellerItemType = {
  [key: string]: string | number;
};

export type ResellersDataType = {
  resellers: Array<ResellerItemType>;
  page: number;
  pages: number;
  results: number;
};

export type TAddResellerValues = {
  name: string;
  billingId: string;
  distributor: {
    label: string;
    value: string;
  };
  markup: string;
};

export type TCreateResellerPayload = {
  name: string;
  owner: {
    type: string;
    id: string;
  };
  billingId: string;
  markup: number;
};
