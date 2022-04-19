import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import MsTeamOnboarding from "storage/singletons/MsTeams/Onboarding";
import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";

import { AlertOutline } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { MsTeamLimk } from "components/Icons";
import InfoPage from "./InfoPage";
import Stepper from "./StepperMsTeam/Stepper";

import { EntitlementsStyle } from "./styles";
// import PendingQueries from "storage/singletons/PendingQueries";
import O365TenantSkeleton from "./O365TenantSkeleton";

const O365Tenant: FC = () => {
  const {
    startOnboarding,
    currentStepTenantData,
    isRunning,
    isError,
    checkOnboarding,
  } = MsTeamOnboarding;
  const [startOnboard, setOnboard] = useState("");

  const {
    getMsTeamAdmin,
    msTeamAdmin,
    clearCashMsTeamAdmin,
    // getCheckMsTeamAdmin,
    checkMsTeamAdmin,
  } = MsTeamAdminStorage;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { t } = useTranslation();

  const classes = EntitlementsStyle();

  useEffect(() => {
    getMsTeamAdmin(tenantID, subscriptionID);
    currentStepTenantData({ tenantID, subscriptionID });
    // getCheckMsTeamAdmin(tenantID, subscriptionID);
    checkOnboarding(tenantID, subscriptionID);
    console.log("getTenantData");
    return () => {
      MsTeamOnboarding.clearOnboardingProgress();
      clearCashMsTeamAdmin();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToStep = () => {
    startOnboarding(tenantID, subscriptionID);
    setOnboard("start");
  };

  const disabledButton = msTeamAdmin.id !== null;

  const topTitleWithLink = (
    <span className={classes.title}>
      <AlertOutline className={classes.iconTriangle} />
      <span>
        {t("Please first add an")}{" "}
        <Link
          to={`/tenants/${tenantID}/subscriptions/${subscriptionID}/ms-teams/o365admin`}
          className={classes.Link}
        >
          {t("O365 admin")}.
        </Link>{" "}
        {t("Without this we cannot make the required changes in your account")}
      </span>
    </span>
  );

  const alredyLinkedText = (
    <span className={classes.title}>
      <AlertOutline className={classes.iconTriangleAlert} />
      <span className={classes.alertTitle}>
        {t(
          "We are sorry! We cannot link your Microsoft Tenant to this account because the tenant is already linked to another subscription. A tenant can only be used once on this platform. ",
        )}{" "}
        <br />
        <br />
        <span>{t("Please change the ")}</span>
        <Link
          to={`/tenants/${tenantID}/subscriptions/${subscriptionID}/ms-teams/o365admin`}
          className={classes.Link}
        >
          {t("O365 admin")}.
        </Link>{" "}
        {t("to an admin of another tenant and try again")}
      </span>
    </span>
  );

  return true ? (
    <O365TenantSkeleton />
  ) : (
    <>
      {checkMsTeamAdmin?.status === "already_linked" && alredyLinkedText}
      {checkMsTeamAdmin?.status === "onboarded" ? (
        <InfoPage />
      ) : (
        !isRunning &&
        checkMsTeamAdmin?.status === "not_initiated" && (
          <div className={classes.root}>
            {msTeamAdmin.id ? null : topTitleWithLink}

            <div className={classes.list}>
              <span>
                {` ${t("Link your Microsoft Teams to our service")}. ${t(
                  "As soon as you link your tenant, you will be able to assign numbers to users (teams)",
                )}.`}
              </span>
              <span className={classes.listTitle}>
                {` ${t(
                  "Linking this service to Microsoft Teams will do following changes to you Microsoft account",
                )}`}
                :
              </span>
              <span>
                <ul>
                  <li> {t("New domain will be added & activated")}</li>
                  <li>
                    {t("we will link your teams tenant to our platform (SBC)")}
                  </li>
                  <li>
                    {t(
                      "we will setup the voice policies and routes accordingly",
                    )}
                  </li>
                </ul>
                <span>
                  {` (*) ${t(
                    "the activation process will create a dummy 0365 user and assign a spare E1, E3 and E5 license",
                  )}. ${t("After activation the user will be deleted again")}.`}
                </span>
              </span>
              <div>
                {!!disabledButton && startOnboard === "" ? (
                  <ButtonWithIcon
                    className={classes.buttonConfirm}
                    title={t("Link MS Teams")}
                    icon={MsTeamLimk}
                    onClick={() => goToStep()}
                  />
                ) : (
                  <ButtonWithIcon
                    className={classes.buttonConfirm}
                    title={t("Link MS Teams")}
                    icon={MsTeamLimk}
                    disabled
                  />
                )}
              </div>
            </div>
          </div>
        )
      )}
      {startOnboard === "start" || isRunning ? (
        checkMsTeamAdmin?.status !== "onboarded" &&
        checkMsTeamAdmin?.status !== "already_linked" &&
        checkMsTeamAdmin?.status !== "not_initiated" ? (
          <Stepper />
        ) : null
      ) : !isRunning &&
        isError &&
        checkMsTeamAdmin?.status !== "onboarded" &&
        checkMsTeamAdmin?.status !== "already_linked" &&
        checkMsTeamAdmin?.status !== "not_initiated" ? (
        <Stepper />
      ) : null}
    </>
  );
};

export default observer(O365Tenant);
