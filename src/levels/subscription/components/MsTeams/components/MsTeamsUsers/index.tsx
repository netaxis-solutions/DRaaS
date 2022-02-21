import { FC, useEffect, useMemo } from "react";
import { CellProps } from "react-table";

import { TableProps } from "utils/types/tableConfig";

import Table from "components/Table";
import MsTeamsStore from "storage/singletons/MsTeams";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MsTeamsUsers: FC = () => {
  const { t } = useTranslation();

  const { msTeamUsersList, getMsTeamUsers } = MsTeamsStore;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  useEffect(() => {
    getMsTeamUsers(tenantID, subscriptionID);
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: t("Display name"),
        accessor: "countryCode",
      },
      {
        Header: t("Assigned number"),
        accessor: "nsn",
      },
      {
        Header: t("Number type"),
        accessor: "numberType",
      },
      {
        Header: t("Phone system licence"),
        accessor: "source",
        Cell: ({ value }: CellProps<TableProps>) => {
          return value === "number_inventory" ? "native" : "ported";
        },
      },
      {
        Header: t("Other licenses"),
        accessor: "assigned",
        Cell: ({ value }: CellProps<TableProps>) => {
          return value ? "connected" : "free";
        },
      },
    ],
    [t],
  );
  return (
    <Table
      title={t("My numbers")}
      columns={columns}
      data={msTeamUsersList}
      checkbox
      isRemovable
    />
  );
};

export default MsTeamsUsers;
