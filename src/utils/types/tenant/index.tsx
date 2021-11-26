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
