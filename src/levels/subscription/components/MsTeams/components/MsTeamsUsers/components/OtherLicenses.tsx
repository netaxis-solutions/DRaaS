import { FC, useState } from "react";
import IconButton from "@material-ui/core/IconButton";

import { EyeClosed, EyeOpened, Minus } from "components/Icons";

import useStyles from "../styles";

const OtherLicenses: FC<{
  licenses: Array<{
    skuId: string;
    skuPartNumber: string;
  }>;
}> = ({ licenses }) => {
  const classes = useStyles();
  const [isShown, setShown] = useState(false);
  const toggleShow = () => {
    setShown(!isShown);
  };
  return (
    <div className={classes.licenses}>
      {licenses ? (
        <>
          <IconButton
            disableRipple
            onClick={toggleShow}
            className={classes.button}
          >
            {isShown ? <EyeOpened /> : <EyeClosed />}
          </IconButton>
          {isShown && (
            <span className={classes.width100}>
              {licenses.map((license, i: number) => {
                return i === licenses.length - 1 ? (
                  <span key={license.skuPartNumber}>
                    {license.skuPartNumber}
                  </span>
                ) : (
                  <span key={license.skuPartNumber}>
                    {license.skuPartNumber},
                  </span>
                );
              })}
            </span>
          )}
        </>
      ) : (
        <Minus className={classes.button} />
      )}
    </div>
  );
};

export default OtherLicenses;
