import { TDeleteModalProps } from "../modal";

export type ResellerItemType = {
  uuid: string;
  name: string;
  billingId: string;
  markup: string;
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

export type TDeleteResellerModalProps = TDeleteModalProps & {
  resellers: Array<ResellerItemType>;
};

export type TEditResellerPayload = {
  name: string;
  billingId: string;
  uuid: string;
  markup: string;
};

export type TGetResellersList = {
  id?: string;
};
