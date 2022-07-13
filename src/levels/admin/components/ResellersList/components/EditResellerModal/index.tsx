import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Skeleton } from "@mui/material";

import RightSideModal from "storage/singletons/RightSideModal";
import Reseller from "storage/singletons/Reseller";
import RoutingConfig from "storage/singletons/RoutingConfig";

import { filterFalsyValues } from "utils/functions/objectFilters";
import { editResellerSchema } from "utils/schemas/resellers";
import { TEditResellerPayload, ResellerItemType } from "utils/types/resellers";

import FormInput from "components/common/Form/FormInput";
import { Next } from "components/Icons";

import useEditDistributorStyles from "./styles";

const EditResellerModal: React.FC<{
  originalResellerValues: ResellerItemType;
  formId: string;
}> = ({
  originalResellerValues: { uuid: resellerId, ...defaultValues },
  formId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const classes = useEditDistributorStyles();

  const { control, setValue, handleSubmit } = useForm<TEditResellerPayload>({
    resolver: yupResolver(editResellerSchema(t)),
    defaultValues,
  });

  const { history, allAvailvableRouting } = RoutingConfig;
  const { currentDelayedModalCloseAction, setSubmitPending } = RightSideModal;
  const { getSpecificReseller, editReseller } = Reseller;

  useEffect(() => {
    setIsLoading(true);
    getSpecificReseller(resellerId, () => {
      setValue(
        "markup",
        String(
          Reseller.specificReseller?.markups?.reduce(
            (currMax: { markup: null | number; startDate: string }, curr) =>
              Date.parse(currMax.startDate) > Date.parse(curr.startDate)
                ? currMax
                : curr,
            { markup: null, startDate: "0" },
          )?.markup ?? "",
        ),
      );
      setIsLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After successfully passed validation this function
  // sends a put request for modifying current reseller
  const onSubmit = (values: TEditResellerPayload) => {
    if (!RightSideModal.isSubmitPending) {
      setSubmitPending();
      editReseller({
        resellerId,
        payload: filterFalsyValues(values),
        callback: () => {
          currentDelayedModalCloseAction(() => {
            setSubmitPending(false);
          });
        },
      });
    }
  };

  const navigateToParentDistributor = () => {
    history.push(
      allAvailvableRouting.systemDistributors +
        `?id=${Reseller.specificReseller?.owner.uuid}`,
    );
  };

  const navigateToOwnedTenants = () => {
    history.push(allAvailvableRouting.systemTenants + `?parent=${resellerId}`);
  };

  return isLoading ? (
    <div className={classes.skeletonsWrapper}>
      <Skeleton />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
      <Skeleton variant="rectangular" height={40} />
    </div>
  ) : (
    <>
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className={classes.formWrapper}
      >
        <div className={classes.idField}>
          <span className={classes.idText}>{t("UUID")}:</span>
          <span className={classes.idValue}>{resellerId}</span>
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
      <div className={classes.redirectBlockWrapper}>
        <div>
          <span className={classes.redirectLabel}>{t("Owner")}:</span>
          <span
            className={classes.redirectValue}
            onClick={navigateToParentDistributor}
          >
            {Reseller.specificReseller?.owner?.name}
          </span>
        </div>
        <div>
          <Next
            className={classes.redirectArrow}
            onClick={navigateToParentDistributor}
          />
        </div>
      </div>
      <div className={classes.redirectBlockWrapper}>
        <div>
          <span className={classes.redirectLabel}>{t("Tenants")}:</span>
          <span
            className={classes.redirectValue}
            onClick={navigateToOwnedTenants}
          >
            {Reseller.specificReseller?.nbOfTenants}
          </span>
        </div>
        <div>
          <Next
            className={classes.redirectArrow}
            onClick={navigateToOwnedTenants}
          />
        </div>
      </div>
    </>
  );
};

export default observer(EditResellerModal);
