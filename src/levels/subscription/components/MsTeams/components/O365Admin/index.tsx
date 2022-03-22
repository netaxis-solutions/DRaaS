import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";

import { TCreateUpdateMsAdmin, TCreateMsAdmin } from "utils/types/msTeam";
import { msTeamCreateAdmin } from "utils/schemas/msTeamsCreateAdmin";

import MsTeamAdmin from "storage/singletons/MsTeams/CreateDeleteAdmin";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import FormInput from "components/common/Form/FormInput";
import { MsTeamLimk, Trash } from "components/Icons";
import AcceptText from "./components/AcceptText";
import StartedText from "./components/StartedText";
import DeleteAdminModal from "./components/DeleteAdminModal";

import { EntitlementsStyle } from "./styles";

const O365Admin: FC = () => {
  const { t } = useTranslation();
  const classes = EntitlementsStyle();
  const [modalToOpen, setModalToOpen] = useState("");
  const [checkbox, setCheckbox] = useState({
    agree: true,
    privacy: true,
  });

  const {
    getMsTeamAdmin,
    createMsTeamAdmin,
    msTeamAdmin,
    clearCashMsTeamAdmin,
    deleteMsTeamAdmin,
    checkMsTeamAdmin,
  } = MsTeamAdmin;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  useEffect(() => {
    getMsTeamAdmin(tenantID, subscriptionID);

    return () => clearCashMsTeamAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues = {
    msUsername: "",
    msPassword: "",
    agree: true,
    privacy: true,
  };

  const { agree, privacy } = checkbox;
  const checkboxValidation = [agree, privacy].filter(el => el).length !== 2;

  const { control, handleSubmit } = useForm<TCreateMsAdmin>({
    resolver: yupResolver(msTeamCreateAdmin(t)),
    defaultValues,
  });

  const onSubmit = (payload: TCreateUpdateMsAdmin) => {
    createMsTeamAdmin(tenantID, subscriptionID, payload);
  };

  const handleDelete = () => {
    deleteMsTeamAdmin(tenantID, subscriptionID, msTeamAdmin);
    setModalToOpen("");
  };

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const agreeLabelCheckbox = (
    <span className={classes.checkboxStyling}>
      {t("I agree with processing of my personal data")}
    </span>
  );

  const privacyPolicy = (
    <span className={classes.checkboxStyling}>
      {" "}
      {t("I agree to the Direct routing ")}{" "}
      <Link to="#"> {t("Terms and Policies")} </Link> {t("and")}{" "}
      <Link to="#">{t("Privacy Policy")}</Link>{" "}
    </span>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox({
      ...checkbox,
      [event.target.name]: event.target.checked,
    });
  };

  const isDisabledButton =
    checkMsTeamAdmin?.status !== "onboarded" &&
    checkMsTeamAdmin?.status !== "not_initiated";

  return (
    <div>
      {msTeamAdmin.id ? (
        <AcceptText userName={msTeamAdmin.msUsername} />
      ) : (
        <StartedText />
      )}
      {msTeamAdmin.id ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.multiFormRoot}
        >
          <Controller
            name="msUsername"
            control={control}
            render={({ field, ...props }) => (
              <FormInput label={"User Name"} {...field} {...props} />
            )}
          />
          <Controller
            name="msPassword"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Password")}
                type={"password"}
                {...field}
                {...props}
              />
            )}
          />

          <div className={classes.multiSubmitGroupRoot}>
            <ButtonWithIcon
              onClick={() => setModalToOpen("delete")}
              title="delete"
              icon={Trash}
              cancel
              className={classes.deleteButton}
              disabled={isDisabledButton}
            />
            <ButtonWithIcon
              title="update"
              icon={MsTeamLimk}
              type="submit"
              className={classes.buttonConfirm}
              disabled={isDisabledButton}
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formRoot}>
          <Controller
            name="msUsername"
            control={control}
            render={({ field, ...props }) => (
              <FormInput label={t("Email")} {...field} {...props} />
            )}
          />
          <Controller
            name="msPassword"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Password")}
                type={"password"}
                {...field}
                {...props}
              />
            )}
          />

          <div
            className={clsx(classes.formCheckbox, {
              [classes.errorBorderCheckbox]: checkboxValidation,
            })}
          >
            <FormControl
              required
              error={checkboxValidation}
              component="fieldset"
              variant="standard"
            >
              <Controller
                name="agree"
                control={control}
                render={({ ...props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agree}
                        onChange={handleChange}
                        name="agree"
                        disableRipple
                        {...props}
                      />
                    }
                    label={agreeLabelCheckbox}
                  />
                )}
              />
              <Controller
                name="privacy"
                control={control}
                render={({ ...props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={privacy}
                        onChange={handleChange}
                        name="privacy"
                        disableRipple
                        {...props}
                      />
                    }
                    label={privacyPolicy}
                  />
                )}
              />
            </FormControl>
          </div>

          <div>
            <ButtonWithIcon
              className={classes.buttonConfirm}
              title="confirm"
              icon={MsTeamLimk}
              type="submit"
              disabled={checkboxValidation}
            />
          </div>
        </form>
      )}
      {modalToOpen === "delete" && (
        <DeleteAdminModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          admin={msTeamAdmin}
        />
      )}
    </div>
  );
};

export default observer(O365Admin);
