import { useTranslation } from "react-i18next";

import TablePagination from "storage/singletons/TablePagination";

import { TablePaginationType } from "utils/types/tableConfig";
import PaginationDropdown from "./PaginationDropdown";
import PaginationNavigation from "./PaginationNavigation";
import { tablePaginationStyles } from "./styles";
import { observer } from "mobx-react-lite";

const Pagination: React.FC<TablePaginationType> = ({
  selectedRows,
  setPageSize,
  previousPage,
  nextPage,
  canNextPage,
  canPreviousPage,
  isRadioButton,
}) => {
  const classes = tablePaginationStyles();
  const { t } = useTranslation();

  const { tableConfig, tablePageSize } = TablePagination;
  const { page, pages } = tableConfig;

  return (
    <div className={classes.tablePaginationWrapper}>
      <span>
        {!!selectedRows &&
          !isRadioButton &&
          `${t("Selected")} ${selectedRows}/${tablePageSize}`}
      </span>
      <div className={classes.tablePaginationActionsWrapper}>
        <span className={classes.tablePaginationLinesPerPageTitle}>
          {t("Lines per page")}:
        </span>
        <PaginationDropdown
          pageSize={tablePageSize}
          setPageSize={setPageSize}
        />
        <span className={classes.tablePaginationPageNumber}>
          {t("of", { page, pages })}
        </span>
        <PaginationNavigation
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
        />
      </div>
    </div>
  );
};

export default observer(Pagination);
