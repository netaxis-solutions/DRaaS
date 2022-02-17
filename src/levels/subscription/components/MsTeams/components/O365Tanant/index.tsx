import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";
import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";

import { AlertOutline } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { MsTeamLimk } from "components/Icons";
import StepperMsTeam from "./StepperMsTeam";

import { EntitlementsStyle } from "./styles";

const O365Tenant: FC = () => {
  const { startOnboarding } = MsTeamOnboarding;
  const {
    getMsTeamAdmin,
    msTeamAdmin,
    clearCashMsTeamAdmin,
  } = MsTeamAdminStorage;
  const [modalToOpen, setModalToOpen] = useState("");

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const classes = EntitlementsStyle();

  useEffect(() => {
    getMsTeamAdmin(tenantID, subscriptionID);
    return () => clearCashMsTeamAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToStep = () => {
    startOnboarding("49fed14a-549a-48c4-98dd-14efe6454503", "60");
    setModalToOpen("startStep");
  };

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const disabledButton = Object.keys(msTeamAdmin).length;

  return (
    <>
      <div className={classes.root}>
        <span className={classes.title}>
          <AlertOutline className={classes.iconTriangle} />
          <span>
            Please first add an{" "}
            <Link
              to={`/tenants/${tenantID}/subscriptions/${subscriptionID}/ms-teams/o365admin`}
              className={classes.Link}
            >
              O365 admin.
            </Link>{" "}
            Without this we cannot make the required changes in your account
          </span>
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
              (*) the activation process will create a dummy 0365 user and
              assign a spare E1, E3 and E5 license. After activation the user
              will be deleted again.
            </span>
          </span>
          <div>
            {!!disabledButton ? (
              <ButtonWithIcon
                className={classes.buttonConfirm}
                title="Link MS Teams"
                icon={MsTeamLimk}
                onClick={() => goToStep()}
              />
            ) : (
              <ButtonWithIcon
                className={classes.buttonConfirm}
                title="Link MS Teams"
                icon={MsTeamLimk}
                disabled
              />
            )}
          </div>
        </div>
      </div>
      {modalToOpen === "startStep" && (
        <StepperMsTeam handleCancel={handleCloseModal} />
      )}
    </>
  );
};

export default observer(O365Tenant);
