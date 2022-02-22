export type TMsTeamUserLicenses = {
  skuId: string;
  skuPartNumber: string;
};

export type TDeleteAdminModalProps = {
  handleCloseModal: () => void;
  handleDelete: () => void;
  admin: TMsTeamAdmins;
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

export type TMsTeamAdmins = {
  id: number | null;
  msUsername: string;
};

export type TMsTeamCheck = {
  msTenantId: string;
  status: string;
  powershell: {
    msUserName: string;
    active: boolean;
  };
  msGraph: {
    msApplicationId: string;
    active: boolean;
  };
  domain: {
    name: string;
    verified: boolean;
  };
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

export type TMsTeamAdmins = {
  id: number | null;
  msUsername: string;
};

export type TMsTeamCheck = {
  msTenantId: string;
  status: string;
  powershell: {
    msUserName: string;
    active: boolean;
  };
  msGraph: {
    msApplicationId: string;
    active: boolean;
  };
  domain: {
    name: string;
    verified: boolean;
  };
};

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

export type TStartMsTeamModal = {
  handleCancel: () => void;
};

export type TMsTeamOnboardingSteps = {
  step: number;
  text: string;
  executed: boolean;
};

export type TMsTeamOnboarding = {
  running: boolean;
  wizardSteps: TMsTeamOnboardingSteps[];
};
