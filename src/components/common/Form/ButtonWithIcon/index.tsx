import { Button } from "@material-ui/core";

import { IconWithButtonPropsType } from "utils/types/form";

import useStyles from "./styles";

const ButtonWithIcon: React.FC<IconWithButtonPropsType> = ({
  icon: Icon,
  title,
  type = "button",
  variant = "outlined",
  className,
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
      className={className}
    >
      {title}
    </Button>
  );
};

export default ButtonWithIcon;
