//@ts-nocheck
import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import { requestInfoStyles } from "../../../../styles";

const PortingRequestDetails: React.FC = () => {
  const { t } = useTranslation();
  const classes = requestInfoStyles();

  const {} = PortingRequestsStore;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardData = useMemo(() => [], []);

  return (
    <div className={classes.portingDetails}>
      {cardData.map(field => {
        return (
          <div key={field.fieldName} className={classes.fieldWrapper}>
            <span className={classes.fieldName}>{field.fieldName} </span>{" "}
            <span>{field.fieldValue} </span>
          </div>
        );
      })}
    </div>
  );
};

export default observer(PortingRequestDetails);
