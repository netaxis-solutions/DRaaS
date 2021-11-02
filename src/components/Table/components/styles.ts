import { makeStyles } from "@material-ui/core";

import { ThemeDefaultOptions } from "utils/types/themeConfig";

export const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  actionsWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    '& :last-child': {
      marginLeft: theme.direction === 'ltr' ? 16 : 0,
      marginRight: theme.direction === 'ltr' ? 0 : 16
    }
  },
  wrapper: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
    alignSelf: 'auto',
  }
}));
