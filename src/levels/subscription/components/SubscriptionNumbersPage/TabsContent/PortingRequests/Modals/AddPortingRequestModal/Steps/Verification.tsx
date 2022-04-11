//@ts-nocheck
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";

import Table from "components/Table";
import { useMemo, useState } from "react";
import Tooltip from "components/Tooltip";
import { InfoIcon } from "components/Icons";
import { verificationStyles } from "../../../styles";
import PortingRequests from "storage/singletons/PortingRequests";
import { useParams } from "react-router-dom";

const Verification: React.FC = () => {
  const { t } = useTranslation();
  const classes = verificationStyles();
  const { setSpecificStepChoice, goNext, previousChoices } = MultiStepForm;
  const { tenantID, subscriptionID } = useParams();

  const [numbers, setNumbers] = useState(
    MultiStepForm.previousChoices[2].portingNumbers,
  );
  const { defaultOperatorId, createPortingRequest } = PortingRequests;
  const { handleSubmit } = useForm({
    // resolver: yupResolver(numbersRangeSchema()),
  });

  const columns = useMemo(
    () => [
      {
        Header: t("Range from"),
        accessor: "from",
      },
      {
        Header: t("Range to"),
        accessor: "to",
      },
      {
        Header: t("Status"),
        accessor: "isCorrect",
        Cell: ({ value }: CellProps<TableProps>) => {
          return value ? (
            <div className={classes.successStatus}>Success</div>
          ) : (
            <div className={classes.failStatus}>
              Error{" "}
              <Tooltip
                placement={"left"}
                title={t(
                  "This number(s) will not be included in the request as it is/they are provided incorrectly",
                )}
              >
                <InfoIcon className={classes.tooltipIcon} />
              </Tooltip>{" "}
            </div>
          );
        },
      },
    ],
    [t],
  );

  const onSubmit = () => {
    // setPreviousChoices({ suggestionsSetting: values });
    const formattedNumbers = numbers
      .filter(number => number.isCorrect)
      .reduce((sum, curr) => [...sum, { from: curr.from, to: curr.to }], []);
    console.log(formattedNumbers, numbers);
    const filteredRanges = formattedNumbers.filter(number => number.to);

    const filteredNumbers = formattedNumbers
      .filter(number => !number.to)
      .reduce((sum, curr) => [...sum, curr.from], []);

    let portingPayload = {
      donorId: defaultOperatorId,
      ...previousChoices[1].details,
    };

    if (filteredRanges.length) {
      portingPayload = { ...portingPayload, ranges: filteredRanges };
    }

    if (filteredNumbers.length) {
      portingPayload = { ...portingPayload, numbers: filteredNumbers };
    }
    createPortingRequest(tenantID, subscriptionID, portingPayload);
    goNext();
  };

  const handleDeleteItem = props => {
    setSpecificStepChoice(2, {
      portingNumbers: MultiStepForm.previousChoices[2].portingNumbers.filter(
        number => number.id !== props.row.original.id,
      ),
    });
    setNumbers(
      MultiStepForm.previousChoices[2].portingNumbers.filter(
        number => number.id !== props.row.original.id,
      ),
    );
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      <Table
        title={t("Entered numbers")}
        columns={columns}
        data={numbers}
        handleDeleteItem={handleDeleteItem}
        isRemovable
      />
    </form>
  );
};

export default observer(Verification);

// 3100000000 - 3100000001

// 3100000000

// 3100000000 - 31

// aaaaa
// 310000000011111111111111

// 3100000f000
