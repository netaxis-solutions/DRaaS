import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react-lite";

import TablePagination from "storage/singletons/TablePagination";

import { PaginationDropdownType } from "utils/types/tableConfig";
import { paginationDropdownStyles } from "./styles";

const options = ["10", "25", "100"];

const PaginationDropdown: React.FC<PaginationDropdownType> = ({
  pageSize,
  setPageSize,
}) => {
  const classes = paginationDropdownStyles();
  const {
    setTableDropDown,
    tableWithOutServerPagination,
    setTableDropDownWithoutPagination,
    tablePageSizeWithoutPagination,
  } = TablePagination;

  return (
    <>
      {!tableWithOutServerPagination ? (
        <Autocomplete
          options={options}
          value={`${pageSize}`}
          disableClearable
          onChange={(_, value) => {
            if (value) {
              setPageSize(+value);
              setTableDropDown(+value);
            }
          }}
          classes={{
            root: classes.autocompleteRoot,
            inputRoot: classes.automcompleteInputRoot,
            input: classes.autocompleteInput,
            endAdornment: classes.autocompleteEndAdornment,
          }}
          renderInput={params => <TextField variant="outlined" {...params} />}
        />
      ) : (
        <Autocomplete
          options={options}
          value={`${tablePageSizeWithoutPagination}`}
          disableClearable
          onChange={(_, value) => {
            setPageSize(Number(value));
            setTableDropDownWithoutPagination(Number(value));
            setTableDropDown(Number(value))
          }}
          classes={{
            root: classes.autocompleteRoot,
            inputRoot: classes.automcompleteInputRoot,
            input: classes.autocompleteInput,
            endAdornment: classes.autocompleteEndAdornment,
          }}
          renderInput={params => <TextField variant="outlined" {...params} />}
        />
      )}
    </>
  );
};

export default observer(PaginationDropdown);
