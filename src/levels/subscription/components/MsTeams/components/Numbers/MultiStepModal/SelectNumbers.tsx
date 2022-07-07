import { FC } from "react";
import TransferList from "components/TransferList";
import { observer } from "mobx-react-lite";

const SelectNumbers: FC = () => {
  return (
    <>
      <TransferList />
    </>
  );
};

export default observer(SelectNumbers);
