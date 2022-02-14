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
