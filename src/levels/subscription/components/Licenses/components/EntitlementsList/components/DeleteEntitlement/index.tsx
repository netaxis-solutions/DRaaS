import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { TDeleteEntitlementModalProps } from "utils/types/entitlements";

import DeleteModal from "components/common/DeleteModal";
import useStyles from "./styles";

const DeleteTenantModal: FC<TDeleteEntitlementModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  entitlement,
  selectedRows,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const filteredData = entitlement.filter((el: any) => el.assigned === 0);
  const disabledData = entitlement.filter((el: any) => el.assigned > 0);

  console.log("disabledData", disabledData);

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={
        selectedRowsLength === 1 &&
        filteredData?.reduce((prev: any, cur: any, i: any) => {
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
              ? filteredData?.find((_: any, i: any) => selectedRows[i])?.name
              : `${selectedRowsLength} ${t("entitlements")}`}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this entitlement will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
        {selectedRowsLength === 1 && (
          <div>
            {t("Please, type the name of the entitlement to delete it")}:
          </div>
        )}
      </div>
    </DeleteModal>
  );
};

export default DeleteTenantModal;
