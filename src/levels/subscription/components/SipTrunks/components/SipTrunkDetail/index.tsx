import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams, useHistory, Switch, Route } from "react-router-dom";

import { t } from "services/Translation";
import createLink from "services/createLink";
import { Tab } from "utils/types/tabs";

import SipTrunks from "storage/singletons/SipTrunks";
import RoutingConfig from "storage/singletons/RoutingConfig";

import { StrokeArrowLeft } from "components/Icons";
import IconButton from "components/common/Form/IconButton";
import Tabs from "components/Tabs";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { SipTrunksDetails } from "../styles";

const tabs = [
  {
    name: t("Details and settings"),
    id: "details",
    component: () => <div>GGG</div>,
  },
  {
    name: t("Capacity"),
    id: "capacity",
    component: () => <div>AAA</div>,
  },
  {
    name: t("DIDs"),
    id: "dids",
    component: () => <div>BBB</div>,
  },
  {
    name: t("Call forwarding"),
    id: "call-forwarding",
    component: () => <div>CCC</div>,
  },
  {
    name: t("Access details"),
    id: "access-details",
    component: () => <div>DDD</div>,
  },
];

const SipTrunkDetail: FC = () => {
  const history = useHistory();
  const classes = SipTrunksDetails();
  const { tenantID, subscriptionID, tabID, sipID } = useParams<{
    tenantID: string;
    subscriptionID: string;
    tabID?: string;
    sipID: string;
  }>();
  const { getSpecificSipTrunk, specificSipTrunk } = SipTrunks;
  const { allAvailvableRouting } = RoutingConfig;

  const handleTabClick = (tabID: string) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionSIPTrunks}/${sipID}/:tabID?`,
      params: {
        tenantID,
        subscriptionID,
        tabID,
        sipID,
      },
    });
    history.push(url);
  };

  useEffect(() => {
    getSpecificSipTrunk(tenantID, subscriptionID, sipID);
  }, []);

  useEffect(() => {
    if (!tabs.some(({ id }) => id === tabID)) {
      const url = createLink({
        url: `${allAvailvableRouting.subscriptionSIPTrunks}/${sipID}/:tabID?`,
        params: {
          tenantID,
          subscriptionID,
          sipID,
          tabID: tabs[0].id,
        },
      });
      history.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, sipID, specificSipTrunk]);

  const goBack = () => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionSIPTrunks}`,
      params: {
        tenantID,
        subscriptionID,
      },
    });
    history.push(url);
  };

  return (
    <div>
      <div className={classes.headerWrapper}>
        <div>
          <IconButton
            disableRipple
            onClick={goBack}
            icon={StrokeArrowLeft}
          ></IconButton>
          <span>{specificSipTrunk.name}</span>
        </div>
        <ButtonWithIcon title="delete" />
      </div>

      <Tabs
        tabs={tabs}
        url={`${allAvailvableRouting.subscriptionSIPTrunks}/${sipID}`}
        onTabChange={handleTabClick}
        active={tabID}
      />
      <Switch>
        {tabs.map(({ id, component: Component }: Tab) => {
          return (
            <Route
              exact
              key={id}
              path={`${allAvailvableRouting.subscriptionMSTeams}/${sipID}/${id}`}
            >
              <Component />
            </Route>
          );
        })}
        <Route path="*" />
      </Switch>
    </div>
  );
};

export default observer(SipTrunkDetail);
