import { FC } from "react";

import { SipTrunksItemElement } from "./styles";
import { SipTrunkingListItem, StrokeArrowRight, Trash } from "components/Icons";
import IconButton from "components/common/Form/IconButton";

const ListItemWithRouting: FC<{
  name: string;
  index: number;
  routeTo: () => void;
  deleteTrunk: () => void;
}> = ({ deleteTrunk, name, routeTo, index }) => {
  const classes = SipTrunksItemElement();
  return (
    <div className={classes.wrapper}>
      <div className={classes.leftSide}>
        <div className={classes.leftLine} />
        {index} <SipTrunkingListItem /> {name}
      </div>
      <div className={classes.rightSide}>
        <div className={classes.trashButton}>
          <IconButton
            disableRipple
            icon={Trash}
            onClick={() => deleteTrunk()}
          />
        </div>
        <div className={classes.routeButton}>
          <IconButton
            disableRipple
            icon={StrokeArrowRight}
            onClick={() => routeTo()}
          />
        </div>
      </div>
    </div>
  );
};

export default ListItemWithRouting;
