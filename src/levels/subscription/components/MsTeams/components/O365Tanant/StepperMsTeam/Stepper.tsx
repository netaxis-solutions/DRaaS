import { FC, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { observer } from "mobx-react-lite";
import LinearProgress from "@mui/material/LinearProgress";

import { TStartMsTeamModal } from "utils/types/msTeam";
import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross } from "components/Icons";

import { EntitlementsStyle } from "./styles";

const StepperStart: FC<TStartMsTeamModal> = ({ handleCancel }) => {
  const classes = EntitlementsStyle();

  const {
    checkOnboardingData,
    checkOnboarding,
    isRunning,
    clearStorage,
  } = MsTeamOnboarding;

  useEffect(() => {
    const checkingSteps = setInterval(() => {
      checkOnboarding("49fed14a-549a-48c4-98dd-14efe6454503", "60");
    }, 15000);

    !isRunning && clearInterval(checkingSteps);
    return () => {
      clearStorage();
      clearInterval(checkingSteps);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentStep =
    (checkOnboardingData &&
      [...checkOnboardingData]?.reverse().find(curr => curr.executed)?.step) ||
    0;

  const steps = [
    {
      label: "1 Provide credentials of tenant admin",
      description: `Provide credentials of tenant admin.`,
    },
    {
      label: "2 Initiate MS Teams tenant in our system",
      description: `API is adding new subdomain to your tenant. Normally it takes 2 minutes.`,
    },
    {
      label: "3 Create service principal and set MS Graph gateway",
      description: `Microsoft is  in process of verifying your domain. Normally it takes 30 minutes.`,
    },
    {
      label: "4 Set a domain for the tenant and validate it against Microsoft",
      description: `Our backend is creating a temporary teams user and assigning it to new subdomain. It can take around 5 minutes.`,
    },
    {
      label:
        "5 Add an e-mail service to the domain together with its related DNS entries",
      description: `User is created. Waiting until Microsoft activates the domain. It can take up to 24 hours.`,
    },
    {
      label:
        "6 Create a dummy account and associate an E1 / E3 / E5 license to it",
      description: `Voice routing is setting up. It can take up to 30 seconds.`,
    },
    {
      label: "7 Create a SBC and remove associated license from the dummy user",
      description: `Voice routing is setting up. It can take up to 30 seconds.`,
    },
  ];

  const activeStep =
    currentStep !== 4 && isRunning
      ? currentStep + 1
      : !isRunning
      ? currentStep + 5
      : currentStep + 1;

  return (
    <>
      <div className={classes.buttonCancel}>
        <ButtonWithIcon title="Cancel" icon={Cross} onClick={handleCancel} />
      </div>
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
                <span>{step.description}</span>
                <div className={classes.progressIndicate}>
                  <LinearProgress className={classes.progressIndicate} />
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
};

export default observer(StepperStart);
