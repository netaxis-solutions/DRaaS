import { styled, Tooltip } from "@material-ui/core";
import { tooltipClasses } from "@mui/material/Tooltip";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

export default styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: { theme: ThemeDefaultOptions }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      "linear-gradient(90deg, rgba(33, 35, 86, 0.8) 21.35%, rgba(33, 35, 86, 0.6) 100%)",
    backdropFilter: "blur(42px)",
    color: theme.body.general.textStyle.white,
    width: 185,
    fontSize: 12,
    "&>.MuiTooltip-arrow::before": {
      background:
        "linear-gradient(90deg, rgba(33, 35, 86, 0.8) 21.35%, rgba(33, 35, 86, 0.6) 100%)",
    },
  },
}));
