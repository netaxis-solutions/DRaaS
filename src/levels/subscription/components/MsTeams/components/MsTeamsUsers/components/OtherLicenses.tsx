import IconButton from "@material-ui/core/IconButton";
// import IconButton from "components/common/Form/IconButton";
import { EyeClosed, EyeOpened, Minus } from "components/Icons";
import { FC, useState } from "react";

import useStyles from "../styles";

const OtherLicenses: FC<{ licenses: Array<any> }> = ({ licenses }) => {
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
              {licenses.map(license => (
                <span key={license.skuPartNumber}>
                  {license.skuPartNumber + ", "}
                </span>
              ))}
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
