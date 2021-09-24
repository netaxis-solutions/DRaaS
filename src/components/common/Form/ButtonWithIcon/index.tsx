import { Button } from "@material-ui/core";

import { IconButtonPropsType } from "utils/types/form";

import useStyles from "./styles";

const ButtonWithIcon: React.FC<IconButtonPropsType> = ({
  icon: Icon,
  title,
  variant = "outlined",
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button startIcon={<Icon />} {...props} variant={variant} classes={classes}>
      {title}
    </Button>
  );
};

export default ButtonWithIcon;
