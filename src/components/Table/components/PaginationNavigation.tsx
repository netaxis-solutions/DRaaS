import clsx from "clsx";

import { ArrowLeft, ArrowRight } from "components/Icons";
import { PaginationNavigationType } from "utils/types/tableConfig";
import { paginationNavigationStyles } from "./styles";

const PaginationNavigation: React.FC<PaginationNavigationType> = ({
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage
}) => {
  const classes = paginationNavigationStyles();

  return (
    <>
      <div
        className={clsx(classes.tablePaginationNavigate, {
          [classes.tablePaginationNavigateDisabled]: !canPreviousPage
        })}
        onClick={previousPage}
      >
        <ArrowLeft />
      </div>
      <div
        className={clsx(classes.tablePaginationNavigate, {
          [classes.tablePaginationNavigateDisabled]: !canNextPage
        })}
        onClick={nextPage}
      >
        <ArrowRight />
      </div>
    </>
  );
};

export default PaginationNavigation;
