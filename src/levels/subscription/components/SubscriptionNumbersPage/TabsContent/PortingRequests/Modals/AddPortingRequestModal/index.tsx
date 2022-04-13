import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import MultiStepForm from "storage/singletons/MultiStepForm";
import PortingRequests from "storage/singletons/PortingRequests";
import { TAddTenantFormProps } from "utils/types/tenant";

import Modal from "components/Modal";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Back, Next } from "components/Icons";
import Documents from "./Steps/Documents";
import Country from "./Steps/Country";
import Details from "./Steps/Details";
import Verification from "./Steps/Verification";
import Numbers from "./Steps/Numbers";

const AddPortingRequestModal: React.FC<TAddTenantFormProps> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const {
    stepContent,
    activeStep,
    steps,
    setSteps,
    goBack,
    clearMultiStep,
    isSubmitButtonDisabled,
  } = MultiStepForm;

  const { getDefaultOperatorId, getPortingRequirements } = PortingRequests;

  useEffect(() => {
    setSteps([
      {
        title: t("Country"),
        component: <Country />,
      },
      { title: t("Your details"), component: <Details /> },
      { title: t("Numbers"), component: <Numbers /> },
      { title: t("Verification"), component: <Verification /> },
      {
        title: t("Documents"),
        component: <Documents handleCancel={handleCancel} />,
      },
    ]);
    getPortingRequirements();
    getDefaultOperatorId();
    return () => clearMultiStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevious = () => {
    goBack(handleCancel);
  };
  return (
    <>
      <Modal
        title={t("Add porting request")}
        handleCancel={handleCancel}
        steps={steps}
        activeStep={activeStep}
      >
        {stepContent}
      </Modal>
      <ModalButtonsWrapper
        cancelButton
        cancelButtonTitle={activeStep === 0 ? t("Cancel") : t("Back")}
        submitButtonTitle={
          activeStep === steps.length - 1 ? t("Add") : t("Next")
        }
        submitIcon={activeStep === steps.length - 1 ? undefined : Next}
        cancelIcon={activeStep === 0 ? undefined : Back}
        handleCancel={handlePrevious}
        top={122}
        formId={"CreatePortingRequest"}
        submitButtonDisabled={isSubmitButtonDisabled}
      />
    </>
  );
};

export default observer(AddPortingRequestModal);
