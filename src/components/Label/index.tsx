import { FC } from "react";
import clsx from "clsx";

import useStyles from "./styles";

const Label: FC<{
  labelText: string;
  customLabelStyles?: string;
  status?: "active" | "preActive";
}> = ({ labelText, customLabelStyles, status }) => {
  const classes = useStyles();
  return (
    <div
      className={clsx([classes.label], {
        [classes.active]: status === "active",
        [classes.preActive]: status === "preActive",
        [customLabelStyles!]: customLabelStyles,
      })}
    >
      {labelText}
    </div>
  );
};

export default Label;
