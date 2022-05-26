import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Distributor from "storage/singletons/Distributor";
import RightSideModal from "storage/singletons/RightSideModal";

import {
  TEditDistributorPayload,
  DistributorItemType,
} from "utils/types/distributors";
import { editDistributorSchema } from "utils/schemas/distributors";
import { filterFalsyValues } from "utils/functions/objectFilters";

import FormInput from "components/common/Form/FormInput";

import useEditDistributorStyles from "./styles";

const EditDistributorModal: React.FC<{
  originalDistributorValues: DistributorItemType;
  formId: string;
}> = ({
  originalDistributorValues: { uuid: distributorId, ...defaultValues },
  formId,
}) => {
  const { t } = useTranslation();
  const classes = useEditDistributorStyles();
  const { control, handleSubmit } = useForm<TEditDistributorPayload>({
    resolver: yupResolver(editDistributorSchema(t)),
    defaultValues,
  });

  const { currentDelayedModalCloseAction } = RightSideModal;
  const { editDistributor } = Distributor;

  const onSubmit = (values: TEditDistributorPayload) => {
    editDistributor({
      distributorId,
      payload: filterFalsyValues(values),
      callback: currentDelayedModalCloseAction,
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.idField}>
        <span className={classes.idText}>{t("UUID")}:</span>
        <span className={classes.idValue}>{distributorId}</span>
      </div>
      <Controller
        name="name"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Name")} {...field} {...props} />
        )}
      />
      <Controller
        name="billingId"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Billing ID")}
            helper={t("Use only letters and digits")}
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
            helper={t(
              "Set direct markup for rates plan from selected distributor to reseller",
            )}
            {...field}
            {...props}
          />
        )}
      />
    </form>
  );
};

export default observer(EditDistributorModal);
