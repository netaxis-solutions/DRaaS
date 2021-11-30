import { FC } from "react";
import DeleteModal from "components/common/DeleteModal";
import { useTranslation } from "react-i18next";
import { ResellerItemType } from "utils/types/resellers";
import useStyles from "./styles";

type TDeleteResellerModalProps = {
  handleCloseModal: () => void;
  handleDelete: () => void;
  selectedRowsLength: number;
  resellers: Array<ResellerItemType>;
  selectedRows: { [key: number]: boolean };
};

const DeleteResellerModal: FC<TDeleteResellerModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
  resellers,
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
        resellers.reduce((prev, cur, i) => {
          selectedRows[i] && (prev = cur.name);
          return prev;
        }, "")
      }
    >
      <div className={classes.text}>
        <div>
          {t(`Are you sure you want to delete`)}{" "}
          <span className={classes.boldText}>
            {selectedRowsLength === 1
              ? resellers.find((_, i) => selectedRows[i])?.name
              : `${selectedRowsLength} ${t("resellers")}`}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this reseller will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
        {selectedRowsLength === 1 && (
          <div>{t("Please, type the name of the reseller to delete it")}:</div>
        )}
      </div>
    </DeleteModal>
  );
};

export default DeleteResellerModal;
