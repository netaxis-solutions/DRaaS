import { IconButton as IconButtonMaterialUI } from "@material-ui/core";

import { IconButtonPropsType } from "utils/types/form";

import useStyles from "./styles";

const IconButton: React.FC<IconButtonPropsType> = ({
  icon: Icon,
  disableRipple,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <IconButtonMaterialUI
      disableRipple={disableRipple}
      onClick={onClick}
      classes={classes}
    >
      <Icon />
    </IconButtonMaterialUI>
  );
};

export default IconButton;
