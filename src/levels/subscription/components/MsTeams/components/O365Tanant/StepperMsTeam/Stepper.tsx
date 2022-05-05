import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import LinearProgress from "@mui/material/LinearProgress";

import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";
import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Reload } from "components/Icons";

import { EntitlementsStyle } from "./styles";

const steps = [
  {
    label: "1 Initiate MS Teams tenant in our system",
  },
  {
    label: "2 Create service principal and set MS Graph gateway",
  },
  {
    label: "3 Set a domain for the tenant and validate it against Microsoft",
  },
  {
    label:
      "4 Add an e-mail service to the domain together with its related DNS entries",
  },
  {
    label:
      "5 Create a dummy account and associate an E1 / E3 / E5 license to it",
  },
  {
    label: "6 Create a SBC and remove associated license from the dummy user",
  },
];

const StepperStart: FC = () => {
  const { t } = useTranslation();

  const classes = EntitlementsStyle();

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { getCheckMsTeamAdmin } = MsTeamAdminStorage;

  const {
    currentStep,
    activeStep,
    checkOnboarding,
    startOnboarding,
    clearOnboardingProgress,
    isError,
    isRunning,
  } = MsTeamOnboarding;

  useEffect(
    () => {
      checkOnboarding(tenantID, subscriptionID);
      return () => {
        if (MsTeamOnboarding.activeStep >= 6 && !isRunning) {
          getCheckMsTeamAdmin(tenantID, subscriptionID);
          clearOnboardingProgress();
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const errorInActiveStep =
    currentStep + 1 >= steps.length
      ? steps[steps.length - 1]
      : steps[currentStep + 1];

  return (
    <>
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
                {isError || (!isRunning && activeStep < 8) ? (
                  <div className={classes.isError}>
                    <div className={classes.isErrorNote}>
                      <span>
                        {" "}
                        {t("Setting up the")}
                        {errorInActiveStep.label.replace(/^\d+/, "")}{" "}
                        {t("failed")}.{t("You can retry setting up")}.{" "}
                      </span>
                    </div>
                    <ButtonWithIcon
                      title={t("Retry")}
                      className={classes.buttonRetry}
                      icon={Reload}
                      onClick={() => startOnboarding(tenantID, subscriptionID)}
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
    </>
  );
};

export default observer(StepperStart);
