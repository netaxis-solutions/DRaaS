import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import DeleteModal from "components/common/DeleteModal";
import { TDeleteSubscriptionsModalProps } from "utils/types/subscriptions";
import useStyles from "./styles";

const DeleteTenantSubscriptionsModal: FC<TDeleteSubscriptionsModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  subscriptions,
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
        subscriptions.reduce((prev, cur, i) => {
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
              ? subscriptions.find((_, i) => selectedRows[i])?.name
              : `${selectedRowsLength} ${t("subscriptions")}`}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this subscription will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
        {selectedRowsLength === 1 && (
          <div>
            {t("Please, type the name of the subscription to delete it")}:
          </div>
        )}
      </div>
    </DeleteModal>
  );
};

export default DeleteTenantSubscriptionsModal;
