import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import Licenses from "storage/singletons/Licenses";

import LicensesList from "./components/LicensesList";

const License: FC = () => {
  const param = useParams<any>();
  const { getSubscriptionLicensesData, licenses } = Licenses;

  useEffect(() => {
    getSubscriptionLicensesData(param?.tenantID, param?.subscriptionID);
    console.log(licenses);
  }, []);

  return (
    <>
      <LicensesList />
    </>
  );
};

export default observer(License);
