import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import DeleteModal from "components/common/DeleteModal";
import useStyles from "./styles";
import { TDeleteTenantModalProps } from "utils/types/tenant";

const DeleteTenantModal: FC<TDeleteTenantModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  tenants,
  selectedRows,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={
        selectedRowsLength === 1 &&
        tenants.reduce((prev, cur, i) => {
          selectedRows[i] && (prev = cur.name);
          return prev;
        }, "")
      }
    >
      <div
        className={clsx(classes.text, {
          [classes.textWithInput]: selectedRowsLength === 1,
        })}
      >
        <div>
          {t(`Are you sure you want to delete`)}{" "}
          <span className={classes.boldText}>
            {selectedRowsLength === 1
              ? tenants.find((_, i) => selectedRows[i])?.name
              : `${selectedRowsLength} ${t("tenants")}`}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this tenant will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
        {selectedRowsLength === 1 && (
          <div>{t("Please, type the name of the tenant to delete it")}:</div>
        )}
      </div>
    </DeleteModal>
  );
};

export default DeleteTenantModal;
