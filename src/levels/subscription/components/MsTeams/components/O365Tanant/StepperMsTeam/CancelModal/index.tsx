import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Check } from "components/Icons";
import DeleteModal from "components/common/DeleteModal";

import useStyles from "./styles";

export type TCancelMsModal = {
  handleCloseModal: () => void;
  handleDelete: () => void;
};

const CancelMsTeamStepper: FC<TCancelMsModal> = ({
  handleCloseModal,
  handleDelete,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <DeleteModal
      handleCancel={handleCloseModal}
      handleDelete={handleDelete}
      selectedElementName={false}
      deleteIcon={Check}
      deleteTitle={t("Yes, cancel")}
      cancelTitle={t("No, continue")}
    >
      <div className={classes.text}>
        <div>{t(`Are you sure you want to cancel the setup process?`)} </div>
      </div>
    </DeleteModal>
  );
};

export default CancelMsTeamStepper;
