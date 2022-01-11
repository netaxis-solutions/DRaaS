import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Plus } from "components/Icons";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EntitlementsStore from "storage/singletons/Entitlements";
import RoutingConfig from "storage/singletons/RoutingConfig";
import MyNumbersTable from "./MyNumbersTable";
import styles from "./styles";

const MyNumbers = () => {
  const { entitlements, getEntitlementsData } = EntitlementsStore;
  const params: any = useParams();
  console.log(params);
  const { history } = RoutingConfig;
  const classes = styles();

  useEffect(() => {
    getEntitlementsData(params.tenantID);
  }, []);

  return entitlements.length ? (
    <div>
      <MyNumbersTable numbers={entitlements} />
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
    </>
  );
};

export default observer(MyNumbers);
