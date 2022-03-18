import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import BreadcrumbsStorage from "storage/singletons/Breadcrumbs";

import { ArrowRight } from "components/Icons";

import useStyles from "./styles";

const Breadcrumbs: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const { customerLevels, cleanBreadcrambsStorage } = BreadcrumbsStorage;

  const pathnames: any = pathname.split("/").filter(x => x);

  const separator =
    customerLevels[1]?.name !== "" ? <ArrowRight fontSize="small" /> : null;

  useEffect(() => {
    return () => cleanBreadcrambsStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MUIBreadcrumbs
      separator={separator}
      className={classes.breadcrumbsWrapper}
      aria-label="breadcrumb"
    >
      {customerLevels.map((item: any, index: any) => {
        const routeTo = `/${pathnames.slice(0, index + 3).join("/")}/`;
        return !item?.disabled ? (
          <Link key={item.name} onClick={() => history.push(routeTo)}>
            {item.name}
          </Link>
        ) : (
          <Link className={classes.disabledLink}>{item.name}</Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default observer(Breadcrumbs);
