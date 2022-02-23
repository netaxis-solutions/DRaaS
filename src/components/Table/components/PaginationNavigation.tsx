import clsx from "clsx";

import { PaginationNavigationType } from "utils/types/tableConfig";
import TablePagination from "storage/singletons/TablePagination";

import { ArrowLeft, ArrowRight } from "components/Icons";

import { paginationNavigationStyles } from "./styles";

const PaginationNavigation: React.FC<PaginationNavigationType> = ({
  previousPage,
  nextPage,
}) => {
  const classes = paginationNavigationStyles();

  const {
    tableNextPage,
    tablePrevPage,
    getMinPage,
    getMaxPage,
  } = TablePagination;

  const nextPageStore = () => {
    nextPage();
    tableNextPage();
  };

  const prevPageStore = () => {
    previousPage();
    tablePrevPage();
  };

  return (
    <>
      <div
        className={clsx(classes.tablePaginationNavigate, {
          [classes.tablePaginationNavigateDisabled]: getMinPage(),
        })}
        onClick={prevPageStore}
      >
        <ArrowLeft />
      </div>
      <div
        className={clsx(classes.tablePaginationNavigate, {
          [classes.tablePaginationNavigateDisabled]: getMaxPage(),
        })}
        onClick={nextPageStore}
      >
        <ArrowRight />
      </div>
    </>
  );
};

export default PaginationNavigation;
