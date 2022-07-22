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
import DetailsAndSettings from "./components/DetailsAndSettings";
import Loader from "components/Loader/Loader";

import { SipTrunksDetails } from "../styles";

const tabs: Tab[] = [
  {
    name: t("Details and settings"),
    id: "details",
    component: () => <DetailsAndSettings />,
  },
  {
    name: t("Capacity"),
    id: "capacity",
    component: () => <div>Capacity</div>,
  },
  {
    name: t("DIDs"),
    id: "dids",
    component: () => <div>DIDs</div>,
  },
  {
    name: t("Call forwarding"),
    id: "callForwarding",
    component: () => <div>Call forwarding</div>,
  },
  {
    name: t("Access details"),
    id: "accessDetails",
    component: () => <div>Access details</div>,
  },
];

const SipTrunkDetail: FC = () => {
  const history = useHistory();
  const classes = SipTrunksDetails();
  const params = useParams<{
    tenantID: string;
    subscriptionID: string;
    tabID: string;
    sipID: string;
  }>();
  const { getSpecificSipTrunk, specificSipTrunk } = SipTrunks;
  const { allAvailvableRouting } = RoutingConfig;

  const handleTabClick = (tabID: string) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionSIPTrunks}/:sipID/:tabID?`,
      params: {
        ...params,
        tabID,
      },
    });
    history.push(url);
  };

  useEffect(() => {
    getSpecificSipTrunk(params.tenantID, params.subscriptionID, params.sipID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tabs.some(({ id }) => id === params.tabID)) {
      const url = createLink({
        url: `${allAvailvableRouting.subscriptionSIPTrunks}/:sipID/:tabID?`,
        params: {
          ...params,
          tabID: tabs[0].id,
        },
      });
      history.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, params.sipID]);

  const goBack = () => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionSIPTrunks}`,
      params: {
        ...params,
      },
    });
    history.push(url);
  };

  if (params.tabID === ":tabID") return <Loader />;
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
        url={`${allAvailvableRouting.subscriptionSIPTrunks}/:sipID`}
        onTabChange={handleTabClick}
        active={params.tabID}
      />
      <Switch>
        {tabs.map(({ id, component: Component }: any) => {
          return (
            <Route
              exact
              key={id}
              path={`${allAvailvableRouting.subscriptionSIPTrunks}/:sipID/${id}`}
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
