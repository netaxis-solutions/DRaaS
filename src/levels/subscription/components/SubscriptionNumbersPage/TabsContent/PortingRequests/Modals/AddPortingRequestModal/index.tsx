import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";

import MultiStepForm from "storage/singletons/MultiStepForm";
import PortingRequests from "storage/singletons/PortingRequests";
import { TAddTenantFormProps } from "utils/types/tenant";

import Modal from "components/Modal";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Back, Next, Cross } from "components/Icons";
import Documents from "./Steps/Documents";
import Country from "./Steps/Country";
import Details from "./Steps/Details";
import Verification from "./Steps/Verification";
import Numbers from "./Steps/Numbers";

import { modalStyles } from "./styles";

const AddPortingRequestModal: React.FC<TAddTenantFormProps> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = modalStyles();
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
    getDefaultOperatorId,
    getPortingRequirements,
    clearCurrentRequest,
  } = PortingRequests;

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
    return () => {
      clearMultiStep();
      clearCurrentRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevious = () => {
    if (activeStep < 4) {
      goBack(handleCancel);
    }
  };

  return (
    <>
      <Modal
        title={t("Add porting request")}
        handleCancel={handleCancel}
        steps={steps}
        activeStep={activeStep}
        styleWithSideBar
      >
        {stepContent}
      </Modal>
      <ModalButtonsWrapper
        cancelButton={activeStep < 4}
        cancelButtonTitle={activeStep === 0 ? t("Cancel") : t("Back")}
        submitButtonTitle={activeStep === 3 ? t("Add") : t("Next")}
        submitIcon={activeStep === 3 ? undefined : Next}
        cancelIcon={activeStep === 0 ? undefined : Back}
        handleCancel={handlePrevious}
        top={122}
        formId={"CreatePortingRequest"}
        submitButtonDisabled={isSubmitButtonDisabled}
      />
      <IconButton className={classes.closeIcon} onClick={handleCancel}>
        <Cross fontSize="small" />
      </IconButton>
    </>
  );
};

export default observer(AddPortingRequestModal);
