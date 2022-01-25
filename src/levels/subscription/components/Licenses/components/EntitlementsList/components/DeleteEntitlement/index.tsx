import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import DeleteModal from "components/common/DeleteModal";
import useStyles from "./styles";

import { TDeleteEntitlementModalProps } from "utils/types/entitlements";

const DeleteTenantModal: FC<TDeleteEntitlementModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  entitlement,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal handleCancel={handleCloseModal} handleDelete={handleDelete}>
      <div
        className={clsx(classes.text, {
          [classes.textWithInput]: selectedRowsLength === 1,
        })}
      >
        <div>
          {t(`Are you sure you want to delete`)}{" "}
          <span className={classes.boldText}>{entitlement.name}</span>?
        </div>
        <div>
          {t("All the information under this entitlement will be deleted", {})}.
        </div>
      </div>
    </DeleteModal>
  );
};

export default DeleteTenantModal;
