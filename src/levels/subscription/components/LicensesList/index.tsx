import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useParams } from "react-router-dom";

const LicensesList: FC = () => {
  const params = useParams();
  console.log(params);

  return (
    <>
      <h1>Hello</h1>
      <h1>HELLO</h1>
      <h1>Hello</h1>
      <h1>HELLO</h1>
      <h1>Hello</h1>
      <h1>HELLO</h1>
      <h1>Hello</h1>
      <h1>HELLO</h1>
    </>
  );
};

export default observer(LicensesList);
