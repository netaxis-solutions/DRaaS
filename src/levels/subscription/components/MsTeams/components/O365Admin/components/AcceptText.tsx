import { observer } from "mobx-react-lite";
import { FC } from "react";
import { SuccessArrow } from "components/Icons";
import { EntitlementsStyle } from "../styles";

const AcceptText: FC<any> = ({ userName }: { userName: string }) => {
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
