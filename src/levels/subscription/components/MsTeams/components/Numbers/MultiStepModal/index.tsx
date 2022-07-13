import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";

import TablePagination from "storage/singletons/TablePagination";
import MultiStepForm from "storage/singletons/MultiStepForm";
import PendingQueries from "storage/singletons/PendingQueries";
import CloudConnection from "storage/singletons/CloudConnection";

import { TAddTenantFormProps } from "utils/types/tenant";
import { getIsLoading } from "utils/functions/getIsLoading";

import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import Modal from "components/Modal";
import SelectAnUsage from "./SelectAnUsage";
import SelectAnAdress from "./SelectAnAddress";
import SelectNumbers from "./SelectNumbers";

import useStyles from "../styles";

const AddNewOCNumber: FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();

  const { clearPaginationData } = TablePagination;
  const { byFetchType } = PendingQueries;

  const {
    stepContent,
    activeStep,
    steps,
    setSteps,
    goBack,
    clearMultiStep,
  } = MultiStepForm;

  const classes = useStyles();

  useEffect(() => {
    setSteps([
      {
        title: t("Select an usage"),
        component: <SelectAnUsage />,
      },
      { title: t("Select an address"), component: <SelectAnAdress /> },
      {
        title: t("Select numbers"),
        component: <SelectNumbers handleCancel={handleCancel} />,
      },
    ]);
    return () => {
      clearMultiStep();
      clearPaginationData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelModal = () => {
    clearPaginationData();
    handleCancel();
  };

  const handlePrevious = () => {
    goBack(handleCancel);
  };

  const isDisabledSubmitButton =
    getIsLoading("@getCivicAddresses", byFetchType) ||
    getIsLoading("@getAllowUsages", byFetchType) ||
    getIsLoading("@addNumbersOperatorConnect", byFetchType) ||
    (activeStep === 2 && CloudConnection.checkedLength > 10) ||
    (activeStep === 2 && CloudConnection.checkedLength === 0);

  return (
    <>
      <Modal
        title={t("Add numbers")}
        handleCancel={handleCancelModal}
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
        handleCancel={handlePrevious}
        top={122}
        formId={"CreateNumbers"}
        submitButtonDisabled={isDisabledSubmitButton}
      />
    </>
  );
};

export default observer(AddNewOCNumber);
