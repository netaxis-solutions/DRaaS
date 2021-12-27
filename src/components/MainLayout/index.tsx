import { observer } from "mobx-react-lite";
import MuiContainer from "@material-ui/core/Container";
import clsx from "clsx";

import Menu from "storage/singletons/Menu";
import { ChildrenInProps } from "utils/types/components";
import TopBar from "components/TopBar";
import Sidebar from "components/Sidebar";
import useStyles from "./styles";

const MainLayout: React.FC<ChildrenInProps> = ({ children }) => {
  const classes = useStyles();

  const { sidebar } = Menu;

  return (
    <MuiContainer>
      <TopBar />
      <div
        className={clsx(classes.mainContentContainer, {
          [classes.containerWithSidebar]: sidebar,
        })}
      >
        {sidebar && <Sidebar options={sidebar} />}
        {children}
      </div>
    </MuiContainer>
  );
};

export default observer(MainLayout);
