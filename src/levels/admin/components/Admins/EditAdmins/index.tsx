import { FC } from "react";

const EditAdmins: FC<{ originalAdminValue: any; formId: string }> = ({
  originalAdminValue,
  formId,
}) => {
  console.log("formId", formId);
  return (
    <>
      <h1>EDIT</h1>
      {originalAdminValue.first_name}
      <br />
      {originalAdminValue.email}
    </>
  );
};

export default EditAdmins;
