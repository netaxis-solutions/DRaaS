import { FC } from "react";
import { observer } from "mobx-react-lite";
import { Button, ButtonProps } from "@material-ui/core";
import clsx from "clsx";

import { TCardForTable } from "utils/types/components";

import useStyles from "./styles";

const CardWithButton: FC<TCardForTable & ButtonProps> = ({
  content,
  customEvent,
  buttonName,
  type = "button",
  variant = "outlined",
  icon: Icon,
  className,
  disabled,
  tooltip: Tooltip,
  withOutButton = false,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={clsx(classes.wrapper, className)}>
        <div className={classes.content}>{content}</div>
        <div
          className={clsx(classes.buttonWrapper, {
            [classes.buttonWrapperWithToolTip]: Tooltip,
          })}
        >
          {!withOutButton ? (
            <Button
              className={classes.button}
              onClick={customEvent}
              startIcon={Icon ? <Icon /> : null}
              type={type}
              variant={variant}
              disabled={disabled}
            >
              {buttonName}
            </Button>
          ) : null}
          {Tooltip ? Tooltip : null}
        </div>
      </div>
    </>
  );
};

export default observer(CardWithButton);
