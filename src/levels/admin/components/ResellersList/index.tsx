import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Resellers from "storage/singletons/Resellers";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import DeleteModal from "components/common/DeleteModal";
import DeleteOneItemModal from "components/common/DeleteOneItemModal";
import { Plus, Trash } from "components/Icons";
import AddReseller from "./components/AddReseller";

import useStyles from "./styles";

const ResellersList: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [modalToOpen, setModalToOpen] = useState("");

  const { getResellersData, resellers, deleteResellers } = Resellers;
  const {
    selectedRows,
    selectedRowsLength,
    singleSelectedRow,
    setSingleSelectedRow,
  } = TableSelectedRowsStore;

  useEffect(() => {
    getResellersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const handleDelete = () => {
    const selectedResellerIds = resellers
      .filter((_, i) => Object.keys(selectedRows).includes(String(i)))
      .map(el => String(el.uuid));
    const callback = () => {
      getResellersData();
      handleCloseModal();
    };
    deleteResellers(selectedResellerIds, callback);
  };

  const handleDeleteOne = () => {
    const callback = () => {
      getResellersData();
      handleCloseModal();
    };
    singleSelectedRow && deleteResellers([singleSelectedRow.uuid], callback);
  };

  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Billing ID",
      accessor: "billingId",
    },
    {
      Header: "Owner",
      accessor: "owner.name",
    },
    {
      Header: "Tenants",
      accessor: "nbOfTenants",
    },
    {
      Header: "Actions",
      accessor: "actions",
      disableSortBy: true,
      Cell: (props: any) => (
        <TableActions
          edit
          del
          onDelete={() => {
            setModalToOpen("deleteOne");
            setSingleSelectedRow(props.row.original);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        title={t("Resellers")}
        columns={columns}
        data={resellers}
        toolbarActions={toolbarActions}
        checkbox
      />
      {modalToOpen === "add" && <AddReseller handleCancel={handleCloseModal} />}
      {modalToOpen === "delete" ? (
        selectedRowsLength === 1 ? (
          <DeleteOneItemModal
            handleCancel={handleCloseModal}
            handleDelete={handleDelete}
            selectedElementName={String(
              resellers.filter((_, i) =>
                Object.keys(selectedRows).includes(String(i)),
              )[0].name,
            )}
          >
            <div className={classes.text}>
              <div>
                {t(`Are you sure you want to delete`)}{" "}
                <span className={classes.boldText}>
                  {
                    resellers.filter((_, i) =>
                      Object.keys(selectedRows).includes(String(i)),
                    )[0].name
                  }
                </span>
                ?
              </div>
              <div>
                {t("All the information under this reseller will be deleted")}.
              </div>
              <div>
                {t("Please, type the name of the reseller to delete it")}:
              </div>
            </div>
          </DeleteOneItemModal>
        ) : (
          <DeleteModal
            handleCancel={handleCloseModal}
            handleDelete={handleDelete}
          >
            <div className={classes.text}>
              <div>
                {t(`Are you sure you want to delete`)}{" "}
                <span className={classes.boldText}>
                  {selectedRowsLength} {t("resellers.")}
                </span>
              </div>
              {t("All the information under this resellers will be deleted.")}
            </div>
          </DeleteModal>
        )
      ) : null}
      {modalToOpen === "deleteOne" && singleSelectedRow && (
        <DeleteOneItemModal
          handleCancel={handleCloseModal}
          handleDelete={handleDeleteOne}
          selectedElementName={String(singleSelectedRow.name)}
        >
          <div className={classes.text}>
            <div>
              {t(`Are you sure you want to delete`)}{" "}
              <span className={classes.boldText}>{singleSelectedRow.name}</span>
              ?
            </div>
            <div>
              {t("All the information under this reseller will be deleted")}.
            </div>
            <div>
              {t("Please, type the name of the reseller to delete it")}:
            </div>
          </div>
        </DeleteOneItemModal>
      )}
    </>
  );
};

export default observer(ResellersList);
