import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CellProps, Row, TableProps } from "react-table";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import EntitlementsStore from "storage/singletons/Entitlements";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { editEntitlementSchema } from "utils/schemas/entitlements";
import {
  EditEntitlementType,
  EntitlementsListType,
} from "utils/types/entitlements";
import { TableData } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";

import { Plus, Trash } from "components/Icons";
import Table from "components/Table";
import FormTableInput from "components/common/TableInput";
import TableSkeleton from "components/Table/Skeleton";
import AddEntitlement from "./components/AddEntitlement";
import DeleteEntitlement from "./components/DeleteEntitlement";
import CardWithButton from "components/CardForEmptyTable";
import Flag from "components/common/Flag";

import { EntitlementsStyle } from "./styles";

const defaultValues = {
  entitlement: "",
  entitlementID: "",
};

const EntitlementList: FC = () => {
  const [modalToOpen, setModalToOpen] = useState("");
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { t } = useTranslation();

  const {
    getEntitlements,
    entitlements,
    getEntitlementTypes,
    editEntitlement,
    deleteEntitlement,
  } = EntitlementsStore;

  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;

  const {
    selectedRows,
    selectedRowsLength,
    setSelectedRows,
  } = TableSelectedRowsStore;

  const { byFetchType } = PendingQueries;

  const { control, setValue, handleSubmit } = useForm<EditEntitlementType>({
    resolver: yupResolver(editEntitlementSchema()),
    defaultValues,
  });

  const onSubmit: SubmitHandler<EditEntitlementType> = values => {
    editEntitlement(tenantID, subscriptionID, values.entitlementID, values);
  };

  const classes = EntitlementsStyle();

  const columns = useMemo(
    () => [
      {
        Header: t("Country code"),
        accessor: "countryCode",
        Cell: ({ row }: CellProps<TableData>) => {
          return (
            <div className={classes.root}>
              {row.original.countryCode}
              <Flag countryCode={row.original.isoCode} />
            </div>
          );
        },
      },
      {
        Header: t("Type"),
        accessor: "numberType",
      },
      {
        Header: t("Regions"),
        accessor: "regions",
        Cell: ({ cell }: CellProps<TableProps>) => {
          return (
            <>
              {cell.row.values?.regions.length > 0 ? (
                cell.row.values.regions.map((el: any, i: any) => {
                  return i === cell.row.values.regions.length - 1 ? (
                    <span key={el}>{el}</span>
                  ) : (
                    <span key={el}>{el}, </span>
                  );
                })
              ) : (
                <></>
              )}
            </>
          );
        },
      },
      {
        Header: t("Reserved"),
        accessor: "reserved",
      },
      {
        Header: t("Assigned"),
        accessor: "assigned",
      },
      {
        Header: t("Entitlement"),
        accessor: "entitlement",
        EditComponent: () => (
          <Controller
            name="entitlement"
            control={control}
            render={({ field, ...props }) => (
              <FormTableInput {...field} {...props} />
            )}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, entitlements],
  );

  useEffect(() => {
    getEntitlements(tenantID, subscriptionID);
    getEntitlementTypes();
    clearTablePagesWithoutServerPaginations(entitlements.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitlements.length]);

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    clearTablePagesWithoutServerPaginations(entitlements.length);
    getEntitlements(tenantID, subscriptionID);
    setModalToOpen("");
  };

  const setDefaultValues = (entitlement: EntitlementsListType) => {
    setValue("entitlement", String(entitlement.entitlement));
    setValue("entitlementID", entitlement.id);
  };

  const handleDeleteItem = (props: any) => {
    setModalToOpen("delete");
    setSelectedRows({ [props.row.index]: true });
  };

  const callback = () => {
    getEntitlements(tenantID, subscriptionID);
    handleCloseModal();
  };

  const handleDelete = () => {
    const selectedEntitlementsIds = entitlements.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.id);
      return prev;
    }, [] as Array<string>);
    deleteEntitlement(
      tenantID,
      subscriptionID,
      selectedEntitlementsIds,
      callback,
    );
  };

  const handleEditItem = (props: any) => {
    setDefaultValues(props.row.original);
  };

  const toolbarActions = [
    {
      id: "delete",
      title: t("Delete"),
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
        clearPaginationData();
      },
    },
  ];

  const isAvailable = (row: Row<TableData>) => {
    return !row.original.assigned;
  };

  const selectAllCondition = (page: Row<TableData>[]) => {
    const maxSelectedAmount = page.reduce((prev, row) => {
      return row.original.assigned ? prev : ++prev;
    }, 0);

    return (
      maxSelectedAmount === TableSelectedRowsStore.selectedRowsLength &&
      TableSelectedRowsStore.selectedRowsLength !== 0
    );
  };

  const selectAllRowCondition = (_: any, row: Row<TableData>) => {
    return !row.original.assigned;
  };

  const isLoading =
    getIsLoading("@getSubscriptionEntitlementsData", byFetchType) ||
    getIsLoading("@getEntitlementsTypeData", byFetchType);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? (
          <TableSkeleton
            title={t("Entitlements")}
            columns={columns}
            checkbox
            actions={[true, true]}
          />
        ) : entitlements.length > 0 ? (
          <Table
            title={t("Entitlements")}
            columns={columns}
            data={entitlements}
            setDefaultValues={setDefaultValues}
            setModalToOpen={setModalToOpen}
            isEditable
            isRemovable
            checkbox
            tooltipTrashButton={{
              text: t(
                "You cannot delete entitlements as long as you still have numbers assigned",
              ),
              filterConditions: (rowData: Row<TableData>) =>
                rowData.original.assigned,
            }}
            handleDeleteItem={handleDeleteItem}
            toolbarActions={toolbarActions}
            handleEditItem={handleEditItem}
            isCheckboxAvailable={isAvailable}
            selectAllRowCondition={selectAllRowCondition}
            isGeneralCheckboxSelected={selectAllCondition}
            deleteDisabledCondition={(row: Row<TableData>) => {
              return !(row.original.assigned === 0);
            }}
          />
        ) : (
          <div className={classes.cardWrapper}>
            <CardWithButton
              content={t("You have no entitlements added yet")}
              customEvent={() => setModalToOpen("add")}
              buttonName={t("Add new entitlement")}
              icon={Plus}
            />
          </div>
        )}
      </form>
      {modalToOpen === "add" && (
        <AddEntitlement handleCancel={handleCloseModal} />
      )}
      {modalToOpen === "delete" && (
        <DeleteEntitlement
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          entitlement={entitlements}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(EntitlementList);
