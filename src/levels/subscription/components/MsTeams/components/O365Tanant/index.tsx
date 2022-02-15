import { FC, useEffect } from "react";
import { useParams } from "react-router";
import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";

const O365Tenant: FC = () => {
  const { startOnboarding, checkOnboarding } = MsTeamOnboarding;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <div>
      <button onClick={() => startOnboarding(tenantID, subscriptionID)}>
        CLSIIISK Start
      </button>
      <button onClick={() => checkOnboarding(tenantID, subscriptionID)}>
        CLSIIISK Check
      </button>
    </div>
  );
};

export default O365Tenant;
