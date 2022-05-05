import { FC } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { TDeleteModalProps } from "utils/types/modal";
import DeleteModal from "components/common/DeleteModal";
import useStyles from "./styles";

const DeleteLocationModal: FC<TDeleteModalProps> = ({
  handleCloseModal,
  handleDelete,
  selectedRowsLength,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal handleCancel={handleCloseModal} handleDelete={handleDelete}>
      <div className={clsx(classes.text)}>
        <div>
          {t(`Are you sure you want to delete`)}{" "}
          <span className={classes.boldText}>
            {`${selectedRowsLength} ${t("locations")}`}
          </span>
          ?
        </div>
        <div>
          {t("All the information under this location will be deleted", {
            count: selectedRowsLength,
          })}
          .
        </div>
      </div>
    </DeleteModal>
  );
};

export default DeleteLocationModal;
