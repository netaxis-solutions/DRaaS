export type TCreateDistributor = {
  payload: {
    name: string;
    billingId?: string;
    markup?: number;
  };
  callback?: () => void;
};

export type AddDistributorFormPropsType = {
  handleCancel: () => void;
};
