import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NumbersStore from "storage/singletons/Numbers";
import RoutingConfig from "storage/singletons/RoutingConfig";
import TablePagination from "storage/singletons/TablePagination";

import SelectFromInventory from "./components/MultistepModal";
import MyNumbersTable from "./MyNumbersTable";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Plus } from "components/Icons";

import styles from "./styles";

const MyNumbers = () => {
  const { t } = useTranslation();
  const params = useParams<{ tenantID: string; subscriptionID: string }>();
  const classes = styles();
  const [isModalOpened, setModal] = useState(false);

  const { tablePageCounter, tablePageSize, search } = TablePagination;

  const { history } = RoutingConfig;
  const { numbers, getNumbersData, clearNumbers } = NumbersStore;

  useEffect(() => {
    getNumbersData(params.tenantID, params.subscriptionID);

    return () => {
      clearNumbers();
    };
  }, [
    clearNumbers,
    getNumbersData,
    params.subscriptionID,
    params.tenantID,
    tablePageCounter,
    tablePageSize,
    search,
  ]);

  const handleModalClose = () => {
    setModal(false);
  };

  return numbers.length ? (
    <div>
      <MyNumbersTable numbers={numbers} />
    </div>
  ) : (
    <>
      <div className={classes.noNumberText}>
        {t("You have no phone numbers added yet")}
      </div>
      <div className={classes.cardsWrapper}>
        <div className={classes.card}>
          <div className={classes.cardText}>
            {t("You can add numbers from inventory")}
          </div>
          <ButtonWithIcon
            icon={Plus}
            title={t("Add from inventory")}
            variant={"contained"}
            onClick={() => setModal(true)}
          />
        </div>
        <div className={classes.card}>
          <div className={classes.cardText}>
            {t("You can port your numbers by adding porting request")}
          </div>
          <ButtonWithIcon
            icon={Plus}
            title={t("Add porting request")}
            variant={"contained"}
            onClick={() => history.push("porting")}
          />
        </div>
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
