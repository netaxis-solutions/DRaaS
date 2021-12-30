import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import RoutingConfig from "storage/singletons/RoutingConfig";
import SidebarConfig from "storage/singletons/SidebarConfig";
import Subscriptions from "storage/singletons/Subscriptions";
import createLink from "services/createLink";
import useStyles from "./styles";

const SidebarDropdown = () => {
  const history = useHistory();

  const { chosenCustomerID, extraLevelID, setExtraLevelID } = SidebarConfig;
  const { currentLevel, allAvailvableRouting } = RoutingConfig;
  const { subscriptions, getSubscriptionsData } = Subscriptions;

  const classes = useStyles({ currentLevel });

  useEffect(() => {
    currentLevel === "subscription" &&
      !subscriptions.length &&
      getSubscriptionsData(chosenCustomerID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCustomerID, currentLevel]);

  const handleChange = (event: SelectChangeEvent) => {
    setExtraLevelID(event.target.value);
    history.push(
      createLink({
        url: allAvailvableRouting.subscriptionLicenses,
        params: {
          tenantID: chosenCustomerID,
          subscriptionID: event.target.value,
        },
      }),
    );
  };

  return (
    <FormControl fullWidth>
      {!!subscriptions.length ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={extraLevelID}
          onChange={handleChange}
          className={classes.select}
        >
          {subscriptions.map(el => (
            <MenuItem value={el.id} key={el.id} className={classes.menuItem}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      ) : null}
    </FormControl>
  );
};

export default observer(SidebarDropdown);
