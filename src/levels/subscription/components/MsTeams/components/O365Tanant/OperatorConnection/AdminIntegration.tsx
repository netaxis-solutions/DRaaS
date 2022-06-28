import { FC } from "react";
import { useTranslation } from "react-i18next";

import { TMsTeamCheck } from "utils/types/msTeam";

import CardWrapper from "components/CardWrapper";
import { StrokeAlert } from "components/Icons";
import { StrokeSuccessCircle } from "components/Icons";
// Wait Backend implementation
// import ButtonWithIcon from "components/common/Form/ButtonWithIcon";x

import { OperatorConnectionStyle } from "./styles";

const AdminIntegrationPage: FC<{ data: TMsTeamCheck }> = ({ data }) => {
  const { t } = useTranslation();
  const classes = OperatorConnectionStyle();
  return (
    <div className={classes.adminIntegrationWrapper}>
      <span className={classes.boldText}>{t("o365 Admin Account")}</span>
      <span>{`${t(
        "If you want to be able to link your numbers directly to your O365 users from this portal,  we need an admin account in your O365 Tenant",
      )}. ${t("You can remove it at any time")}!`}</span>
      <CardWrapper
        width={474}
        children={
          <div className={classes.adminIntegrationStatusWrapper}>
            <div className={classes.adminIntegrationTextWithIcon}>
              {data.powershell.active === true ? (
                <StrokeSuccessCircle />
              ) : (
                <StrokeAlert />
              )}
              <div className={classes.twoStepText}>
                <span className={classes.boldText}>
                  {t("Powershell integration")}
                </span>
                <span>
                  {data.powershell.active === true
                    ? data.powershell.msUserName
                    : t("Disable")}
                </span>
              </div>
            </div>
            <div className={classes.adminIntegrationTextWithIcon}>
              {data.msGraph.active === true ? (
                <StrokeSuccessCircle />
              ) : (
                <StrokeAlert />
              )}
              <div className={classes.twoStepText}>
                <span className={classes.boldText}>
                  {t("Microsoft graph integration")}
                </span>
                <span>
                  {data.msGraph.active === true
                    ? data.msGraph.msApplicationId
                    : t("Disable")}
                </span>
              </div>
            </div>
          </div>
        }
      />

      {
        // Wait Backend implementation
        /* <div className={classes.buttonWrapper}>
        <ButtonWithIcon
          title={t("Enable integrations")}
          onClick={() => console.log("GG")}
        />
      </div> */
      }
    </div>
  );
};

export default AdminIntegrationPage;
