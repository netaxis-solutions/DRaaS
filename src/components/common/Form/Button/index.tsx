import Button from "@material-ui/core/Button";
import { ButtonPropsType } from "utils/types/form";

import useStyles from "./styles";

const ButtonComponent: React.FC<ButtonPropsType> = ({ title, ...rest }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" classes={classes} {...rest}>
      {title}
    </Button>
  );
};

export default ButtonComponent;
