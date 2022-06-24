import { makeStyles } from "@material-ui/core";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const CardWrapperStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    padding: theme.spacing(3),
    width: (props: { width?: number }) => props.width || 500,
    border: `1px solid ${theme.body.newCardWrapper.border}`,
    background: `${theme.body.newCardWrapper.background} !important`,
  },
}));

export default CardWrapperStyles;
