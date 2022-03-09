import clsx from "clsx";
import { Reload } from "components/Icons";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useParams } from "react-router-dom";

import MsTeamsStore from "storage/singletons/MsTeams";

import useStyles from "../styles";

const ReloadButton: FC<{ id: string }> = ({ id }) => {
  const classes = useStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  return (
    <div
      className={clsx({
        [classes.icon]: true,
        [classes.reloadButton]: true,
        [classes.centred]: true,
        [classes.rotateAnimation]: MsTeamsStore.isChecking,
      })}
      onClick={
        MsTeamsStore.isChecking
          ? () => {}
          : () => {
              MsTeamsStore.checkIsMSTeamsUserVoiceEnabled(
                tenantID,
                subscriptionID,
                id,
              );
            }
      }
    >
      <Reload />
    </div>
  );
};

export default observer(ReloadButton);
