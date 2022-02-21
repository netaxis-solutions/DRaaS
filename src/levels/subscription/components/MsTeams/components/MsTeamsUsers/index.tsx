import { FC, useEffect, useMemo } from "react";
import { CellProps } from "react-table";

import { TableProps } from "utils/types/tableConfig";

import Table from "components/Table";
import MsTeamsStore from "storage/singletons/MsTeams";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import OtherLicenses from "./components/OtherLicenses";
import { Controller, useForm } from "react-hook-form";
import FormSelect from "components/common/Form/FormSelect";
import AssignedNumber from "./components/AssignedNumber";

const MsTeamsUsers: FC = () => {
  const { t } = useTranslation();

  const { control } = useForm<any>({});
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
        accessor: "msTeams.displayName",
      },
      {
        Header: t("Assigned number"),
        accessor: "draas",
        Cell: ({ value }: CellProps<TableProps>) => {
          return <AssignedNumber draasUserInfo={value} />;
        },

        EditComponent: (...all: any) => {
          console.log(all, "asfasfasfasf");
          return (
            <Controller
              name="assignedNumber"
              control={control}
              render={({ field, ...props }) => (
                <FormSelect
                  label={t("Select")}
                  options={["a", "b", "c"]}
                  {...field}
                  {...props}
                />
              )}
            />
          );
        },
      },
      {
        Header: t("Phone system licence"),
        accessor: "msTeams.voiceEnabled",
      },
      {
        Header: t("Other licenses"),
        accessor: "msTeams.licenses",
        width: 100,
        Cell: ({ value }: CellProps<TableProps>) => {
          return <OtherLicenses licenses={value} />;
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
      isEditable
    />
  );
};

export default observer(MsTeamsUsers);
