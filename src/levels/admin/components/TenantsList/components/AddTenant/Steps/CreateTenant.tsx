import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import DistributorsStore from "storage/singletons/Distributors";
import ResellersStore from "storage/singletons/Resellers";
import TenantStore from "storage/singletons/Tenant";
import RoutingConfig from "storage/singletons/RoutingConfig";

import { TAddTenantFormProps, TAddTenantValues } from "utils/types/tenant";
import { addTenantSchema } from "utils/schemas/tenant";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import FormSelect from "components/common/Form/FormSelect";
import { Percent } from "components/Icons";

import { createTenantStyles } from "./styles";

const defaultValues = {
  name: "",
  billingId: "",
  owner: {
    label: "",
    value: "",
  },
  markup: "",
};

const CreateTenant: React.FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const classes = createTenantStyles();
  const { control, handleSubmit } = useForm<TAddTenantValues>({
    resolver: yupResolver(addTenantSchema(t)),
    defaultValues,
  });

  const { getDistributorsData } = DistributorsStore;
  const { getResellersData } = ResellersStore;
  const { loggedInUserLevel } = RoutingConfig;
  const {
    createTenant,
    getListOwnersTenant,
    owners,
    tenantOwners,
  } = TenantStore;

  useEffect(() => {
    getDistributorsData();
    getResellersData({});
    getListOwnersTenant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TAddTenantValues> = ({
    markup,
    owner,
    ...values
  }) => {
    const payload: any = markup
      ? { markup: +markup, ...values }
      : { ...values };
    if (owner.value) {
      const currentOwner = owners!.find((el: any) => el.name === owner.value);
      payload.owner = {
        type: currentOwner?.type,
        uuid: currentOwner?.uuid,
      };
    }

    createTenant({ payload, callback: handleCancel });
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.createDistributorForm}
    >
      <ModalButtonsWrapper
        handleCancel={onCancel}
        cancelButton
        submitButtonTitle={t("Add")}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Name")}
            helper={t("Must only allow name")}
            {...field}
            {...props}
            className={classes.createResellerInput}
          />
        )}
      />
      <Controller
        name="billingId"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Billing ID")}
            {...field}
            {...props}
            className={clsx(
              classes.createResellerInput,
              classes.createDistributorBillingInput,
            )}
          />
        )}
      />
      {loggedInUserLevel !== "reseller" ? (
        <Controller
          name="owner"
          control={control}
          render={({ field, ...props }) => (
            <FormSelect
              label={t("Owner")}
              options={tenantOwners}
              {...field}
              {...props}
              className={classes.createResellerInput}
            />
          )}
        />
      ) : null}

      <Controller
        name="markup"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Markup")}
            helper={t("Set the markup for rates plan costs for this tenant")}
            {...field}
            {...props}
            icon={Percent}
            className={clsx(
              classes.createResellerInput,
              classes.createDistributorBillingInput,
            )}
          />
        )}
      />
    </form>
  );
};

export default observer(CreateTenant);
