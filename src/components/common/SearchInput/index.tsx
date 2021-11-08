import { useTranslation } from 'react-i18next'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import { SearchInputType } from 'utils/types/form'
import { Search } from 'components/Icons'
import useStyles from './styles'

const iconRender = {
  startAdornment: (
    <InputAdornment position="end">
      <Search />
    </InputAdornment>
  )
}
const SearchInput: React.FC<SearchInputType> = ({ onChange, value }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <TextField
      variant="outlined"
      onChange={onChange}
      value={value}
      InputProps={{ ...iconRender, classes }}
      placeholder={`${t('Search')}...`}
    />
  )
}

export default SearchInput
