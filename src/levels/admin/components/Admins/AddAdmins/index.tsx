import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Skeleton } from "@mui/material";

import RoutingConfig from "storage/singletons/RoutingConfig";
import AdminsStorage from "storage/singletons/Admins";
import FormSelectWithLiveSearchStorage from "storage/singletons/FormSelectWithLiveSearch";

import { IAdminsCreate } from "utils/types/admins";
import { filterFalsyValues } from "utils/functions/objectFilters";

import FormInput from "components/common/Form/FormInput";
import RadioButtonIcon from "components/common/Form/FormRadioButton/RadioButtonIcon";
import RadioButtonCheckedIcon from "components/common/Form/FormRadioButton/RadioButtonCheckedIcon";
import FormSelectWithLiveSearch from "components/common/Form/FormSelect/FormSelectWithLiveSearch";

import useAdminsStyle from "../styles";
import RightSideModal from "storage/singletons/RightSideModal";

const defaultValues: IAdminsCreate = {
  adminEmail: "",
  firstName: "",
  lastName: "",
  mobile: "",
  entity: { label: "", value: "" },
};

const CreateAdmin: FC<{ formId: string }> = ({ formId }) => {
  const { t } = useTranslation();
  const { currentDelayedModalCloseAction: handleCancel } = RightSideModal;
  const { loggedInUserLevel } = RoutingConfig;

  const [choosenLevel, setChoosenLevel] = useState<
    "distributors" | "tenants" | "resellers" | "MyLevel"
  >("MyLevel");

  const classes = useAdminsStyle();

  const {
    createAdminsResellerLevel,
    createAdminsDistributorLevel,
    createAdminsSystemLevel,
    createAdminsTenantLevel,
    getCurrentEntity,
    setSearchData,
    clearSearch,
    isCurrentAdminLoading,
  } = AdminsStorage;

  const { cleanCurrentValue } = FormSelectWithLiveSearchStorage;

  // function for change radio value
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoosenLevel(
      event.target.value as
        | "distributors"
        | "tenants"
        | "resellers"
        | "MyLevel",
    );
  };

  // form validation
  const { control, handleSubmit } = useForm<IAdminsCreate>({
    resolver: yupResolver(
      object().shape({
        firstName: string().label(t("First Name")),
        lastName: string().label(t("Last Name")),
        adminEmail: string().required().label(t("Email")),
        mobile: string().label(t("Mobile number")),
        entity: object().shape({
          label: string(),
          value: string(),
        }),
      }),
    ),
    defaultValues,
  });

  // form submit to current level
  const onSubmit = (value: IAdminsCreate) => {
    const payload =
      value.entity?.label === ""
        ? {
            adminEmail: value.adminEmail,
            firstName: value.firstName,
            lastName: value.lastName,
            mobile: value.mobile,
          }
        : {
            adminEmail: value.adminEmail,
            firstName: value.firstName,
            lastName: value.lastName,
            mobile: value.mobile,
            entity: value.entity?.value,
          };
    switch (loggedInUserLevel) {
      case "system":
        createAdminsSystemLevel(filterFalsyValues(payload), () =>
          handleCancel(),
        );
        break;
      case "tenant":
        createAdminsTenantLevel(filterFalsyValues(payload), () =>
          handleCancel(),
        );
        break;
      case "reseller":
        createAdminsResellerLevel(filterFalsyValues(payload), () =>
          handleCancel(),
        );
        break;
      case "distributor":
        createAdminsDistributorLevel(filterFalsyValues(payload), () =>
          handleCancel(),
        );
        break;
    }
  };

  // function for clear storage and get current level data
  const selectChooseLevelData = (
    payload: "distributors" | "tenants" | "resellers" | "MyLevel",
  ) => {
    clearSearch();
    cleanCurrentValue();
    if (payload !== "MyLevel") {
      getCurrentEntity(payload);
    }
  };

  // live search for input
  const search = (value: { label: string; value: string }) => {
    if (choosenLevel !== "MyLevel") {
      setSearchData(value, choosenLevel);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <span className={classes.createModal}>{t("Main information")}</span>
      <Controller
        name="firstName"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("First name")} {...field} {...props} />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Last name")} {...field} {...props} />
        )}
      />
      <Controller
        name="adminEmail"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Email")} {...field} {...props} />
        )}
      />
      <Controller
        name="mobile"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Mobile number")} {...field} {...props} />
        )}
      />
      {loggedInUserLevel !== "tenant" && (
        <>
          <FormControl>
            <span className={classes.profileTitle}>{t("Profile")}</span>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={choosenLevel}
              onChange={handleChangeRadio}
            >
              <div className={classes.checkboxWrapper}>
                <Radio
                  value="MyLevel"
                  icon={<RadioButtonIcon className={classes.root} />}
                  checkedIcon={
                    <RadioButtonCheckedIcon className={classes.iconChecked} />
                  }
                  onClick={() => {
                    selectChooseLevelData("MyLevel");
                  }}
                />
                <span>{t("My level")}</span>
              </div>
              {loggedInUserLevel === "system" ? (
                <div className={classes.checkboxWrapper}>
                  <Radio
                    value="distributors"
                    icon={<RadioButtonIcon className={classes.root} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon className={classes.iconChecked} />
                    }
                    onClick={() => {
                      selectChooseLevelData("distributors");
                    }}
                  />
                  <span>{t("Distributor")}</span>
                </div>
              ) : null}

              {loggedInUserLevel === "system" ||
              loggedInUserLevel === "distributor" ? (
                <div className={classes.checkboxWrapper}>
                  <Radio
                    value="resellers"
                    icon={<RadioButtonIcon className={classes.root} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon className={classes.iconChecked} />
                    }
                    onClick={() => {
                      selectChooseLevelData("resellers");
                    }}
                  />
                  <span>{t("Reseller")}</span>
                </div>
              ) : null}

              <div className={classes.checkboxWrapper}>
                <Radio
                  value="tenants"
                  icon={<RadioButtonIcon className={classes.root} />}
                  checkedIcon={
                    <RadioButtonCheckedIcon className={classes.iconChecked} />
                  }
                  onClick={() => {
                    selectChooseLevelData("tenants");
                  }}
                />
                <span>{t("Tenant")}</span>
              </div>
            </RadioGroup>
          </FormControl>
          {!isCurrentAdminLoading ? (
            choosenLevel === "MyLevel" ? null : (
              <div className={classes.entitySelectWrapper}>
                <Controller
                  name="entity"
                  control={control}
                  render={({ field, ...props }) => (
                    <FormSelectWithLiveSearch
                      label={t("Entity")}
                      options={[...AdminsStorage.currentEntity]}
                      {...field}
                      {...props}
                      onSearch={search}
                    />
                  )}
                />
              </div>
            )
          ) : (
            <Skeleton width={400} height={70} />
          )}
        </>
      )}

      <div className={classes.noteText}>
        {`
           ${t("Note")}: ${t(
          "we will send a welcome mail to the provided e-mail address",
        )}
         `}
      </div>
    </form>
  );
};

export default observer(CreateAdmin);
