import { observer } from "mobx-react-lite";

import { FC, useEffect, useMemo, useState } from "react";
import { chain } from "lodash";

import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SubscriptionLicensesStore from "storage/singletons/SubscriptionLicenses";
import { ArrowDown, ArrowUp } from "components/Icons";
import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import { useStyles } from "./styles";
import clsx from "clsx";

const LicensesList: FC = () => {
  const { t } = useTranslation();
  //@ts-ignore:next-line
  const [modalToOpen, setModalToOpen] = useState("");
  const params: { tenantID: string; subscriptionID: string } = useParams();
  const { licenses, getSubscriptionLicensesData } = SubscriptionLicensesStore;
  const classes = useStyles();

  useEffect(() => {
    getSubscriptionLicensesData(params?.tenantID);
  }, []);

  const toolbarActions = [
    {
      id: "delete",
      title: "Delete",
      icon: Trash,
      onClick: () => {
        setModalToOpen("delete");
      },
    },
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        setModalToOpen("add");
      },
    },
  ];

  const columns = useMemo(
    () => [
      {
        id: "expander",
        Cell: ({ row }: any) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({})}
              className={classes.arrowsWrapper}
            >
              {row.isExpanded ? <ArrowUp /> : <ArrowDown />}
            </span>
          ) : null,
      },
      {
        Header: "Name",
        accessor: "subscription.name",
        Cell: ({ value, row }: any) => {
          return (
            <span className={clsx({ [classes.typeName]: row.canExpand })}>
              {row.canExpand ? row.original.type : value}
            </span>
          );
        },
      },
      {
        Header: "In use",
        accessor: "inUse",
      },
      {
        Header: "Limited",
        accessor: "quantity",
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: ({ value, row }: any) => {
          return (
            <span className={clsx({ [classes.typeName]: row.canExpand })}>
              {row.canExpand ? " " : value}
            </span>
          );
        },
      },
      {
        Header: "Country code",
        accessor: "countyCode",
      },
      {
        Header: "Vanity type",
        accessor: "vanityType",
      },
      {
        Header: "Region",
        accessor: "region",
      },
    ],
    [],
  );

  const groupDataWidthType = chain(licenses?.details)
    .groupBy(item => item.type)
    .map((value, key) => ({
      type: key,
      subRows: value,
    }))
    .value();

  return (
    <Table
      title={t("Licenses")}
      columns={columns}
      data={groupDataWidthType}
      toolbarActions={toolbarActions}
    />
  );
};

export default observer(LicensesList);
