import { FC } from "react";
import { useTranslation } from "react-i18next";

import { TStartMsTeamModal } from "utils/types/msTeam";

import Modal from "components/Modal";
import StepperStart from "./Stepper";

const StepperMsTeam: FC<TStartMsTeamModal> = ({ handleCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("Link MS Teams to the platform")}
      handleCancel={handleCancel}
      styleWithSideBar
    >
      <StepperStart handleCancel={handleCancel} />
    </Modal>
  );
};

export default StepperMsTeam;
