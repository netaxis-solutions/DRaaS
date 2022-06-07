import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { CellProps, TableProps } from "react-table";

import MultiStepForm from "storage/singletons/MultiStepForm";
import TablePagination from "storage/singletons/TablePagination";
import PortingRequests from "storage/singletons/PortingRequests";

import { PortingNumberRangeType } from "utils/types/numbers";

import Table from "components/Table";

import { verificationStyles } from "../styles";

const getNumberWithoutPlus = (number: string) => {
  return number.replace(/\+/g, "");
};

const Verification: React.FC = () => {
  const { t } = useTranslation();
  const classes = verificationStyles();
  const {
    setSpecificStepChoice,
    goNext,
    setPreviousChoices,
    previousChoices,
  } = MultiStepForm;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { clearTablePagesWithoutServerPaginations } = TablePagination;
  const [numbers, setNumbers] = useState<Array<PortingNumberRangeType>>(
    MultiStepForm.previousChoices[2].portingNumbers,
  );
  const { defaultOperatorId, createPortingRequest } = PortingRequests;

  useEffect(() => {
    clearTablePagesWithoutServerPaginations(numbers.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSubmit } = useForm();

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
        Header: t("Valid"),
        accessor: "errors",
        Cell: ({
          value,
        }: CellProps<TableProps, Array<PortingNumberRangeType>>) => {
          return value.length ? (
            <div className={classes.failStatus}>
              {value.map(error => (
                <div>{error}</div>
              ))}
            </div>
          ) : (
            <div className={classes.successStatus}>{t("Ok")}</div>
          );
        },
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  // This submit function is used for
  // filtering out incorrect numbers and ranges
  // and after that changing the data format for an appropriate one
  // and sending this data to the backend
  const onSubmit = () => {
    const formattedNumbers = numbers
      .filter(number => !number.errors.length)
      .reduce(
        (sum: Array<{ from: string; to?: string }>, curr) => [
          ...sum,
          {
            from: getNumberWithoutPlus(curr.from),
            to: curr.to && getNumberWithoutPlus(curr.to),
          },
        ],
        [],
      );

    const filteredRanges = formattedNumbers.filter(number => number.to);

    const filteredNumbers = formattedNumbers
      .filter(number => !number.to)
      .reduce((sum: Array<string>, curr) => [...sum, curr.from], []);

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
    createPortingRequest(tenantID, subscriptionID, portingPayload, response => {
      setPreviousChoices({ portId: response.id });
      goNext();
    });
  };

  const handleDeleteItem = (props: any) => {
    setSpecificStepChoice(2, {
      portingNumbers: MultiStepForm.previousChoices[2].portingNumbers.filter(
        (number: PortingNumberRangeType) => number.id !== props.row.original.id,
      ),
    });
    setNumbers(
      MultiStepForm.previousChoices[2].portingNumbers.filter(
        (number: PortingNumberRangeType) => number.id !== props.row.original.id,
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
