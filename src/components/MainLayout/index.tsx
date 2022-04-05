import { observer } from "mobx-react-lite";
import MuiContainer from "@material-ui/core/Container";

import Menu from "storage/singletons/Menu";
import { ChildrenInProps } from "utils/types/components";
import TopBar from "components/TopBar";
import Sidebar from "components/Sidebar";
import Breadcrumbs from "components/Breadcrumbs";
import useStyles from "./styles";

const MainLayout: React.FC<ChildrenInProps> = ({ children }) => {
  const classes = useStyles();

  const { sidebar } = Menu;

  return (
    <MuiContainer>
      <TopBar />
      <div className={classes.mainContentContainer}>
        {sidebar && <Sidebar options={sidebar} />}
        <div className={classes.wrapper}>
          {sidebar && <Breadcrumbs />}
          {children}
        </div>
      </div>
    </MuiContainer>
  );
};

export default observer(MainLayout);
