import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import {
  PhoneNumberType,
  TDeleteAssignedNumbersModalProps,
} from "utils/types/numbers";

import DeleteModal from "components/common/DeleteModal";

import useStyles from "./styles";

const DeleteNumberModal: FC<TDeleteAssignedNumbersModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  selectedRows,
  numbers,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={
        selectedRowsLength === 1 &&
        numbers.reduce((prev: string, cur: PhoneNumberType, i: number) => {
          selectedRows[i] && (prev = cur.nsn);
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
              ? numbers.find((_: any, i: number) => selectedRows[i])!.nsn
              : `${selectedRowsLength} ${t("numbers")}`}
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

export default DeleteNumberModal;
