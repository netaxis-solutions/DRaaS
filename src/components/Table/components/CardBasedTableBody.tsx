import InfiniteScroll from "react-infinite-scroll-component";

import TableInfiniteScroll from "storage/singletons/TableInfiniteScroll";

import { CardBasedTableBodyType } from "utils/types/tableConfig";

import { useTableBodyStyles } from "./styles";
import TableRowCard from "./TableRowCard";
import { observer } from "mobx-react-lite";

const CardBasedTableBody: React.FC<CardBasedTableBodyType> = ({
  page,
  prepareRow,
  handleLoadNext,
}) => {
  const classes = useTableBodyStyles();

  const { currentToken, getNewTableData } = TableInfiniteScroll;

  return (
    <div id={"cardBasedTableBody"} className={classes.tableBodyCardsWrapper}>
      <InfiniteScroll
        dataLength={page.length}
        next={() => getNewTableData(handleLoadNext)}
        hasMore={Boolean(currentToken) || currentToken === null}
        loader={<div>Loading...</div>}
        scrollableTarget={"cardBasedTableBody"}
        scrollThreshold={1}
      >
        {page.map(row => {
          prepareRow(row);

          return <TableRowCard key={row.id} cells={row.cells} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default observer(CardBasedTableBody);
