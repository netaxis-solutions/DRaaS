import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import TableInfiniteScroll from "storage/singletons/TableInfiniteScroll";

import { CardBasedTableBodyType } from "utils/types/tableConfig";

import TableRowCard from "./TableRowCard";

import { useTableBodyStyles } from "./styles";

const CardBasedTableBody: React.FC<CardBasedTableBodyType> = ({
  page,
  prepareRow,
  handleLoadNext,
}) => {
  const classes = useTableBodyStyles();
  const { t } = useTranslation();
  const { currentToken, getNewTableData } = TableInfiniteScroll;

  return page.length ? (
    <div id={"cardBasedTableBody"} className={classes.tableBodyCardsWrapper}>
      <InfiniteScroll
        dataLength={page.length}
        next={() => getNewTableData(handleLoadNext)}
        hasMore={Boolean(currentToken) || currentToken === null}
        loader={
          <div className={classes.loaderWrapper}>
            <CircularProgress />
          </div>
        }
        scrollableTarget={"cardBasedTableBody"}
        scrollThreshold={0.95}
        style={{ overflow: "none" }}
      >
        {page.map(row => {
          prepareRow(row);

          return <TableRowCard key={row.id} cells={row.cells} />;
        })}
      </InfiniteScroll>
    </div>
  ) : (
    <>{t("No data found")}</>
  );
};

export default observer(CardBasedTableBody);
