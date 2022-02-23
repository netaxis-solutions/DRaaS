import SvgIcon from "@material-ui/core/SvgIcon";

import useStyles from "./styles";

const CheckboxDisabledIcon = () => {
  const classes = useStyles();
  return (
    <div className={classes.iconDisabled}>
      <SvgIcon
        width="16"
        height="16"
        viewBox="0 0 16 16"
        style={{ width: 16, height: 16 }}
      >
        <rect width="16" height="16" fill="white" stroke="#D9DDE0" />
      </SvgIcon>
    </div>
  );
};

export default CheckboxDisabledIcon;
