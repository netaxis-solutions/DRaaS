import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { StrokeSuccessCircle, StrokeAlert } from "components/Icons";

import { EntitlementsStyle } from "../styles";

type TAcceptText = {
  userName: string;
  confirm: boolean;
};

const AcceptText: FC<TAcceptText> = ({ userName, confirm }) => {
  const classes = EntitlementsStyle();
  const { t } = useTranslation();
  return (
    <div className={classes.successLogin}>
      <div className={classes.iconWrapper}>
        {confirm ? (
          <StrokeSuccessCircle />
        ) : (
          <StrokeAlert className={classes.errorNotification} />
        )}
      </div>
      <span className={classes.successTextLogedStep}>
        {t("Admin account")}{" "}
        <span className={classes.successTextLogedStepBold}> {userName} </span>{" "}
        {t("linked to this tenant")}
      </span>
    </div>
  );
};

export default observer(AcceptText);
