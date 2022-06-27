import { FC } from "react";

import MsTeamsAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";

import ConfirmCode from "./ConfirmCode";
import AuthOperatorConnection from "./AuthOperatorConnection";
import CardWrapper from "components/CardWrapper";
import StatusPage from "./StatusPage";

const OperatorConnection: FC = () => {
  return (
    <>
      {MsTeamsAdminStorage.checkMsTeamAdmin?.status === "not_initiated" && (
        <CardWrapper width={718} children={<AuthOperatorConnection />} />
      )}
      {MsTeamsAdminStorage.checkMsTeamAdmin?.status ===
        "waiting_for_confirmation" && (
        <CardWrapper width={684} children={<ConfirmCode />} />
      )}
      {MsTeamsAdminStorage.checkMsTeamAdmin?.status === "onboarded" && (
        <CardWrapper
          width={537}
          children={<StatusPage data={MsTeamsAdminStorage.checkMsTeamAdmin} />}
        />
      )}
    </>
  );
};

export default OperatorConnection;
