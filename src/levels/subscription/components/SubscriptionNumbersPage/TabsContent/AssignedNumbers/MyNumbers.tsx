import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NumbersStore from "storage/singletons/Numbers";
import RoutingConfig from "storage/singletons/RoutingConfig";
import EntitlementsStore from "storage/singletons/Entitlements";

import SelectFromInventory from "./components/MultistepModal";
import MyNumbersTable from "./MyNumbersTable";
import { InfoIcon, Plus } from "components/Icons";
import Tooltip from "components/Tooltip";
import CardWithButton from "components/CardForEmptyTable";

import styles from "./styles";

const MyNumbers = () => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = styles();
  const [isModalOpened, setModal] = useState(false);

  const { history } = RoutingConfig;
  const { numbers, getNumbersData, clearNumbers } = NumbersStore;
  const {
    availableEntitlementsNumber,
    getEntitlements,
    setAvailableEntitlementsNumber,
  } = EntitlementsStore;

  useEffect(() => {
    getNumbersData(tenantID, subscriptionID);

    getEntitlements(tenantID, subscriptionID, () => {
      setAvailableEntitlementsNumber();
    });

    return () => {
      clearNumbers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearNumbers, getNumbersData, subscriptionID, tenantID]);

  const handleModalClose = () => {
    setModal(false);
  };

  return numbers.length ? (
    <div>
      <MyNumbersTable />
    </div>
  ) : (
    <>
      <div className={classes.noNumberText}>
        {t("You have no phone numbers added yet")}
      </div>
      <div className={classes.cardsWrapper}>
        <CardWithButton
          content={t("You can add numbers from inventory")}
          customEvent={() => setModal(true)}
          buttonName={t("Add from inventory")}
          icon={Plus}
          disabled={!availableEntitlementsNumber}
          tooltip={
            <>
              {!availableEntitlementsNumber && (
                <Tooltip
                  placement="right"
                  title={t(
                    "Sorry, you cannot add any numbers because you don't have any entitlements left",
                  )}
                >
                  <InfoIcon className={classes.tooltipIcon} />
                </Tooltip>
              )}
            </>
          }
        />
        <CardWithButton
          content={t("You can port your numbers by adding porting request")}
          customEvent={() => history.push("porting")}
          buttonName={t("Add porting request")}
          icon={Plus}
        />
        <div className={classes.card}>
          <div className={classes.cardText}>
            {t("You can add numbers from")}{" "}
            <Link to={"reservedNumbers"} className={classes.link}>
              {t("Reserved numbers")}
            </Link>{" "}
            {t("tab")}.
          </div>
        </div>
      </div>
      {isModalOpened && <SelectFromInventory handleCancel={handleModalClose} />}
    </>
  );
};

export default observer(MyNumbers);
