import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Input } from "components/common/Form/FormInput";
import { useProfileTabStyles } from "./styles";
import SidebarConfig from "storage/singletons/SidebarConfig";

const Profile: FC = () => {
  const classes = useProfileTabStyles();
  const { extraLevelData } = SidebarConfig;

  return (
    <div className={classes.profileWrapper}>
      <Input
        value={extraLevelData?.name || ""}
        onChange={() => {}}
        label={"Name"}
        InputProps={{
          readOnly: true,
        }}
      />
      <Input
        value={extraLevelData?.billingId || ""}
        onChange={() => {}}
        label={"BillingID"}
        InputProps={{
          readOnly: true,
        }}
      />
      <Input
        value={""}
        onChange={() => {}}
        label={"Owner"}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default observer(Profile);
