import { observer } from "mobx-react-lite";
import clsx from "clsx";

import TableSearch from "storage/singletons/TableSearch";
import TablePagination from "storage/singletons/TablePagination";

import { ToolbarType } from "utils/types/tableConfig";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import SearchInput from "components/common/SearchInput";

import { useToolbarStyles } from "./styles";

const Toolbar: React.FC<ToolbarType> = ({
  toolbarActions,
  setGlobalFilter,
  cardBasedLayout,
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
    <div
      className={clsx({
        [classes.tableToolbarWrapper]: !cardBasedLayout,
        [classes.cardBasedTableToolbarWrapper]: cardBasedLayout,
      })}
    >
      <div
        className={clsx({
          [classes.tableToolbarSearchActionWrappper]: true,
          [classes.cardBasedTableToolbarSearchActionWrappper]: cardBasedLayout,
        })}
      >
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

        <div
          className={clsx({
            [classes.tableToolbarButtonsWrapper]: true,
            [classes.cardBasedTableToolbarButtonsWrapper]: cardBasedLayout,
          })}
        >
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
