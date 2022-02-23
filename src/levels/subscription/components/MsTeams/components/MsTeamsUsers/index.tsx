import { FC, useEffect, useMemo } from "react";
import { CellProps, Row } from "react-table";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import NumbersStore from "storage/singletons/Numbers";
import MsTeamsStore from "storage/singletons/MsTeams";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";

import { TableData, TableProps } from "utils/types/tableConfig";

import Table from "components/Table";
import OtherLicenses from "./components/OtherLicenses";
import FormSelect from "components/common/Form/FormSelect";
import AssignedNumber from "./components/AssignedNumber";

import useStyles from "./styles";

const defaultValues = {
  assignedNumber: "",
};

const MsTeamsUsers: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { control, handleSubmit } = useForm<{ assignedNumber: string }>({
    resolver: yupResolver(
      object().shape({
        assignedNumber: string().required(),
      }),
    ),
    defaultValues,
  });
  const {
    msTeamUsersList,
    getMsTeamUsers,
    editMsTeamsUserNumber,
  } = MsTeamsStore;
  const { getFreeNumbers } = NumbersStore;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  useEffect(() => {
    getMsTeamUsers(tenantID, subscriptionID);
    getFreeNumbers(tenantID, subscriptionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        EditComponent: ({ cell }: CellProps<TableProps>) => {
          useEffect(() => {
            TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
            return () => TableSelectedRowsStore.setSelectedRowsValues([]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          return (
            <div className={classes.selectController}>
              <Controller
                name="assignedNumber"
                control={control}
                render={({ field, ...props }) => (
                  <FormSelect
                    label={t("Select")}
                    options={["Unselect number", ...NumbersStore.freeNumbers]}
                    {...field}
                    {...props}
                    className={classes.selectNumber}
                  />
                )}
              />
            </div>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const onSubmit = (values: { assignedNumber: string }) => {
    editMsTeamsUserNumber(
      tenantID,
      subscriptionID,
      TableSelectedRowsStore.selectedRowsValues[0].original.msTeams.id,
      values.assignedNumber === "Unselect number"
        ? null
        : values.assignedNumber,
      () => getFreeNumbers(tenantID, subscriptionID),
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table
        title={t("Users")}
        columns={columns}
        data={msTeamUsersList}
        editDisabledCondition={(row: Row<TableData>) => {
          return !(row.original.msTeams.voiceEnabled === "yes");
        }}
        isEditable
      />
    </form>
  );
};

export default observer(MsTeamsUsers);
