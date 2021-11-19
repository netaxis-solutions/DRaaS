import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

import DistributorStore from "storage/singletons/Distributor";
//TODO: Uncomment when multistep form will be impelemented
// import MultiStepForm from "storage/singletons/MultiStepForm";
import { addDistributorSchema } from "utils/schemas/distributors";
import { TAddDistributorValues } from "utils/types/distributors";
import { AddDistributorFormPropsType } from "utils/types/distributor";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Percent } from "components/Icons";
import { createDistributorStyles } from "./styles";

const defaultValues = {
  name: "",
  billingId: "",
  markup: "",
};

const CreateDistributor: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = createDistributorStyles();
  const { control, handleSubmit } = useForm<TAddDistributorValues>({
    resolver: yupResolver(addDistributorSchema(t)),
    defaultValues,
  });

  //TODO: Uncomment when multistep form will be impelemented
  // const { goNext, goBack } = MultiStepForm;
  const { createDistributor } = DistributorStore;

  const onSubmit: SubmitHandler<TAddDistributorValues> = ({
    markup,
    ...values
  }) => {
    const payload = markup ? { markup: +markup, ...values } : { ...values };
    //TODO: Uncomment when multistep form will be impelemented
    // createDistributor({ payload, callback: goNext });
    createDistributor({ payload, callback: handleCancel });
  };

  const onCancel = () => {
    //TODO: Uncomment when multistep form will be impelemented
    // goBack(handleCancel);
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
        //TODO: Uncomment when multistep form will be impelemented
        // submitButtonTitle={t("Next")}
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
            className={classes.createDistributorInput}
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
              classes.createDistributorInput,
              classes.createDistributorBillingInput,
            )}
          />
        )}
      />
      <span className={classes.createDistributorBillingHelper}>
        {t(
          "Use only letters and digits, don’t use special charaters (e.g. *,%,#)",
        )}
      </span>
      <Controller
        name="markup"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Markup")}
            {...field}
            {...props}
            icon={Percent}
            className={clsx(
              classes.createDistributorInput,
              classes.createDistributorBillingInput,
            )}
          />
        )}
      />
      <span className={classes.createDistributorBillingHelper}>
        {t("Set the markup for rates plan costs for this distributor")}
      </span>
    </form>
  );
};

export default CreateDistributor;
