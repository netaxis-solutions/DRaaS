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
}) => {
  const classes = tablePaginationStyles();
  const { t } = useTranslation();

  const disabledFilteredRow =
    disabledParams &&
    disabledData.filter(
      (el: any) =>
        el.original[disabledParams?.nameDisabledColumn] !==
        disabledParams?.valueDisabledColumn,
    );

  const calculatedSelectedRow =
    selectedRows === disabledFilteredRow?.length
      ? selectedRows - disabledFilteredRow?.length
      : selectedRows;

  const filteredRowsWithoutDisabledCheckbox =
    (disabledData &&
      disabledData.reduce((sum: any, cur: any) => {
        if (
          disabledParams &&
          cur.isSelected &&
          cur.original[disabledParams?.nameDisabledColumn] ===
            disabledParams?.valueDisabledColumn
        ) {
          return ++sum;
        }
        return sum;
      }, 0)) ||
    calculatedSelectedRow;

  return (
    <div className={classes.tablePaginationWrapper}>
      <span>
        {!!calculatedSelectedRow &&
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
