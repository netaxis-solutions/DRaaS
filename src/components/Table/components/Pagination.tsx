import { useTranslation } from "react-i18next";

import { TablePaginationType } from "utils/types/tableConfig";
import PaginationDropdown from "./PaginationDropdown";
import PaginationNavigation from "./PaginationNavigation";
import { tablePaginationStyles } from "./styles";

const Pagination: React.FC<TablePaginationType> = ({
  selectedRows,
  pageSize,
  setPageSize,
  pageCount,
  pageNumber,
  previousPage,
  nextPage,
  canNextPage,
  canPreviousPage,
  isRadioButton,
  disabledData,
  disabledParams,
  checkbox,
}) => {
  const classes = tablePaginationStyles();
  const { t } = useTranslation();

  const filteredDataPagination =
    !isRadioButton &&
    checkbox &&
    disabledParams &&
    disabledData.filter(
      (el: any) =>
        el.original[disabledParams?.nameDisabledColumn] ===
        disabledParams?.valueDisabledColumn,
    );

  const disabledDataPagination =
    !isRadioButton &&
    checkbox &&
    disabledParams &&
    disabledData.filter(
      (el: any) =>
        el.original[disabledParams?.nameDisabledColumn] >
        disabledParams?.valueDisabledColumn,
    );

  const SelectedRowsDisabled =
    !isRadioButton && checkbox && selectedRows - disabledDataPagination?.length;
  const filteredRowsWithoutDisabledCheckbox =
    !isRadioButton && checkbox && selectedRows > filteredDataPagination?.length
      ? SelectedRowsDisabled
      : selectedRows;

  return (
    <div className={classes.tablePaginationWrapper}>
      <span>
        {!!selectedRows &&
          !isRadioButton &&
          `${t("Selected", {
            filteredRowsWithoutDisabledCheckbox,
            pageSize,
          })} `}
      </span>
      <div className={classes.tablePaginationActionsWrapper}>
        <span className={classes.tablePaginationLinesPerPageTitle}>
          {t("Lines per page")}:
        </span>
        <PaginationDropdown pageSize={pageSize} setPageSize={setPageSize} />
        <span className={classes.tablePaginationPageNumber}>
          {t("of", { pageNumber, pageCount })}
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

export default Pagination;
