import { FC, useEffect, useMemo } from "react";
import { CellProps, Row } from "react-table";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import clsx from "clsx";

import NumbersStore from "storage/singletons/Numbers";
import MsTeamsStore from "storage/singletons/MsTeams";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";
import SubscriptionLicensesStore from "storage/singletons/Licenses";
import CreateDeleteAdmin from "storage/singletons/MsTeams/CreateDeleteAdmin";
import TableSearch from "storage/singletons/TableSearch";

import { TableData, TableProps } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import OtherLicenses from "./components/OtherLicenses";
import FormSelect from "components/common/Form/FormSelect";
import AssignedNumber from "./components/AssignedNumber";
import {
  StrokeAlertCircle,
  StrokeSuccessCircle,
  StrokeLoader,
} from "components/Icons";
import ReloadButton from "./components/ReloadButton";
import TableSkeleton from "components/Table/Skeleton";

import useStyles from "./styles";

const defaultValues = {
  assignedNumber: "",
};

const MsTeamsUsers: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

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
    getMoreMsTeamUsers,
  } = MsTeamsStore;
  const { byFetchType } = PendingQueries;
  const { getFreeNumbers } = NumbersStore;

  const { search, clearPaginationData } = TablePagination;

  useEffect(() => {
    getFreeNumbers(tenantID, subscriptionID);

    return () => {
      clearPaginationData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMsTeamUsers(tenantID, subscriptionID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
        Header: t("Voice enabled"),
        accessor: "msTeams.voiceEnabled",
        Cell: ({ cell }: CellProps<any>) => {
          switch (cell.value) {
            case "yes":
              return (
                <div
                  className={clsx(classes.icon, classes.centred, classes.check)}
                >
                  <StrokeSuccessCircle />
                </div>
              );
            case "no":
              return (
                <div
                  className={clsx(classes.icon, classes.centred, classes.cross)}
                >
                  <StrokeAlertCircle />
                </div>
              );
            default:
              return <ReloadButton id={cell.row.original.msTeams.id} />;
          }
        },
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

  const tooltipMessage =
    SubscriptionLicensesStore.licenses[0].inUse >=
    SubscriptionLicensesStore.licenses[0].assigned
      ? t(
          "Your subscription does not have any MS Teams licenses left. Please order more licenses in order to be able to assign more numbers to users",
        )
      : !CreateDeleteAdmin?.checkMsTeamAdmin?.powershell.active
      ? t(
          "Our powershell integration has been disabled. Please verify you have a valid O365 admin account enabled for this account",
        )
      : t(
          "This user is not voice enabled. Please make sure the user has the correct set of O365 licenses assigned. These licenses must include the Microsoft Phonesystem",
        );

  const isLoading =
    getIsLoading("@getMsTeamUsers", byFetchType) ||
    getIsLoading("@getMsTeamNumber", byFetchType) ||
    getIsLoading("@getFreeNumbers", byFetchType);
  return isLoading ? (
    <TableSkeleton title={t("Users")} columns={columns} actions={[true]} />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table
        title={
          <div className={classes.tableTitle}>
            {t("Users")} {`(${msTeamUsersList.length})`}
            <div
              className={clsx(classes.icon, classes.reloadButton)}
              onClick={() => {
                TableSearch.clearTableSearch();
                getMsTeamUsers(tenantID, subscriptionID);
              }}
            >
              <StrokeLoader />
            </div>
          </div>
        }
        columns={columns}
        data={msTeamUsersList}
        tooltipEditButton={{
          text: tooltipMessage,
          filterConditions: (rowData: Row<TableData>) =>
            !(rowData.original.msTeams.voiceEnabled === "yes") ||
            SubscriptionLicensesStore.licenses[0].inUse >
              SubscriptionLicensesStore.licenses[0].assigned ||
            !CreateDeleteAdmin?.checkMsTeamAdmin?.powershell.active,
        }}
        editDisabledCondition={(row: Row<TableData>) =>
          !(row.original.msTeams.voiceEnabled === "yes") ||
          SubscriptionLicensesStore.licenses[0].inUse >
            SubscriptionLicensesStore.licenses[0].assigned ||
          !CreateDeleteAdmin?.checkMsTeamAdmin?.powershell.active
        }
        isEditable
        infiniteScroll
        handleLoadNext={(token, setNewToken) => {
          getMoreMsTeamUsers(tenantID, subscriptionID, token, setNewToken);
        }}
      />
    </form>
  );
};

export default observer(MsTeamsUsers);
