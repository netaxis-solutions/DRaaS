import { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import PortingRequests from "storage/singletons/PortingRequests";
import TablePagination from "storage/singletons/TablePagination";

import Table from "components/Table";

const PortingRequestErrors: React.FC = () => {
  const { t } = useTranslation();
  const { currentPortingRequest } = PortingRequests;
  const errorsList = currentPortingRequest.instance.errors;

  useEffect(() => {
    TablePagination.clearTablePagesWithoutServerPaginations(errorsList.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t("Error"),
        accessor: "description",
      },
      {
        Header: t("Timestamp"),
        accessor: "created_on",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  return (
    <Table title={t("Porting errors")} columns={columns} data={errorsList} />
  );
};

export default observer(PortingRequestErrors);
