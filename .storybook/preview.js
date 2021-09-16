import { MemoryRouter as Router } from "react-router-dom";
import {
  ThemeProvider,
  createTheme as createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ThemeConfig from "../src/storage/singletons/ThemeConfig";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};

export const decorators = [
  (Story) => (
    <Router>
      <ThemeProvider theme={createMuiTheme(ThemeConfig.formattedTheme)}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </Router>
  ),
];
