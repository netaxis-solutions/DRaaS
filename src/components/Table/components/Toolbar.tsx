import { observer } from "mobx-react-lite";

import { ToolbarType } from "utils/types/tableConfig";
import TablePagination from "storage/singletons/TablePagination";
import TableSearch from "storage/singletons/TableSearch";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import SearchInput from "components/common/SearchInput";

import { useToolbarStyles } from "./styles";

const Toolbar: React.FC<ToolbarType> = ({
  toolbarActions,
  setGlobalFilter,
  value = "",
  customValue,
}) => {
  const classes = useToolbarStyles();

  const {
    tableLiveSearch,
    liveSearch,
    tableWithOutServerPagination,
  } = TablePagination;

  if (!value && customValue) {
    setGlobalFilter(customValue);
  }

  return (
    <div className={classes.tableToolbarWrapper}>
      <div className={classes.tableToolbarSearchActionWrappper}>
        {!tableWithOutServerPagination ? (
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              tableLiveSearch(e.target.value);
            }}
            value={liveSearch}
          />
        ) : (
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              TableSearch.setSearchValue(e.target.value);
              setGlobalFilter(e.target.value);
            }}
            value={value}
          />
        )}

        <div className={classes.tableToolbarButtonsWrapper}>
          {toolbarActions.map(el => (
            <ButtonWithIcon
              key={el.id}
              type="button"
              icon={el.icon}
              title={el.title}
              onClick={el.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(Toolbar);
