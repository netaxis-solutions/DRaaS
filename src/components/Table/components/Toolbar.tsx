import { ToolbarType } from "utils/types/tableConfig";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import SearchInput from "components/common/SearchInput";

import { useToolbarStyles } from "./styles";

const Toolbar: React.FC<ToolbarType> = ({
  toolbarActions,
  setGlobalFilter,
  value = "",
  title,
}) => {
  const classes = useToolbarStyles();

  return (
    <div className={classes.tableToolbarWrapper}>
      <div className={classes.tableToolbarTitle}>{title}</div>

      <div className={classes.tableToolbarSearchActionWrappper}>
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGlobalFilter(e.target.value);
          }}
          value={value}
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
