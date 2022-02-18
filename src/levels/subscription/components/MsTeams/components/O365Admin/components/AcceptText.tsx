import { observer } from "mobx-react-lite";
import { FC } from "react";
import { SuccessArrow } from "components/Icons";
import { EntitlementsStyle } from "../styles";

type TAcceptText = {
  userName: string;
};

const AcceptText: FC<TAcceptText> = ({ userName }) => {
  const classes = EntitlementsStyle();
  return (
    <div className={classes.successLogin}>
      <SuccessArrow />{" "}
      <span>
        Admin account <strong> {userName} </strong> linked to this tenant
      </span>
    </div>
  );
};

export default observer(AcceptText);
