import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { TDeleteDistributorModalProps } from "utils/types/distributors";
import DeleteModal from "components/common/DeleteModal";
import useStyles from "./styles";

const DeleteDistributorModal: FC<TDeleteDistributorModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  distributors,
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
        distributors.reduce((prev, cur, i) => {
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
              ? distributors.find((_, i) => selectedRows[i])?.name
              : `${selectedRowsLength} ${t("distributors")}`}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this distributor will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
        {selectedRowsLength === 1 && (
          <div>
            {t("Please, type the name of the distributor to delete it")}:
          </div>
        )}
      </div>
    </DeleteModal>
  );
};

export default DeleteDistributorModal;
