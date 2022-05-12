import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import MultiStepForm from "storage/singletons/MultiStepForm";

import Modal from "components/Modal";
import AddLocationContent from "./AddLocationContent";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { useEffect } from "react";
import Next from "components/Icons/Next";
import Back from "components/Icons/Back";
import SelectLocationCountry from "./SelectLocationCountry";

const AddLocation: React.FC<{ handleCancel: () => void }> = ({
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

  useEffect(() => {
    setSteps([
      {
        title: t("Location country"),
        component: <SelectLocationCountry />,
      },
      {
        title: t("Location details"),
        component: <AddLocationContent handleCancel={handleCancel} />,
      },
    ]);
    return () => clearMultiStep();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevious = () => {
    goBack(handleCancel);
  };

  const handleCancelModal = () => {
    handleCancel();
  };

  return (
    <>
      <Modal
        title={t("Add Location")}
        handleCancel={handleCancelModal}
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
        formId={"addLocation"}
        submitButtonDisabled={isSubmitButtonDisabled}
      />
    </>
  );
};

export default observer(AddLocation);
