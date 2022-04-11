import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import { requestInfoStyles } from "../../../../styles";

const PortingRequestDetails: React.FC = () => {
  const { t } = useTranslation();
  const classes = requestInfoStyles();

  const {
    currentPortingRequest: {
      instance: { createdOn, updatedOn },
      request: {
        portId,
        status,
        dueDate,
        donor: { name },
        kind,
      },
    },
  } = PortingRequestsStore;
  const createdOnArray = createdOn.split("T");
  const updatedOnArray = updatedOn.split("T");
  const dueDateArray = dueDate.split("T");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardData = useMemo(
    () => [
      { fieldName: t("Porting ID"), fieldValue: portId },
      { fieldName: t("Kind"), fieldValue: kind },

      { fieldName: t("Status"), fieldValue: status },
      {
        fieldName: t("Date of creation"),
        fieldValue: (
          <>
            {createdOnArray[0]}{" "}
            <span className={classes.greyTime}>{createdOnArray[1]}</span>
          </>
        ),
      },
      {
        fieldName: t("Last update"),
        fieldValue: (
          <>
            {updatedOnArray[0]}{" "}
            <span className={classes.greyTime}>{updatedOnArray[1]}</span>
          </>
        ),
      },
      { fieldName: t("Donor"), fieldValue: name },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      kind,
      createdOnArray,
      dueDateArray,
      name,
      portId,
      status,
      t,
      updatedOnArray,
    ],
  );

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
