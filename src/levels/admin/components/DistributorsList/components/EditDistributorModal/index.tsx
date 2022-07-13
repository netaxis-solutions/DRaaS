import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Skeleton } from "@mui/material";

import Distributor from "storage/singletons/Distributor";
import RightSideModal from "storage/singletons/RightSideModal";
import RoutingConfig from "storage/singletons/RoutingConfig";

import {
  TEditDistributorPayload,
  DistributorItemType,
} from "utils/types/distributors";
import { editDistributorSchema } from "utils/schemas/distributors";
import { filterFalsyValues } from "utils/functions/objectFilters";

import FormInput from "components/common/Form/FormInput";
import { Next } from "components/Icons";

import useEditDistributorStyles from "./styles";

const EditDistributorModal: React.FC<{
  originalDistributorValues: DistributorItemType;
  formId: string;
}> = ({
  originalDistributorValues: { uuid: distributorId, ...defaultValues },
  formId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const classes = useEditDistributorStyles();
  const { control, handleSubmit, setValue } = useForm<TEditDistributorPayload>({
    resolver: yupResolver(editDistributorSchema(t)),
    defaultValues,
  });

  const { history, allAvailvableRouting } = RoutingConfig;
  const { currentDelayedModalCloseAction, setSubmitPending } = RightSideModal;
  const { editDistributor, getSpecificDistributor } = Distributor;

  useEffect(() => {
    setIsLoading(true);
    getSpecificDistributor(distributorId, () => {
      setValue(
        "markup",
        String(
          Distributor.specificDistributor?.markups?.reduce(
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
  // sends a put request for modifying current distributor
  const onSubmit = (values: TEditDistributorPayload) => {
    if (!RightSideModal.isSubmitPending) {
      setSubmitPending();
      editDistributor({
        distributorId,
        payload: filterFalsyValues(values),
        callback: () => {
          currentDelayedModalCloseAction(() => {
            setSubmitPending(false);
          });
        },
      });
    }
  };

  const navigateToChildTenants = () => {
    history.push(
      allAvailvableRouting.systemTenants + `?parent=${distributorId}`,
    );
  };

  const navigateToChildResellers = () => {
    history.push(
      allAvailvableRouting.systemResellers + `?parent=${distributorId}`,
    );
  };

  const navigateToDistributorAdmins = () => {
    history.push(
      allAvailvableRouting.systemAdmins + `?distributorId=${distributorId}`,
    );
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
      <div className={classes.redirectBlockWrapper}>
        <div>
          <span className={classes.redirectLabel}>{t("Resellers")}:</span>
          <span
            className={classes.redirectValue}
            onClick={navigateToChildResellers}
          >
            {Distributor.specificDistributor?.nbOfResellers}
          </span>
        </div>
        <div>
          <Next
            className={classes.redirectArrow}
            onClick={navigateToChildResellers}
          />
        </div>
      </div>
      <div className={classes.redirectBlockWrapper}>
        <div>
          <span className={classes.redirectLabel}>{t("Direct tenants")}:</span>
          <span
            className={classes.redirectValue}
            onClick={navigateToChildTenants}
          >
            {Distributor.specificDistributor?.nbOfDirectTenants}
          </span>
        </div>
        <div>
          <Next
            className={classes.redirectArrow}
            onClick={navigateToChildTenants}
          />
        </div>
      </div>
      <div className={classes.redirectBlockWrapper}>
        <div>
          <span className={classes.redirectLabel}>{t("Admins")}:</span>
          <span
            className={classes.redirectValue}
            onClick={navigateToDistributorAdmins}
          >
            0
          </span>
        </div>
        <div>
          <Next
            className={classes.redirectArrow}
            onClick={navigateToDistributorAdmins}
          />
        </div>
      </div>
    </>
  );
};

export default observer(EditDistributorModal);
