import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import DistributorsStore from "storage/singletons/Distributors";
import ResellersStore from "storage/singletons/Resellers";
import TenantStore from "storage/singletons/Tenant";

import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import FormSelect from "components/common/Form/FormSelect";
import { Percent } from "components/Icons";
import { TAddTenantFormProps, TAddTenantValues } from "utils/types/tenant";
import { addTenantSchema } from "utils/schemas/tenant";

import { createTenantStyles } from "./styles";
import { observer } from "mobx-react-lite";
import ModalLoader from "components/Loader/ModalLoader";

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
  const { createTenant, ownerOptions } = TenantStore;

  useEffect(() => {
    getDistributorsData();
    getResellersData({});
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
    const splittedVal = owner.value.split("*");
    payload.owner = { uuid: splittedVal[0], type: splittedVal[1] };

    createTenant({ payload, callback: handleCancel });
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <>
      {ownerOptions && ownerOptions.length >= 1 ? (
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
                helper={t(
                  "Use only letters and digits, don’t use special characters (e.g. *,%,#)",
                )}
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
            name="owner"
            control={control}
            render={({ field, ...props }) => (
              <FormSelect
                label={t("Owner")}
                options={ownerOptions}
                {...field}
                {...props}
                className={classes.createResellerInput}
              />
            )}
          />
          <Controller
            name="markup"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Markup")}
                helper={t(
                  "Set the markup for rates plan costs for this tenant",
                )}
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
      ) : (
        <ModalLoader />
      )}
    </>
  );
};

export default observer(CreateTenant);
