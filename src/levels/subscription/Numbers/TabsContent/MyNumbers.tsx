import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Plus } from "components/Icons";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NumbersStore from "storage/singletons/Numbers";
import RoutingConfig from "storage/singletons/RoutingConfig";
import SelectFromInventory from "./Modals/SelectFromInventory";
import MyNumbersTable from "./MyNumbersTable";
import styles from "./styles";

const MyNumbers = () => {
  const params: any = useParams();
  const classes = styles();
  const [isModalOpened, setModal] = useState(false);

  const { history } = RoutingConfig;
  const { numbers, getNumbersData, testRequest } = NumbersStore;

  useEffect(() => {
    getNumbersData(params.tenantID, params.subscriptionID);
    testRequest();
  }, []);

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
        You have no phone numbers added yet
      </div>
      <div className={classes.cardsWrapper}>
        <div className={classes.card}>
          <div className={classes.cardText}>
            You can add numbers from inventory
          </div>
          <ButtonWithIcon
            icon={Plus}
            title={"Add from inventory"}
            variant={"contained"}
            onClick={() => setModal(true)}
          />
        </div>
        <div className={classes.card}>
          {" "}
          <div className={classes.cardText}>
            You can port your numbers by adding porting request
          </div>
          <ButtonWithIcon
            icon={Plus}
            title={"Add porting request"}
            variant={"contained"}
            onClick={() => history.push("porting")}
          />
        </div>
        <div className={classes.card}>
          <div className={classes.cardText}>
            You can add numbers from{" "}
            <Link to={"reservedNumbers"} className={classes.link}>
              Reserved numbers
            </Link>{" "}
            tab.
          </div>
        </div>
      </div>
      {isModalOpened && <SelectFromInventory handleCancel={handleModalClose} />}
    </>
  );
};

export default observer(MyNumbers);
