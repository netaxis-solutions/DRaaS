import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import TenantStore from "storage/singletons/Tenant";
import RoutingConfig from "storage/singletons/RoutingConfig";

import { TAddTenantFormProps, TAddTenantValues } from "utils/types/tenant";
import { addTenantSchema } from "utils/schemas/tenant";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import FormSelect from "components/common/Form/FormSelect";
import { Percent } from "components/Icons";
import FormCheckbox from "components/common/Form/FormCheckbox";

import { createTenantStyles } from "./styles";

type TenantPayload = {
  name: string;
  owner?: {
    type: string;
    uuid: string;
  };
  billingId?: string;
  markup?: number;
  adminEmail?: string;
};

const defaultValues = {
  name: "",
  billingId: "",
  isDirectTenant: true,
  owner: {
    label: "",
    value: "",
  },
  markup: "",
};

const CreateTenant: React.FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const [isDirectTenant, setIsDirectTenant] = useState(true);
  const { t } = useTranslation();
  const classes = createTenantStyles();
  const { control, handleSubmit, setValue } = useForm<TAddTenantValues>({
    resolver: yupResolver(addTenantSchema(t, isDirectTenant)),
    defaultValues,
  });

  const { loggedInUserLevel } = RoutingConfig;
  const {
    createTenant,
    getListOwnersTenant,
    owners,
    tenantOwners,
  } = TenantStore;

  useEffect(() => {
    getListOwnersTenant();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TAddTenantValues> = ({
    markup,
    owner,
    isDirectTenant,
    ...values
  }) => {
    const payload: TenantPayload = markup
      ? { markup: +markup, ...values }
      : { ...values };

    if (owner.value && !isDirectTenant) {
      const currentOwner = owners!.find(el => el.uuid === owner.value);

      if (currentOwner) {
        payload.owner = {
          type: currentOwner.type,
          uuid: currentOwner.uuid,
        };
      }
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
      {loggedInUserLevel !== "reseller" && tenantOwners.length > 0 && (
        <>
          <Controller
            name="isDirectTenant"
            control={control}
            render={({ field, ...props }) => (
              <FormCheckbox
                checked={isDirectTenant}
                {...field}
                {...props}
                label={t("Direct tenant")}
                onChange={() => {
                  const newValue = !isDirectTenant;
                  setIsDirectTenant(newValue);
                  setValue("isDirectTenant", newValue);
                }}
              />
            )}
          />

          {!isDirectTenant && (
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
          )}
        </>
      )}
    </form>
  );
};

export default observer(CreateTenant);
