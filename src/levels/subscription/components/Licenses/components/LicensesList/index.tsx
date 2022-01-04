import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import LicensesStore from "storage/singletons/Licenses";
import { EditLicensesPayload } from "utils/types/licenses";
import { editLicenseSchema } from "utils/schemas/license";

import FormTableInput from "components/common/TableInput";
import { Plus, Trash } from "components/Icons";
import Table from "components/Table";

const defaultValues = {
  assigned: "",
  inUse: "",
};

const LicensesList: FC = () => {
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { t } = useTranslation();
  //@ts-ignore
  const [modalToOpen, setModalToOpen] = useState("");

  const { getSubscriptionLicensesData, licenses, editLicense } = LicensesStore;
  const { control, setValue, handleSubmit } = useForm<EditLicensesPayload>({
    resolver: yupResolver(editLicenseSchema()),
    defaultValues,
  });

  const onSubmit: SubmitHandler<any> = payload => {
    editLicense({ tenantID, subscriptionID, payload });
  };

  const columns = useMemo(
    () => [
      {
        Header: t("inUse"),
        accessor: "inUse",
      },
      {
        Header: t("Assigned"),
        accessor: "assigned",
        EditComponent: () => (
          <Controller
            name="assigned"
            control={control}
            render={({ field, ...props }) => (
              <FormTableInput {...field} {...props} />
            )}
          />
        ),
      },
    ],
    [t, control],
  );

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

  useEffect(() => {
    getSubscriptionLicensesData(tenantID, subscriptionID);
  }, []);

  const setDefaultValues = (license: any) => {
    setValue("assigned", license.assigned);
  };

  const handleEditItem = (props: any) => {
    setDefaultValues(props.row.original);
  };

  console.log(licenses);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table
        title={t("Licenses")}
        columns={columns}
        data={licenses}
        toolbarActions={toolbarActions}
        isRemovable={false}
        setModalToOpen={setModalToOpen}
        setDefaultValues={setDefaultValues}
        handleEditItem={handleEditItem}
      />
    </form>
  );
};

export default observer(LicensesList);
