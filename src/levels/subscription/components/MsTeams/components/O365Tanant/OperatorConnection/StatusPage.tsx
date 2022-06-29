import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CloudConnection from "storage/singletons/CloudConnection";
import PendingQueries from "storage/singletons/PendingQueries";
import { getIsLoading } from "utils/functions/getIsLoading";
import { TMsTeamCheck } from "utils/types/msTeam";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { StrokeSuccessCircle } from "components/Icons";

import { OperatorConnectionStyle } from "./styles";

const StatusPage: FC<{ data: TMsTeamCheck }> = ({ data }) => {
  const { t } = useTranslation();
  const classes = OperatorConnectionStyle();
  const { tenantID, subscriptionID } = useParams<{
    subscriptionID: string;
    tenantID: string;
  }>();
  const { byFetchType } = PendingQueries;

  const { unlinkOperatorConnection } = CloudConnection;

  const isLoading = getIsLoading("@unlinkOperatorConnection", byFetchType);

  return (
    <div>
      <div className={classes.textWithIcon}>
        <StrokeSuccessCircle />
        <span className={classes.boldText}>{t("Your tenant is linked")}</span>
      </div>
      <ul className={classes.ulListStatusPage}>
        <li>
          <span className={classes.boldText}>
            {t("Tenant-id")}
            {": "}
          </span>
          <span>{data?.msTenantId}</span>
        </li>
        <li>
          <span className={classes.boldText}>
            {t("Mode")}
            {": "}
          </span>
          <span>{data?.mode}</span>
        </li>
      </ul>
      <div className={classes.buttonWrapper}>
        <ButtonWithIcon
          title={t("Disconnect tenant")}
          disabled={isLoading}
          onClick={() => unlinkOperatorConnection(tenantID, subscriptionID)}
        />
      </div>
    </div>
  );
};

export default StatusPage;
