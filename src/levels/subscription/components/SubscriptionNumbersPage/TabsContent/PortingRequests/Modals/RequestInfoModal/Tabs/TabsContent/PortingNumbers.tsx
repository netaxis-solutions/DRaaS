import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import Table from "components/Table";

const PortingNumbers: React.FC = () => {
  const { t } = useTranslation();

  const {
    currentPortingRequest: {
      request: { ranges, numbers },
    },
    getPortingIdentity,
  } = PortingRequestsStore;

  const formattedNumbers = useMemo(
    () =>
      numbers
        ? numbers.reduce(
            (formattedNumbers: Array<{ from: string }>, number: string) => [
              ...formattedNumbers,
              { from: number },
            ],
            [],
          )
        : [],
    [numbers],
  );

  const numbersRanges = useMemo(
    () => (ranges ? ranges.concat(formattedNumbers) : formattedNumbers),
    [ranges, formattedNumbers],
  );

  useEffect(() => {
    getPortingIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  return numbersRanges.length ? (
    <Table
      title={t("Porting numbers")}
      columns={columns}
      data={numbersRanges}
    />
  ) : (
    <div>there are no number ranges</div>
  );
};

export default observer(PortingNumbers);
