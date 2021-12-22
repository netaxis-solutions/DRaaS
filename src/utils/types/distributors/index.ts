import { TDeleteModalProps } from "../modal";

export type DistributorItemType = {
  uuid: string;
  name: string;
  billingId: string;
  markup: string;
  [key: string]: string | number;
};

export type DistributorsDataType = {
  distributors: Array<DistributorItemType>;
  page: number;
  pages: number;
  results: number;
};

export type TAddDistributorValues = {
  name: string;
  billingId: string;
  markup: string;
};

export type TAddAdminValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: string;
  profile: string;
  password: string;
  confirmPassword: string;
  sendWelcomeEmail: boolean;
};

export type TDeleteDistributorModalProps = TDeleteModalProps & {
  distributors: Array<DistributorItemType>;
};

export type TCreateDistributorPayload = {
  name: string;
  owner: {
    type: string;
    id: string;
  };
  billingId: string;
  markup: number;
};

export type TEditDistributorPayload = {
  name: string;
  billingId: string;
  uuid: string;
  markup: string;
};
