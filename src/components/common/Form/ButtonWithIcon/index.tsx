import { Button, ButtonProps } from "@material-ui/core";

import { IconWithButtonPropsType } from "utils/types/form";

import useStyles from "./styles";
import clsx from "clsx";

const ButtonWithIcon: React.FC<IconWithButtonPropsType & ButtonProps> = ({
  icon: Icon,
  title,
  type = "button",
  variant = "outlined",
  className,
  cancel = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      startIcon={<Icon />}
      {...props}
      variant={variant}
      classes={classes}
      type={type}
      className={clsx(className, { [classes.cancelButton]: cancel })}
    >
      {title}
    </Button>
  );
};

export default ButtonWithIcon;
