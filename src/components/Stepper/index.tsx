import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Check } from "components/Icons";
import { TStepperProps } from "utils/types/modal";

import useStyles from "./styles";

const Stepper: React.FC<TStepperProps> = ({ steps, activeStep }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.stepperWrapper}>
      {steps.map(({ title, isOptional }, index) => (
        <div key={index} className={classes.stepWrapper}>
          <div className={classes.stepInfoWrapper}>
            <div
              className={clsx(classes.stepIcon, {
                [classes.stepIconActive]:
                  index === activeStep || index < activeStep,
              })}
            >
              {index < activeStep && <Check />}
            </div>
            {index + 1 !== steps.length && (
              <div className={classes.stepConnector} />
            )}
          </div>
          <div
            className={clsx(classes.stepTitleWrapper, {
              [classes.notActiveStep]: index !== activeStep,
            })}
          >
            {title}
            {isOptional && (
              <p className={classes.stepperOptionalTitle}>{t("Optional")}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
