import { useEffect, useMemo, useState } from "react";
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
        // dueDate,
        donor: { name },
        kind,
      },
      request,
    },
    portingRequirements,
  } = PortingRequestsStore;
  const createdOnArray = createdOn.split("T");
  const updatedOnArray = updatedOn.split("T");

  const defaultFields = useMemo(
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
    [t],
  );

  const [cardData, setCardData] = useState(defaultFields);

  useEffect(() => {
    setCardData([
      ...defaultFields,
      ...portingRequirements[0].inputs.reduce(
        (
          sum: Array<{
            fieldName: string;
            fieldValue: any;
          }>,
          { parameters },
        ) => [
          ...sum,
          ...parameters.map(({ name }) => ({
            fieldName: t(`dynamic:${name}_label`),
            fieldValue: request[name],
          })),
        ],
        [],
      ),
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
