import { makeStyles } from '@material-ui/core'

import { ThemeDefaultOptions } from 'utils/types/themeConfig'

const useStyles = makeStyles((theme: ThemeDefaultOptions) => ({
  root: {
    padding: `${theme.spacing(1.25)}px ${theme.spacing(2.5)}px`,
    '& svg': {
      width: 12,
      height: 12,
      fill: theme.palette.secondary.main
    }
  }
}))

export default useStyles
