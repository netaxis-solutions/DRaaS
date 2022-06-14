// NOTE: This file wait for future implementation
import { FC } from "react";

import { IAdminsData } from "utils/types/admins";

const EditAdmins: FC<{
  originalAdminValue: IAdminsData;
  formId: string;
  handleCancel: () => void;
}> =
  // @ts-ignore
  // Wait for implement backend
  ({ originalAdminValue, formId, handleCancel }) => {
    return <></>;
  };

export default EditAdmins;
