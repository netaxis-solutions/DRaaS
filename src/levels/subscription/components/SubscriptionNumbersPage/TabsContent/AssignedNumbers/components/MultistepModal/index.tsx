import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import MultiStepForm from "storage/singletons/MultiStepForm";
import TablePagination from "storage/singletons/TablePagination";

import { TAddTenantFormProps } from "utils/types/tenant";

import Modal from "components/Modal";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Back, Next } from "components/Icons";
import SelectNumberEntitlement from "./Steps/SelectNumberEntitlement";
import NumberInventory from "./Steps/NumberInventory";
import RangeSettings from "./Steps/RangeSettings";
import RangeSelection from "./Steps/RangeSelection";

import { useEntitlementCardStyles } from "./Steps/styles";

const SelectNumber: React.FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const classes = useEntitlementCardStyles();
  const {
    stepContent,
    activeStep,
    steps,
    setSteps,
    goBack,
    clearMultiStep,
    isSubmitButtonDisabled,
  } = MultiStepForm;

  const {
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    setSteps([
      {
        title: t("Select number entitlement"),
        component: <SelectNumberEntitlement />,
      },
      { title: t("Numbers inventory"), component: <NumberInventory /> },
      { title: t("Range settings"), component: <RangeSettings /> },
      {
        title: t("Range selection"),
        component: <RangeSelection handleCancel={handleCancel} />,
      },
    ]);
    return () => {
      clearMultiStep();
      clearPaginationData()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevious = () => {
    goBack(handleCancel);
  };

  const handleCalcelModal = () => {
    clearPaginationData()
    handleCancel()
  }

  return (
    <>
      <Modal
        title={t("Add numbers from inventory")}
        handleCancel={handleCalcelModal}
        steps={steps}
        activeStep={activeStep}
        className={classes.modalWrapper}
      >
        {stepContent}
      </Modal>
      <ModalButtonsWrapper
        className={classes.modalButtonWrapper}
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
        submitButtonDisabled={isSubmitButtonDisabled}
      />
    </>
  );
};

export default observer(SelectNumber);
