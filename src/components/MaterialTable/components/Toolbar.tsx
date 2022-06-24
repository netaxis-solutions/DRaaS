import { FC } from "react";
import { observer } from "mobx-react-lite";

import { MTableToolbar } from "material-table";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { MaterialToolbarType } from "utils/types/tableConfig";

import { useToolbarStyles } from "./styles";

const Toolbar: FC<MaterialToolbarType> = ({ toolbarActions, ...props }) => {
  const classes = useToolbarStyles();

  return (
    <div className={classes.tableToolbarWrapper}>
      <MTableToolbar className={classes.defaultToolbar} {...props} />
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
  );
};

export default observer(Toolbar);
