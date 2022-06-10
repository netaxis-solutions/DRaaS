import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import RoutingConfig from "storage/singletons/RoutingConfig";
import AdminsStorage from "storage/singletons/Admins";
import PendingQueries from "storage/singletons/PendingQueries";

import { IAdminsCreate } from "utils/types/admins";
import { filterFalsyValues } from "utils/functions/objectFilters";
import { getIsLoading } from "utils/functions/getIsLoading";

import FormInput from "components/common/Form/FormInput";
import RadioButtonIcon from "components/common/Form/FormRadioButton/RadioButtonIcon";
import RadioButtonCheckedIcon from "components/common/Form/FormRadioButton/RadioButtonCheckedIcon";
import FormSelect from "components/common/Form/FormSelect";

import useAdminsStyle from "../styles";

const defaultValues: IAdminsCreate = {
  adminEmail: "",
  firstName: "",
  lastName: "",
  mobile: "",
  entity: { label: "", value: "" },
};

const CreateAdmin: FC<{ formId: string }> = ({ formId }) => {
  const { t } = useTranslation();
  const { loggedInUserLevel } = RoutingConfig;
  const { byFetchType } = PendingQueries;

  const [value, setValue] = useState<string>("MyLevel");

  const classes = useAdminsStyle();

  const {
    createAdminsResellerLevel,
    createAdminsDistributorLevel,
    createAdminsSystemLevel,
    createAdminsTenantLevel,
    getCurrentEntity,
    currentEntity,
  } = AdminsStorage;

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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

  const onSubmit = (value: IAdminsCreate) => {
    const payload =
      value.entity?.label === ""
        ? {
            adminEmail: value.adminEmail,
            firstName: value.firstName,
            lastName: value.lastName,
            mobile: value.mobile,
          }
        : value;
    switch (loggedInUserLevel) {
      case "system":
        createAdminsSystemLevel(filterFalsyValues(payload));
        break;
      case "tenant":
        createAdminsTenantLevel(filterFalsyValues(payload));
        break;
      case "reseller":
        createAdminsResellerLevel(filterFalsyValues(payload));
        break;
      case "distributor":
        createAdminsDistributorLevel(filterFalsyValues(payload));
        break;
    }
  };

  const selectLevel = (payload: string) => {
    if (payload !== "MyLevel") {
      getCurrentEntity(payload);
    }
  };

  const isLoading = getIsLoading("@getCurrentEntity", byFetchType);

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
              defaultValue={value}
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
                    selectLevel("MyLevel");
                  }}
                />
                <span>{t("My level")}</span>
              </div>
              {loggedInUserLevel === "system" ? (
                <div className={classes.checkboxWrapper}>
                  <Radio
                    value="distributor"
                    icon={<RadioButtonIcon className={classes.root} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon className={classes.iconChecked} />
                    }
                    onClick={() => {
                      selectLevel("distributor");
                    }}
                  />
                  <span>{t("Distributor")}</span>
                </div>
              ) : null}

              {loggedInUserLevel === "system" ||
              loggedInUserLevel === "distributor" ? (
                <div className={classes.checkboxWrapper}>
                  <Radio
                    value="reseller"
                    icon={<RadioButtonIcon className={classes.root} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon className={classes.iconChecked} />
                    }
                    onClick={() => {
                      selectLevel("reseller");
                    }}
                  />
                  <span>{t("Reseller")}</span>
                </div>
              ) : null}

              <div className={classes.checkboxWrapper}>
                <Radio
                  value="tenant"
                  icon={<RadioButtonIcon className={classes.root} />}
                  checkedIcon={
                    <RadioButtonCheckedIcon className={classes.iconChecked} />
                  }
                  onClick={() => {
                    selectLevel("tenant");
                  }}
                />
                <span>{t("Tenant")}</span>
              </div>
            </RadioGroup>
          </FormControl>
          {(currentEntity.length !== 0 && !isLoading) || value === "MyLevel" ? (
            <div className={classes.entitySelectWrapper}>
              <Controller
                name="entity"
                control={control}
                render={({ field, ...props }) => (
                  <FormSelect
                    disabled={value === "MyLevel"}
                    label={t("Entity")}
                    options={[...AdminsStorage.currentEntity]}
                    {...field}
                    {...props}
                  />
                )}
              />
            </div>
          ) : (
            <span>Loading....</span>
          )}
        </>
      )}

      <div className={classes.noteText}>
        {`
           ${t("Note")}:  ${t(
          "we will send a welcome mail to the provided e-mail address",
        )}
         `}
      </div>
    </form>
  );
};

export default observer(CreateAdmin);
