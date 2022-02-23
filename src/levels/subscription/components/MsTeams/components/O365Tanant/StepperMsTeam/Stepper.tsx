import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
// Wait changed in backend
// import { useParams } from "react-router";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import LinearProgress from "@mui/material/LinearProgress";

import { TStartMsTeamModal } from "utils/types/msTeam";
import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross, Reload } from "components/Icons";
import CancelMsTeamStepper from "./CancelModal";

import { EntitlementsStyle } from "./styles";

const steps = [
  {
    label: "1 Provide credentials of tenant admin",
  },
  {
    label: "2 Initiate MS Teams tenant in our system",
  },
  {
    label: "3 Create service principal and set MS Graph gateway",
  },
  {
    label: "4 Set a domain for the tenant and validate it against Microsoft",
  },
  {
    label:
      "5 Add an e-mail service to the domain together with its related DNS entries",
  },
  {
    label:
      "6 Create a dummy account and associate an E1 / E3 / E5 license to it",
  },
  {
    label: "7 Create a SBC and remove associated license from the dummy user",
  },
];

const StepperStart: FC<TStartMsTeamModal> = ({ handleCancel }) => {
  const { t } = useTranslation();

  const [modalToOpen, setModalToOpen] = useState("");

  const classes = EntitlementsStyle();

  // Wait changed in backend
  // const { tenantID, subscriptionID } = useParams<{
  //   tenantID: string;
  //   subscriptionID: string;
  // }>();

  const {
    currentStep,
    activeStep,
    checkOnboardingData,
    checkOnboarding,
    clearOnboardingProgress,
    isError,
  } = MsTeamOnboarding;

  useEffect(
    () => {
      return () => clearOnboardingProgress();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const errorInActiveStep =
    currentStep + 1 >= steps.length
      ? steps[steps.length - 1]
      : steps[currentStep + 1];

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const handleCancelModal = () => {
    setModalToOpen("cancel");
  };

  return (
    <>
      <div className={classes.buttonCancel}>
        <ButtonWithIcon
          title={t("Cancel")}
          icon={Cross}
          onClick={handleCancelModal}
        />
      </div>

      {checkOnboardingData.length > 0 ? (
        <div className={classes.StepperWrapper}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.StepperRoot}
          >
            {steps.map(step => (
              <Step className={classes.Step} key={step.label}>
                <StepLabel className={classes.StepperLabel}>
                  <span> {step.label}</span>
                </StepLabel>
                <StepContent className={classes.StepperContent}>
                  {isError ? (
                    <div className={classes.isError}>
                      <div className={classes.isErrorNote}>
                        <span>
                          {" "}
                          {t("Setting up the")}
                          {errorInActiveStep.label.replace(/^\d+/, "")}
                          {t("failed")}.{t("You can retry setting up")}.{" "}
                        </span>
                      </div>
                      <ButtonWithIcon
                        title="Retry"
                        className={classes.buttonRetry}
                        icon={Reload}
                        onClick={() =>
                          checkOnboarding(
                            "49fed14a-549a-48c4-98dd-14efe6454503",
                            "60",
                          )
                        }
                      ></ButtonWithIcon>
                    </div>
                  ) : (
                    <>
                      <div className={classes.progressIndicate}>
                        <LinearProgress className={classes.progressIndicate} />
                      </div>
                    </>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      ) : (
        <></>
      )}

      {modalToOpen === "cancel" && (
        <CancelMsTeamStepper
          handleCloseModal={handleCloseModal}
          handleDelete={handleCancel}
        />
      )}
    </>
  );
};

export default observer(StepperStart);
