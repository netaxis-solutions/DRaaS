import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import MultiStepForm from "storage/singletons/MultiStepForm";

import Modal from "components/Modal";
import { AddDistributorFormPropsType } from "utils/types/distributor";
import CreateDistributor from "./Steps/CreateDistributor";
import AddAdmin from "./Steps/AddAdmin";

const AddDistributor: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const {
    stepContent: StepContent,
    activeStep,
    setSteps,
    steps,
  } = MultiStepForm;

  useEffect(() => {
    setSteps([
      {
        title: t("Add distributor"),
        component: <CreateDistributor handleCancel={handleCancel} />,
      },
      {
        title: t("Add admin"),
        isOptional: true,
        component: <AddAdmin handleCancel={handleCancel} />,
      },
    ]);
  }, [setSteps, handleCancel, t]);

  return (
    <Modal
      title={t("Add distributor")}
      handleCancel={handleCancel}
      activeStep={activeStep}
      steps={steps}
    >
      {StepContent}
    </Modal>
  );
};

export default observer(AddDistributor);
