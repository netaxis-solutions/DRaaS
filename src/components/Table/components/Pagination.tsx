import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import TablePagination from "storage/singletons/TablePagination";

import { TablePaginationType } from "utils/types/tableConfig";
import PaginationDropdown from "./PaginationDropdown";
import PaginationNavigation from "./PaginationNavigation";
import { tablePaginationStyles } from "./styles";

const Pagination: React.FC<TablePaginationType> = ({
  selectedRows,
  pageSize,
  setPageSize,
  previousPage,
  nextPage,
  pageCount,
  pageNumber,
  canNextPage,
  canPreviousPage,
  isRadioButton,
  data,
}) => {
  const classes = tablePaginationStyles();
  const { t } = useTranslation();

  const {
    tableConfig,
    tablePageSize,
    tableWithOutServerPagination,
  } = TablePagination;

  const { page, pages } = tableConfig;
  return (
    <div className={classes.tablePaginationWrapper}>
      {!tableWithOutServerPagination ? (
        <span>
          {!!selectedRows &&
            !isRadioButton &&
            `${t("Selected")} ${selectedRows}/${tablePageSize}`}
        </span>
      ) : (
        <span>
          {!!selectedRows &&
            !isRadioButton &&
            `${t("Selected")} ${selectedRows}/${pageSize}`}
        </span>
      )}
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
        {!tableWithOutServerPagination ? (
          <span className={classes.tablePaginationPageNumber}>
            {!!data.length ? `${page} ${t("of")} ${pages}` : `1 ${t("of")} 1`}
          </span>
        ) : (
          <span className={classes.tablePaginationPageNumber}>
            {pageNumber} {t("of")} {pageCount === 0 ? 1 : pageCount}
          </span>
        )}

        <PaginationNavigation
          previousPage={previousPage}
          nextPage={nextPage}
          pageCount={pageCount === 0 ? 1 : pageCount}
          pageNumber={pageNumber}
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
        />
      </div>
    </div>
  );
};

export default observer(Pagination);
