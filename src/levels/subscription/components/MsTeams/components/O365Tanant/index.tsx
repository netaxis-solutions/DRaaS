import { FC, useEffect } from "react";
import { EntitlementsStyle } from "./styles";
import { AlertTriangle } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { MsTeamLimk } from "components/Icons";
import { useParams } from "react-router";
import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";

const O365Tenant: FC = () => {
  const { startOnboarding, checkOnboarding } = MsTeamOnboarding;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const classes = EntitlementsStyle();

  useEffect(() => {
    checkOnboarding(tenantID, subscriptionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <span className={classes.title}>
        <AlertTriangle className={classes.iconTriangle} />
        Please make sure you have at least 1 spare E1/E3/E5 license. We need
        this to activate the integration
      </span>
      <div className={classes.list}>
        <span>
          Link your Microsoft Teams to our service. As soon as you link your
          tenant, you will be able to assign numbers to users (teams).
        </span>
        <span className={classes.listTitle}>
          Linking this service to Microsoft Teams will do following changes to
          you Microsoft account:
        </span>
        <span>
          <ul>
            <li> New domain will be added & activated</li>
            <li>we will link your teams tenant to our platform (SBC)</li>
            <li>we will setup the voice policies and routes accordingly</li>
          </ul>
          <span>
            {" "}
            (*) the activation process will create a dummy 0365 user and assign
            a spare E1, E3 and E5 license. After activation the user will be
            deleted again.
          </span>
        </span>
        <div>
          <ButtonWithIcon
            className={classes.buttonConfirm}
            title="Link MS Teams"
            icon={MsTeamLimk}
            onClick={() => startOnboarding(tenantID, subscriptionID)}
          />
        </div>
      </div>
    </div>
  );
};

export default O365Tenant;
