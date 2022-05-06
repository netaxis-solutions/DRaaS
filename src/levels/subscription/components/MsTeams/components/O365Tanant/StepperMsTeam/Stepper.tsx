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

const StepperStart: FC = () => {
  const { t } = useTranslation();

  const classes = EntitlementsStyle();

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { getCheckMsTeamAdmin } = MsTeamAdminStorage;

  const {
    activeStep,
    startOnboarding,
    clearOnboardingProgress,
    checkOnboardingData,
    isError,
    isRunning,
  } = MsTeamOnboarding;

  useEffect(
    () => {
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

  return (
    <>
      <div className={classes.StepperWrapper}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className={classes.StepperRoot}
        >
          {checkOnboardingData?.map(step => (
            <Step className={classes.Step} key={step.text}>
              <StepLabel className={classes.StepperLabel}>
                <span> {step.text}</span>
              </StepLabel>
              <StepContent className={classes.StepperContent}>
                {isError || (!isRunning && activeStep < 8) ? (
                  <div className={classes.isError}>
                    <div className={classes.isErrorNote}>
                      <span>
                        {`${t("Setting up the")} `}
                        {step.text.replace(/^\d+/, "")} {t("failed")}.
                        {t("You can retry setting up")}.
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
