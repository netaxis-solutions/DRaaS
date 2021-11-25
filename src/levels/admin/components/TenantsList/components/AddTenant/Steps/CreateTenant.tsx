import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

import { addDistributorSchema as addTenantSchema } from "utils/schemas/distributors";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Percent } from "components/Icons";
import { createTenantStyles } from "./styles";
import { TAddTenantFormProps, TAddTenantValues } from "utils/types/tenant";
import FormSelect from "components/common/Form/FormSelect";
import TenantStore from "storage/singletons/Tenant";
const defaultValues = {
  name: "",
  billingId: "",
  markup: "",
  owner: { value: "", label: "" },
};

const CreateTenant: React.FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const classes = createTenantStyles();
  const { control, handleSubmit } = useForm<TAddTenantValues>({
    resolver: yupResolver(addTenantSchema(t)),
    defaultValues,
  });
  const { createTenant } = TenantStore;
  const onSubmit: SubmitHandler<TAddTenantValues> = ({
    markup,
    owner,
    ...values
  }) => {
    const payload = markup
      ? {
          markup: +markup,
          ...values,
        }
      : {
          ...values,
        };
    createTenant({ payload, callback: handleCancel });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.createTenantForm}
    >
      <ModalButtonsWrapper
        handleCancel={handleCancel}
        cancelButton
        submitButtonTitle={t("Add")}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Email or ID")}
            {...field}
            {...props}
            className={classes.createTenantInput}
          />
        )}
      />
      <Controller
        name="billingId"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Billing ID")}
            helper={t(
              "Use only letters and digits, don’t use special characters (e.g. *,%,#)",
            )}
            {...field}
            {...props}
            className={clsx(
              classes.createTenantInput,
              classes.createTenantBillingInput,
            )}
          />
        )}
      />
      <Controller
        name="owner"
        control={control}
        render={({ field, ...props }) => (
          <FormSelect
            label={t("Billing ID")}
            options={[{ value: "a", label: "asd" }]}
            {...field}
            {...props}
          />
        )}
      />
      <Controller
        name="markup"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Markup")}
            helper={t("Set the markup for rates plan costs for this Tenant")}
            {...field}
            {...props}
            icon={Percent}
            className={clsx(
              classes.createTenantInput,
              classes.createTenantBillingInput,
            )}
          />
        )}
      />
    </form>
  );
};

export default CreateTenant;
