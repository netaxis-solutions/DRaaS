import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import SipTrunksStore from "storage/singletons/SipTrunks";
import createLink from "services/createLink";

import SipTrunkEmptyList from "./components/SipTrunksList/SipTrunkEmptyList";

const SipTrunks: FC = () => {
  const { t } = useTranslation();

  const { allAvailvableRouting, history } = RoutingConfig;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { getSipTrunksGroup, sipTrunksGroup } = SipTrunksStore;

  useEffect(() => {
    getSipTrunksGroup(tenantID, subscriptionID);
  }, []);

  const goTo2 = () => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionSIPTrunks}/${2}`,
      params: {
        tenantID,
        subscriptionID,
      },
    });
    history.push(url);
  };

  return (
    <div>
      <span>
        {t(
          "Connect your PBX to our platform for inbound/outbound PSTN (SIP) connectivity",
        )}
        .
      </span>
      {sipTrunksGroup.length === 0 ? (
        <SipTrunkEmptyList t={t} />
      ) : (
        <div>
          {sipTrunksGroup.map((el: any) => (
            <div>
              <br />
              <span>
                {el.name} {"&"} {el.id}
              </span>
            </div>
          ))}
        </div>
      )}

      <ButtonWithIcon title="GO TO ABOBA" onClick={() => goTo2()} />
    </div>
  );
};

export default observer(SipTrunks);
