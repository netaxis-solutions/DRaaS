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
import AddLocation from "./AddLocation";
import DeleteLocationModal from "./DeleteLocation";

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
    getPostalCodes,
    deleteSubscriptionLocations,
  } = SubscriptionProfile;
  const { byFetchType } = PendingQueries;
  const {
    selectedRowsLength,
    selectedRowsValues,
    setSelectedRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

  const { clearPaginationData } = TablePagination;

  useEffect(() => {
    getSubscriptionLocations(tenantID, subscriptionID);
    getPostalCodes();
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
        Header: t("Street"),
        accessor: "street",
      },
      {
        Header: t("Number"),
        accessor: "number",
      },
      {
        Header: t("Postbox"),
        accessor: "postbox",
      },
      {
        Header: t("Postal code"),
        accessor: "postalCode.code",
        EditComponent: ({ cell }: CellProps<TableProps>) => {
          return (
            <div>
              <Controller
                name="postalCodeId"
                control={control}
                render={({ field, ...props }) => (
                  <FormSelect
                    label={t("Select")}
                    options={["1", "2"]}
                    {...field}
                    {...props}
                  />
                )}
              />
            </div>
          );
        },
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
      // EditComponent: ({ cell }: CellProps<TableProps>) => {
      //   useEffect(() => {
      //     TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
      //     return () => TableSelectedRowsStore.setSelectedRowsValues([]);
      //     // eslint-disable-next-line react-hooks/exhaustive-deps
      //   }, []);
      //   return (
      //     <div>
      //       <Controller
      //         name="assignedNumber"
      //         control={control}
      //         render={({ field, ...props }) => (
      //           <FormSelect
      //             label={t("Select")}
      //             options={["1", "2"]}
      //             {...field}
      //             {...props}
      //           />
      //         )}
      //       />
      //     </div>
      //   );
      // },
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const handleModalClose = () => {
    setOpenedModal("");
  };

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

  const handleDeleteItem = (props: any) => {
    setOpenedModal("delete");
    setSelectedRows({ [props.row.index]: true });
    setSelectedRowsValues([props.row]);
  };

  const handleDelete = () => {
    const selectedIds = selectedRowsValues.reduce(
      (prev, curr) => [...prev, curr.original.id],
      [],
    );
    deleteSubscriptionLocations(tenantID, subscriptionID, selectedIds, () => {
      handleModalClose();
      getSubscriptionLocations(tenantID, subscriptionID);
    });
  };

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
            handleDeleteItem={handleDeleteItem}
            checkbox
            isEditable
            isRemovable
          />
        </form>
      )}
      {modalOpened === "add" && <AddLocation handleCancel={handleModalClose} />}
      {modalOpened === "delete" && (
        <DeleteLocationModal
          handleCloseModal={handleModalClose}
          handleDelete={handleDelete}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(Locations);
