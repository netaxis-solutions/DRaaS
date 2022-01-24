import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import MultiStepForm from "storage/singletons/MultiStepForm";

import Modal from "components/Modal";
import { TAddTenantFormProps } from "utils/types/tenant";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Back, Next } from "components/Icons";
import SelectNumberEntitlement from "./Steps/SelectNumberEntitlement";
import NumberInventory from "./Steps/NumberInventory";
import RangeSettings from "./Steps/RangeSettings";
import RangeSelection from "./Steps/RangeSelection";

const SelectNumber: React.FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const { stepContent, activeStep, steps, setSteps, goBack } = MultiStepForm;

  useEffect(() => {
    setSteps([
      {
        title: "Select number entitlement",
        component: <SelectNumberEntitlement />,
      },
      { title: "Numbers inventory", component: <NumberInventory /> },
      { title: "Range settings", component: <RangeSettings /> },
      { title: "Range selection", component: <RangeSelection /> },
    ]);
  }, [setSteps, handleCancel, t]);

  const handlePrevious = () => {
    goBack(handleCancel);
  };

  return (
    <>
      <Modal
        title={t("Add numbers from inventory")}
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
        formId={"SelectFromInventory"}
      />
    </>
  );
};

export default observer(SelectNumber);
