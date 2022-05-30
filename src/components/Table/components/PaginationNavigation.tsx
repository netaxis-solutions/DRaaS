import { observer } from "mobx-react-lite";
import clsx from "clsx";

import { PaginationNavigationType } from "utils/types/tableConfig";
import TablePagination from "storage/singletons/TablePagination";

import { ArrowLeft, ArrowRight } from "components/Icons";

import { paginationNavigationStyles } from "./styles";

const PaginationNavigation: React.FC<PaginationNavigationType> = ({
  previousPage,
  nextPage,
  pageCount,
  pageNumber,
}) => {
  const classes = paginationNavigationStyles();

  const {
    tableWithOutServerPagination,
    tableNextPage,
    tablePrevPage,
    getMinPage,
    getMaxPage,
  } = TablePagination;

  const nextPageStore = () => {
    if (!tableWithOutServerPagination) {
      nextPage();
      tableNextPage();
    } else {
      return nextPage();
    }
  };

  const prevPageStore = () => {
    if (!tableWithOutServerPagination) {
      previousPage();
      tablePrevPage();
    } else {
      return previousPage();
    }
  };

  return (
    <div className={classes.tablePaginationNavigateWrapper}>
      <div
        className={clsx(classes.tablePaginationNavigate, {
          [classes.tablePaginationNavigateDisabled]:
            (!tableWithOutServerPagination && getMinPage()) ||
            (tableWithOutServerPagination && pageNumber === 1),
        })}
        onClick={prevPageStore}
      >
        <ArrowLeft />
      </div>

      <div
        className={clsx(classes.tablePaginationNavigate, {
          [classes.tablePaginationNavigateDisabled]:
            (!tableWithOutServerPagination && getMaxPage()) ||
            (tableWithOutServerPagination && pageNumber === pageCount),
        })}
        onClick={nextPageStore}
      >
        <ArrowRight />
      </div>
    </div>
  );
};

export default observer(PaginationNavigation);
