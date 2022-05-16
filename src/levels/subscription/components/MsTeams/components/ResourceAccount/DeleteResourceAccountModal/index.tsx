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
  setResoureAccountCurrentId,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={
        selectedRowsLength === 1 &&
        data.reduce((prev: any, cur: any, i: any) => {
          selectedRows[i] && (prev = cur.msTeams.displayName);
          return prev && setResoureAccountCurrentId(cur.msTeams.id);
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
              data.find((_: any, i: any) => selectedRows[i])?.msTeams
                .displayName}
          </span>
          ?
        </div>
      </div>
    </DeleteModal>
  );
};

export default DeleteResourceAccountModal;
