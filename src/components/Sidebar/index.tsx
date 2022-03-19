import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

import RoutingConfig from "storage/singletons/RoutingConfig";
import SidebarConfig from "storage/singletons/SidebarConfig";
import createLink from "services/createLink";
import { SidebarUnitType } from "utils/types/routingConfig";
import {
  DistributorLevelIcon,
  ResellerLevelIcon,
  TenantLevelIcon,
} from "components/Icons";
import Loader from "components/Loader/Loader";
import useStyles from "./styles";

const levelIcon: {
  [key: string]: React.ReactNode;
} = {
  distributor: <DistributorLevelIcon width={24} height={24} fill="#C2C3E8" />,
  reseller: <ResellerLevelIcon width={27} height={27} fill="#C2C3E8" />,
  tenant: <TenantLevelIcon width={23} height={23} fill="#C2C3E8" />,
};

const Sidebar: React.FC<{
  options: SidebarUnitType[];
}> = ({ options }) => {
  const location = useLocation();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const pathnames = pathname.split("/").filter(x => x);

  const {
    chosenCustomerID,
    chosenCustomerData,
    extraLevelID,
    extraLevelData,
    isLoading,
    clearChosenCustomer,
  } = SidebarConfig;
  const { currentLevel, allAvailvableRouting } = RoutingConfig;

  const classes = useStyles({ currentLevel });

  const level = useMemo(() => {
    if (currentLevel === "subscription") {
      return "tenant";
    } else {
      return currentLevel;
    }
  }, [currentLevel]);

  const locationArr = location.pathname.split("/");

  useEffect(() => {
    return () => clearChosenCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.sidebarContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.titleWithDropdown}>
            <div className={classes.titleContainer}>
              <div className={classes.iconContainer}>{levelIcon[level]}</div>
              <div className={classes.titleWrapper}>
                <div
                  onClick={() =>
                    history.push(`/${pathnames.slice(0, 3).join("/")}/`)
                  }
                  className={classes.title}
                >
                  {currentLevel === "subscription"
                    ? extraLevelData?.name
                    : chosenCustomerData?.name}
                </div>
                <div className={classes.level}>
                  {" "}
                  {currentLevel === "subscription"
                    ? chosenCustomerData?.name
                    : level}
                </div>
              </div>
            </div>
          </div>
          {options.map(el => {
            const routeArr = allAvailvableRouting[el.key].split("/");
            const route = routeArr[routeArr.length - 1];

            return (
              <Link
                key={el.key}
                className={clsx(classes.sidebarItem, {
                  [classes.chosen]: locationArr.includes(route),
                })}
                to={createLink({
                  url: allAvailvableRouting[el.key],
                  params: {
                    tenantID: chosenCustomerID,
                    subscriptionID: extraLevelID,
                  },
                })}
              >
                {el.name}
              </Link>
            );
          })}
        </>
      )}
    </div>
  );
};

export default observer(Sidebar);
