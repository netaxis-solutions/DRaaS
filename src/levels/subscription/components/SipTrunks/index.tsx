import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import SipTrunksStore from "storage/singletons/SipTrunks";
import createLink from "services/createLink";

import SipTrunkEmptyList from "./components/SipTrunksList/SipTrunkEmptyList";
import ListItemWithRouting from "components/ListItemWithRouting";

import { SipTrunksListStyles } from "./components/styles";

const SipTrunks: FC = () => {
  const { t } = useTranslation();

  const { allAvailvableRouting, history } = RoutingConfig;
  const classes = SipTrunksListStyles();

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { getSipTrunksGroup, sipTrunksGroup } = SipTrunksStore;

  useEffect(
    () => getSipTrunksGroup(tenantID, subscriptionID),
    // eslint-disable-next-line react-hooks/exhaustive-deps,
    [],
  );

  const goToSipTrunk = (id: number) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionSIPTrunks}/${id}`,
      params: {
        tenantID,
        subscriptionID,
      },
    });
    history.push(url);
  };

  const deleteTrunk = (id: number) => {
    console.log("DELETE", id);
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
        <div className={classes.sipTrunksListWrapper}>
          {sipTrunksGroup.map((el: any, index: number) => (
            <ListItemWithRouting
              name={el.name}
              index={index}
              key={el.name + el.id}
              routeTo={() => goToSipTrunk(el.id)}
              deleteTrunk={() => deleteTrunk(el.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(SipTrunks);
