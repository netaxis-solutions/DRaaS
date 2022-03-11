import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

import { addSubscriptionSchema } from "utils/schemas/subscription";
import SubscriptionsStore from "storage/singletons/Subscriptions";
import {
  AddSubscriptionFormPropsType,
  TCreateSubscriptionPayload,
} from "utils/types/subscriptions";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { createSubscriptionStyles } from "./styles";

const defaultValues = {
  name: "",
  billingId: "",
};

const CreateSubscription: React.FC<AddSubscriptionFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = createSubscriptionStyles();
  const params = useParams<{ tenantID: string }>();
  const { control, handleSubmit } = useForm<TCreateSubscriptionPayload>({
    resolver: yupResolver(addSubscriptionSchema(t)),
    defaultValues,
  });

  const { getSubscriptionsData, createSubscription } = SubscriptionsStore;

  useEffect(() => {
    getSubscriptionsData(params.tenantID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TCreateSubscriptionPayload> = ({
    ...values
  }) => {
    createSubscription(params.tenantID, values, handleCancel);
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.createSubscriptionForm}
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
            className={classes.createSubscriptionInput}
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
              classes.createSubscriptionInput,
              classes.createSubscriptionBillingInput,
            )}
          />
        )}
      />
    </form>
  );
};

export default observer(CreateSubscription);
