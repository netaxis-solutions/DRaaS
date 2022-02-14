import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import useStyles from "./styles";

import DeleteModal from "components/common/DeleteModal";
import { TDeleteAdminModalProps } from "utils/types/msTeam";

const DeleteTenantModal: FC<TDeleteAdminModalProps> = ({
  handleCloseModal,
  handleDelete,
  admin,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={false}
    >
      <div className={clsx(classes.text, classes.textWithInput)}>
        <div>
          <span className={classes.boldText}>
            {t("Are you sure you want to delete your O365 admin account")}{" "}
            <strong>{admin?.msUsername}</strong> ?{" "}
            {t(
              "When you delete it, we will not be able to make additional changes to your MS Teams phone system",
            )}{" "}
          </span>
          ?
        </div>
      </div>
    </DeleteModal>
  );
};

export default DeleteTenantModal;
