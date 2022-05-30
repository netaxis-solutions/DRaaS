import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { TDeleteResourceAccountModal } from "utils/types/resourceAccount";

import DeleteModal from "components/common/DeleteModal";
import useStyles from "./styles";

const DeleteResourceAccountModal: FC<TDeleteResourceAccountModal> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  data,
  selectedRows,
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
          selectedRows[i] && (prev = cur.msTeams.displayName);
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
              data.find((_, i) => selectedRows[i])?.msTeams.displayName}
          </span>
          ?
        </div>
      </div>
    </DeleteModal>
  );
};

export default DeleteResourceAccountModal;
