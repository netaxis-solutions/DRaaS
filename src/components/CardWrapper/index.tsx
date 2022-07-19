import { FC } from "react";
import Paper from "@mui/material/Paper";

import CardWrapperStyles from "./styles";

const CardWrapper: FC<{
  children: JSX.Element;
  width?: number;
  boxShadow?: number;
  borderRadius?: number;
  border?: string;
  padding?: string;
}> = ({ children, width, boxShadow, borderRadius, border, padding }) => {
  const classes = CardWrapperStyles({ width });

  const defaultBoxShadow = boxShadow ? boxShadow : 0;

  return (
    <Paper
      sx={{
        borderRadius: borderRadius || 3,
        border: border,
        padding: padding || "28px",
      }}
      elevation={defaultBoxShadow}
      className={classes.root}
    >
      {children}
    </Paper>
  );
};

export default CardWrapper;
