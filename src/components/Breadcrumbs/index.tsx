import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Skeleton } from "@mui/material";

import BreadcrumbsStorage from "storage/singletons/Breadcrumbs";
import RoutingConfig from "storage/singletons/RoutingConfig";

import { ArrowRight } from "components/Icons";

import useStyles from "./styles";

const Breadcrumbs: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const {
    customerLevels,
    cleanBreadcrambsStorage,
    isLoading,
  } = BreadcrumbsStorage;

  const pathnames: Array<string> = pathname.split("/").filter(x => x);

  const separator =
    customerLevels[1]?.name !== "" ? <ArrowRight fontSize="small" /> : null;

  useEffect(() => {
    return () => cleanBreadcrambsStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div style={{ maxWidth: 400, padding: "18px 0 0 30px" }}>
          <Skeleton variant="text" />
        </div>
      ) : (
        customerLevels.length > 0 && (
          <MUIBreadcrumbs
            separator={separator}
            className={classes.breadcrumbsWrapper}
          >
            {customerLevels.map((item, index) => {
              const indexModifier =
                RoutingConfig.loggedInUserLevel === "tenant" ? 1 : 3;

              const routeTo = `/${pathnames
                .slice(0, index + indexModifier)
                .join("/")}`;

              return !item?.disabled ? (
                <Link
                  key={`${item.name}${index}`}
                  onClick={() => history.push(routeTo)}
                >
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={`${item.name}${index}`}
                  className={classes.disabledLink}
                >
                  {item.name}
                </Link>
              );
            })}
          </MUIBreadcrumbs>
        )
      )}
    </>
  );
};

export default observer(Breadcrumbs);
