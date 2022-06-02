import { FC, useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { object, string } from "yup";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import omit from "lodash/omit";

import {
  TModifyResourceAccount,
  TResourceAccountDataMsTeams,
  TResourceAccountDataDraas,
} from "utils/types/resourceAccount";
import { getIsLoading } from "utils/functions/getIsLoading";
import { TableProps, TableData } from "utils/types/tableConfig";

import SubscriptionLicensesStore from "storage/singletons/Licenses";
import ResourceAccountStorage from "storage/singletons/MsTeams/resourceAccount";
import PendingQueries from "storage/singletons/PendingQueries";
import TablePagination from "storage/singletons/TablePagination";
import NumbersStore from "storage/singletons/Numbers";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";

import AddResourceAccount from "./AddResourceAccount";
import Flag from "components/common/Flag";
import DeleteResourceAccount from "./DeleteResourceAccountModal";
import Tooltip from "components/Tooltip";
import FormTableInput from "components/common/TableInput";
import FormSelect from "components/common/Form/FormSelect";
import OtherLicenses from "../MsTeamsUsers/components/OtherLicenses";
import { InfoIcon, Reload, Plus } from "components/Icons";
import TableSkeleton from "components/Table/Skeleton";
import Table from "components/Table";
import AssignedNumber from "../MsTeamsUsers/components/AssignedNumber";
import FormSelectWithFlags from "components/common/Form/FormSelect/FormSelectWithFlags";
import CardWithButton from "components/CardForEmptyTable";

import useStyles from "../MsTeamsUsers/styles";

const defaultValues = {
  phoneNumber: "",
  accountType: "",
  displayName: "",
  location: "",
};

const typeSelect = ["call-queue", "auto-attendant"];

const ResourceAccount: FC = () => {
  const [modalToOpen, setModalToOpen] = useState("");
  const [actualMsTeamID, setActualMsTeamID] = useState("");
  const { t } = useTranslation();
  const classes = useStyles();
  const { byFetchType } = PendingQueries;

  const {
    getCompleteMsTeamResourceAccounts,
    resourceAccountsData,
    modifyMsTeamsResourceAccount,
    getCountryCode,
    deleteResourceAccount,
    getVerifiedDomains,
  } = ResourceAccountStorage;

  const { setSelectedRows } = TableSelectedRowsStore;

  const { getFreeNumbers } = NumbersStore;
  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  // Use form and add validation to all fields in update new Resource Account
  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(
      object().shape({
        phoneNumber: string(),
        accountType: string(),
        displayName: string(),
        location: string(),
      }),
    ),
    defaultValues,
  });

  // Get ResourceAccount Data , CountryCode Data and FreeNumbers Data
  // After unmount we deleting table pagination
  useEffect(() => {
    getCompleteMsTeamResourceAccounts(tenantID, subscriptionID);
    getFreeNumbers(tenantID, subscriptionID);
    getCountryCode();
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get Table pagination without Server Pagionation
  useEffect(() => {
    clearTablePagesWithoutServerPaginations(resourceAccountsData.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceAccountsData]);

  // Columns to table in Resource Account Table
  const columns = useMemo(
    () => [
      {
        Header: t("Display name"),
        accessor: "msTeams.displayName",
        EditComponent: () => {
          return (
            <Controller
              name="displayName"
              control={control}
              render={({ field, ...props }) => {
                return <FormTableInput {...field} {...props} />;
              }}
            />
          );
        },
      },
      {
        Header: t("Country"),
        accessor: "msTeams.location",
        Cell: ({ value }: CellProps<TableData>) => {
          return (
            <div className={classes.flags}>
              <Flag countryCode={value} />
            </div>
          );
        },
        EditComponent: ({ cell }: CellProps<TableProps>) => {
          // Connect SelectedRows storage
          useEffect(() => {
            TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
            return () => TableSelectedRowsStore.setSelectedRowsValues([]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          // Formatting CountryCode to Autocomplete format
          const countries = ResourceAccountStorage.countryCode.map(
            requirement => {
              return {
                label: requirement.label,
                value: requirement.value,
                image: <Flag countryCode={requirement.value} />,
              };
            },
          );
          return (
            <div className={classes.selectController}>
              <Controller
                name="location"
                control={control}
                render={({ field, ...props }) => (
                  <FormSelectWithFlags
                    label={t("Select")}
                    options={countries}
                    {...field}
                    {...props}
                    className={classes.selectCountry}
                    onChange={(props: any) => {
                      setValue("location", props?.value || "");
                    }}
                  />
                )}
              />
            </div>
          );
        },
      },
      {
        Header: t("Assigned number"),
        accessor: "draas",
        Cell: ({ value }: CellProps<TableData>) => {
          return <AssignedNumber draasUserInfo={value} />;
        },

        EditComponent: ({ cell, value }: CellProps<TableData>) => {
          // Connect SelectedRows storage
          useEffect(() => {
            TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
            setActualMsTeamID(cell.row.original.msTeams.id);
            return () => TableSelectedRowsStore.setSelectedRowsValues([]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          // If we have licenses - we can edit phone numbers and see Autocomplete with numbers variants
          return SubscriptionLicensesStore.licenses[0].inUse <
            SubscriptionLicensesStore.licenses[0].assigned ? (
            <div className={classes.selectController}>
              <Controller
                name="phoneNumber"
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
          ) : (
            <div className={classes.assignedNumberButtons}>
              <AssignedNumber draasUserInfo={value} />
              <Tooltip
                placement="right"
                title={t(
                  "Sorry, you cannot add any numbers because you don't have any licenses left",
                )}
              >
                <InfoIcon className={classes.errorNotification} />
              </Tooltip>
            </div>
          );
        },
      },

      {
        Header: t("Type"),
        accessor: "msTeams.accountType",
        EditComponent: ({ cell }: CellProps<TableData>) => {
          // Connect SelectedRows storage
          useEffect(() => {
            TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
            setActualMsTeamID(cell.row.original.msTeams.id);
            return () => TableSelectedRowsStore.setSelectedRowsValues([]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          return (
            <div className={classes.selectController}>
              <Controller
                name="accountType"
                control={control}
                render={({ field, ...props }) => {
                  return (
                    <FormSelect
                      label={t("Select")}
                      options={[...typeSelect]}
                      {...field}
                      {...props}
                      className={classes.selectNumber}
                    />
                  );
                }}
              />
            </div>
          );
        },
      },
      {
        Header: t("Licenses"),
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

  // Add Actions to table in top right side
  const toolbarActions = [
    {
      id: "add",
      title: t("Add"),
      icon: Plus,
      onClick: () => {
        setModalToOpen("add");
        getFreeNumbers(tenantID, subscriptionID);
        getVerifiedDomains(tenantID, subscriptionID);
      },
    },
  ];

  // Update Resoutce Account with data from all fields
  const onSubmit = (value: TModifyResourceAccount) => {
    const doubleCheckPhoneNumber =
      TableSelectedRowsStore.selectedRowsValues[0].original.draas
        ?.phoneNumber === value?.phoneNumber || value?.phoneNumber === ""
        ? ["phoneNumber"]
        : [""];
    const actualNumber = omit(
      value,
      doubleCheckPhoneNumber,
    ) as TModifyResourceAccount;
    modifyMsTeamsResourceAccount(
      tenantID,
      subscriptionID,
      actualMsTeamID,
      actualNumber,
    );
  };

  // Set default values to inputs
  const setDefaultValues = ({
    draas,
    msTeams,
  }: {
    draas: TResourceAccountDataDraas;
    msTeams: TResourceAccountDataMsTeams;
  }) => {
    setValue("phoneNumber", draas?.phoneNumber);
    setValue("accountType", msTeams?.accountType);
    setValue("displayName", msTeams?.displayName);
    setValue("location", msTeams?.location);
  };

  // Function for opening delete modal
  const handleDeleteItem = (props: any) => {
    setActualMsTeamID(props.row.original.msTeams.id);
    setSelectedRows({ [props.row.index]: true });
    setModalToOpen("delete");
  };

  // Function in delete modal -> button "Delete"
  const handleDelete = () => {
    deleteResourceAccount(tenantID, subscriptionID, actualMsTeamID);
    handleCloseModal();
  };

  // Handler in modals. To close delete \ create modal
  const handleCloseModal = () => {
    setModalToOpen("");
  };

  // Loader for component
  const isLoading =
    getIsLoading("@getMsTeamResourceAccount", byFetchType) ||
    getIsLoading("@getFreeNumbers", byFetchType) ||
    getIsLoading("@modifyMsTeamResourceAccount", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Resource accounts")}
          columns={columns}
          actions={[true, true]}
        />
      ) : resourceAccountsData.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            title={
              <div className={classes.tableTitle}>
                {t("Resource accounts")}
                <div
                  className={clsx(classes.icon, classes.reloadButton)}
                  onClick={() => {
                    getCompleteMsTeamResourceAccounts(tenantID, subscriptionID);
                    getFreeNumbers(tenantID, subscriptionID);
                  }}
                >
                  <Reload />
                </div>
              </div>
            }
            columns={columns}
            data={resourceAccountsData}
            setDefaultValues={setDefaultValues}
            toolbarActions={toolbarActions}
            handleDeleteItem={handleDeleteItem}
            isEditable
            isRemovable
          />
        </form>
      ) : (
        <div className={classes.cardWrapper}>
          <CardWithButton
            content={t("You have no Resource Accounts added yet")}
            customEvent={() => setModalToOpen("add")}
            buttonName={t("Add new Account")}
            icon={Plus}
          />
        </div>
      )}
      {modalToOpen === "delete" && (
        <DeleteResourceAccount
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={TableSelectedRowsStore.selectedRows}
          data={resourceAccountsData}
          setResoureAccountCurrentId={setActualMsTeamID}
          selectedRowsLength={TableSelectedRowsStore.selectedRowsLength}
        />
      )}
      {modalToOpen === "add" && (
        <AddResourceAccount handleCancel={handleCloseModal} />
      )}
    </>
  );
};

export default observer(ResourceAccount);
