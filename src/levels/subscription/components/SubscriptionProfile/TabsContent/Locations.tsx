//@ts-nocheck
import { FC, useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { TableProps } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import SubscriptionProfile from "storage/singletons/SubscriptionProfile";
import FormSelect from "components/common/Form/FormSelect";
import Trash from "components/Icons/Trash";
import Plus from "components/Icons/Plus";

const Locations: FC = () => {
  const { t } = useTranslation();
  const [modalOpened, setOpenedModal] = useState("");

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { control, handleSubmit } = useForm<{ assignedNumber: string }>();

  const {
    subscriptionLocations,
    getSubscriptionLocations,
  } = SubscriptionProfile;
  const { byFetchType } = PendingQueries;

  const { clearPaginationData } = TablePagination;

  useEffect(() => {
    getSubscriptionLocations(tenantID, subscriptionID);

    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t("Country"),
        accessor: "postalCode.country.name",
      },
      {
        Header: t("City"),
        accessor: "postalCode.city",
      },
      {
        Header: t("Adress"),
        accessor: "street",
      },
      {
        Header: t("Postal code"),
        accessor: "postalCode.code",
      },
      {
        Header: t("Region"),
        accessor: "postalCode.region.name",
      },
      // {
      //   Header: t("Assigned number"),
      //   accessor: "draas",
      //   Cell: ({ value }: CellProps<TableProps>) => {
      //     return value;
      //   },
      //   EditComponent: ({ cell }: CellProps<TableProps>) => {
      //     useEffect(() => {
      //       TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
      //       return () => TableSelectedRowsStore.setSelectedRowsValues([]);
      //       // eslint-disable-next-line react-hooks/exhaustive-deps
      //     }, []);
      //     return (
      //       <div>
      //         <Controller
      //           name="assignedNumber"
      //           control={control}
      //           render={({ field, ...props }) => (
      //             <FormSelect
      //               label={t("Select")}
      //               options={["1", "2"]}
      //               {...field}
      //               {...props}
      //             />
      //           )}
      //         />
      //       </div>
      //     );
      //   },
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const toolbarActions = [
    {
      id: "delete",
      title: t("Delete"),
      icon: Trash,
      onClick: () => {
        setOpenedModal("delete");
      },
    },
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        setOpenedModal("add");
      },
    },
  ];

  const isLoading = getIsLoading("@getSubscriptionLocations", byFetchType);
  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Locations")}
          columns={columns}
          actions={[true]}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            title={t("Locations")}
            columns={columns}
            data={subscriptionLocations}
            toolbarActions={toolbarActions}
            checkbox
            isEditable
            isRemovable
          />
        </form>
      )}
      {modalOpened === "add" && "Add"}
      {modalOpened === "delete" && "Delete"}
    </>
  );
};

export default observer(Locations);

/*
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

import { TableData, TableProps } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import OtherLicenses from "./components/OtherLicenses";
import FormSelect from "components/common/Form/FormSelect";
import AssignedNumber from "./components/AssignedNumber";
import { Plus, SuccessCircle, Reload } from "components/Icons";
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
  } = MsTeamsStore;
  const { byFetchType } = PendingQueries;
  const { getFreeNumbers } = NumbersStore;

  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    getMsTeamUsers(tenantID, subscriptionID);
    getFreeNumbers(tenantID, subscriptionID);

    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearTablePagesWithoutServerPaginations(msTeamUsersList.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msTeamUsersList]);

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
                  <SuccessCircle />
                </div>
              );
            case "no":
              return (
                <div
                  className={clsx(classes.icon, classes.centred, classes.cross)}
                >
                  <Plus />
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
  const isLoading =
    getIsLoading("@getMsTeamUsers", byFetchType) ||
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
                getMsTeamUsers(tenantID, subscriptionID);
              }}
            >
              <Reload />
            </div>
          </div>
        }
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



*/
