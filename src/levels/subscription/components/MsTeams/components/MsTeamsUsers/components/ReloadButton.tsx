import clsx from "clsx";
import { Reload } from "components/Icons";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import MsTeamsStore from "storage/singletons/MsTeams";

import useStyles from "../styles";

const ReloadButton: FC<{ id: string }> = ({ id }) => {
  const classes = useStyles();
  const [isChecking, setChecking] = useState(false);
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
        [classes.rotateAnimation]: isChecking,
      })}
      onClick={
        isChecking
          ? () => {}
          : () => {
              setChecking(true);
              MsTeamsStore.checkIsMSTeamsUserVoiceEnabled(
                tenantID,
                subscriptionID,
                id,
                () => {
                  setChecking(false);
                },
              );
            }
      }
    >
      <Reload />
    </div>
  );
};

export default observer(ReloadButton);
