export type TMsTeamUserLicenses = {
  skuId: string;
  skuPartNumber: string;
};

export type TMsTeamUser = {
  id: string;
  userPrincipalName: string;
  displayName: string;
  licenses: TMsTeamUserLicenses[];
  voiceEnabled: string;
};

export type TMsTeamUserDraas = {
  id: number;
  connectionId: number;
  numberId: number;
  phoneNumber: string;
  status: string;
};
export type TMsTeamUserType = {
  msTeams: TMsTeamUser;
  draas?: TMsTeamUserDraas;
};

export type TMsTeamUserList = {
  users: TMsTeamUserType[];
};

export type TDeleteAdminModalProps = {
  handleCloseModal: () => void;
  handleDelete: () => void;
  admin: any;
};

export type TCreateUpdateMsAdmin = {
  payload: {
    msUsername: string;
    msPassword: string;
    agree?: boolean;
    privacy?: boolean;
  };
};

export type TCreateMsAdmin = {
  msUsername: string;
  msPassword: string;
  agree?: boolean;
  privacy?: boolean;
};
