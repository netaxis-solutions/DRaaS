import { IconButtonPropsType, IconWithButtonPropsType } from "utils/types/form";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { ArrowLeft, Plus } from "components/Icons";
import IconButton from "components/common/Form/IconButton";
import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default {
  title: "Buttons",
};

const defaultStyles = { margin: 20 };

export const ButtonWithIconStory = (props: IconWithButtonPropsType) => {
  return (
    <div style={defaultStyles}>
      <ButtonWithIcon {...props} />
    </div>
  );
};

ButtonWithIconStory.args = {
  title: "Add",
  variant: "contained",
  icon: Plus,
};

ButtonWithIconStory.argTypes = {
  variant: {
    control: {
      type: "select",
      options: ["outlined", "contained"],
    },
  },
};

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    ...defaultStyles,
    "& svg": {
      width: 7,
      fill: theme.palette.primary.main,
      height: 12,
    },
  },
}));

export const IconButtonStory = (props: IconButtonPropsType) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton {...props} />
    </div>
  );
};

IconButtonStory.args = {
  disableRipple: true,
  icon: ArrowLeft,
};
