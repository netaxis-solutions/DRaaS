import { FC } from "react";
import { Link } from "react-router-dom";
import { EntitlementsStyle } from "../styles";
const StartedText: FC = () => {
  const classes = EntitlementsStyle();
  const appropriateRightsList = ["right1", "right2", "right3"];
  const credentialsList = [
    "launch powershell commands to do MS Teams provisioning and configuration",
    "setup an application in your tenant that allows us to make Microsoft graph API calls",
    "manage phone number assignment of users once the linking was executed successfully",
  ];

  return (
    <div>
      <div className={classes.adminBody}>
        <span>
          Please provide the credentials of a tenant administrator that has the
          <Link to="*"> appropriate rights </Link> within your tenant:
        </span>
        <ul>
          {appropriateRightsList.map((el: string) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
      <div className={classes.adminBody}>
        <span>We use these credentials to: </span>
        <ul>
          {credentialsList.map((el: string) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StartedText;
