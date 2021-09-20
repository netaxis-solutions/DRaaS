import Button from "@material-ui/core/Button";

import useStyles from "./styles";

const ButtonComponent = ({
  title,
  icon: Icon,
  ...rest
}: {
  [key: string]: any;
}) => {
  const classes = useStyles();

  return (
    <Button variant="contained" classes={classes} {...rest}>
      {title}
    </Button>
  );
};

export default ButtonComponent;
