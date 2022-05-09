import { observer } from "mobx-react-lite";
import { FC } from "react";
import { InfoIcon, SuccessArrow } from "components/Icons";
import { EntitlementsStyle } from "../styles";

type TAcceptText = {
  userName: string;
  confirm: boolean;
};

const AcceptText: FC<TAcceptText> = ({ userName, confirm }) => {
  const classes = EntitlementsStyle();
  return (
    <div className={classes.successLogin}>
      {confirm ? (
        <SuccessArrow />
      ) : (
        <InfoIcon className={classes.errorNotification} />
      )}
      <span>
        Admin account <strong> {userName} </strong> linked to this tenant
      </span>
    </div>
  );
};

export default observer(AcceptText);
