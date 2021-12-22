import { TDeleteModalProps } from "../modal";

export type TAddTenantFormProps = {
  handleCancel: () => void;
};

export type TAddTenantValues = {
  name: string;
  billingId: string;
  markup: string;
  owner: { value: string; label: string };
};

export type TCreateTenant = {
  payload: {
    name: string;
    billingId?: string;
    owner: {
      type: string;
      uuid: string;
    };
    markup?: number;
  };
  callback?: () => void;
};

export type TDeleteTenant = {
  uuid: string;
  callback?: () => void;
};

export type TenantItemType = {
  uuid: string;
  name: string;
  billingId: string;
  markup: string;
  [key: string]: string | number;
};

export type TDeleteTenantModalProps = TDeleteModalProps & {
  tenants: Array<TenantItemType>;
};

export type TEditTenantPayload = {
  name: string;
  billingId: string;
  uuid: string;
  markup: string;
};
