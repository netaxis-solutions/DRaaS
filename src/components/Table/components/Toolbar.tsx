import { ToolbarType } from "utils/types/tableConfig";
import TablePagination from "storage/singletons/TablePagination";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import SearchInput from "components/common/SearchInput";

import { useToolbarStyles } from "./styles";

const Toolbar: React.FC<ToolbarType> = ({
  toolbarActions,
  setGlobalFilter,
  title,
}) => {
  const classes = useToolbarStyles();

  const { tableLiveSearch, liveSearch } = TablePagination;

  return (
    <div className={classes.tableToolbarWrapper}>
      <div className={classes.tableToolbarTitle}>{title}</div>

      <div className={classes.tableToolbarSearchActionWrappper}>
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            tableLiveSearch(e.target.value);
            setGlobalFilter(e.target.value);
          }}
          value={liveSearch}
        />
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

export default Toolbar;
