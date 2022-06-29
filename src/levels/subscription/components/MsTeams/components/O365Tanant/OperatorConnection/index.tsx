import { FC } from "react";

import MsTeamsAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";

import ConfirmCode from "./ConfirmCode";
import AuthOperatorConnection from "./AuthOperatorConnection";
import CardWrapper from "components/CardWrapper";
import StatusPage from "./StatusPage";
import HelperText from "./HelperText";
import AdminIntegrationPage from "./AdminIntegration";

import { OperatorConnectionStyle } from "./styles";

const OperatorConnection: FC = () => {
  const classes = OperatorConnectionStyle();

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
        <div className={classes.userStatusInfoPage}>
          <CardWrapper
            width={537}
            children={
              <StatusPage data={MsTeamsAdminStorage.checkMsTeamAdmin} />
            }
          />
          <CardWrapper
            width={537}
            children={
              <AdminIntegrationPage
                data={MsTeamsAdminStorage.checkMsTeamAdmin}
              />
            }
          />
        </div>
      )}
      {MsTeamsAdminStorage.checkMsTeamAdmin?.status === "no_consent" && (
        <CardWrapper
          width={684}
          children={<HelperText error={true} reloadPage />}
        />
      )}
    </>
  );
};

export default OperatorConnection;
