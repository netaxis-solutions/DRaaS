import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { TDeleteOcNumbersModal } from "utils/types/operatorConnection";

import DeleteModal from "components/common/DeleteModal";

import useStyles from "../styles";

const DeleteResourceAccountModal: FC<TDeleteOcNumbersModal> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  selectedRows,
  data,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={
        data &&
        selectedRowsLength === 1 &&
        data.reduce((prev, cur, i) => {
          selectedRows[i] && (prev = cur.msTeams.number);
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
            {selectedRowsLength === 1 &&
              data.find((_, i) => selectedRows[i])?.msTeams.number}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this number will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
        {selectedRowsLength === 1 && (
          <div>{t("Please, type the number to delete it")}:</div>
        )}
      </div>
    </DeleteModal>
  );
};

export default DeleteResourceAccountModal;
