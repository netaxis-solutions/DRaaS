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
}) => {
  const classes = tablePaginationStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.tablePaginationWrapper}>
      <span>
        {!!selectedRows &&
          !isRadioButton &&
          `${t("Selected")} ${selectedRows}/${pageSize}`}
      </span>
      <div className={classes.tablePaginationActionsWrapper}>
        <span className={classes.tablePaginationLinesPerPageTitle}>
          {t("Lines per page")}:
        </span>
        <PaginationDropdown pageSize={pageSize} setPageSize={setPageSize} />
        <span className={classes.tablePaginationPageNumber}>
          {`${pageNumber} ${t("of")} ${pageCount}`}
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
