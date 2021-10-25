import MuiContainer from "@material-ui/core/Container";

import TopBar from "components/TopBar";
import { ChildrenInProps } from "utils/types/components";

const MainLayout: React.FC<ChildrenInProps> = ({ children }) => {
  return (
    <MuiContainer>
      <TopBar />
      {children}
    </MuiContainer>
  );
};

export default MainLayout;
