export type IAdminsData = {
  email: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  username: string;
  id: number;
  admin_of: IAdminsOfData[];
};

export type IAdminsOfData = {
  level: string;
  reference: string;
  obj: IAdminsNameData;
};

export type IAdminsNameData = {
  id: number;
  name: string;
};

export type IAdminsCreate = {
  adminEmail?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  entity?: { label: string; value: string };
};

export type IAdminsCreateFormatter = {
  adminEmail?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  entity?: string;
};
