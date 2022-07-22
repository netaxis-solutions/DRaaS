import { FC } from "react";
import { TFunction } from "i18next";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { SipTrunksListStyles } from "../styles";

const SipTrunkEmptyList: FC<{ t: TFunction }> = ({ t }) => {
  const classes = SipTrunksListStyles();

  return (
    <div className={classes.sipTrunksEmptyListWrapper}>
      {t("You have no SIP trunks setup yet")}
      <ButtonWithIcon title={t("add")} />
    </div>
  );
};

export default SipTrunkEmptyList;
