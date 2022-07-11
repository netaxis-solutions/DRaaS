export type TCreateDistributor = {
  payload: {
    name: string;
    billingId?: string;
    markup?: number;
  };
  callback?: () => void;
};

export type TDeleteDistributor = {
  uuid: string;
  callback?: () => void;
};

export type AddDistributorFormPropsType = {
  handleCancel: () => void;
};

export type SpecificDistributorType = {
  uuid: string;
  name: string;
  billingId: string;
  markups?: Array<{ markup: number; startDate: string }>;
  status?: string;
  nbOfDirectTenants: number;
  nbOfResellers: number;
};
