import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
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
  const classes = useStyles();
  const location = useLocation();

  const { chosenCustomerID, chosenCustomerData } = SidebarConfig;
  const { currentLevel, allAvailvableRouting } = RoutingConfig;

  const locationArr = location.pathname.split("/");
  const chosenSidebarItem = locationArr[locationArr.length - 1];

  return (
    <div className={classes.sidebarContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.iconContainer}>{levelIcon[currentLevel]}</div>
        <div>
          <div className={classes.title}>{chosenCustomerData?.name}</div>
          <div className={classes.level}>{currentLevel}</div>
        </div>
      </div>
      {options.map(el => {
        const routeArr = allAvailvableRouting[el.key].split("/");
        const route = routeArr[routeArr.length - 1];

        return (
          <Link
            key={el.key}
            className={clsx(classes.sidebarItem, {
              [classes.chosen]: route === chosenSidebarItem,
            })}
            to={createLink({
              url: allAvailvableRouting[el.key],
              params: { tenantID: chosenCustomerID },
            })}
          >
            {el.name}
          </Link>
        );
      })}
    </div>
  );
};

export default observer(Sidebar);
