import { FC, forwardRef } from "react";
import MaterialTable from "material-table";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { Toolbar } from "components/MaterialTable/components";

import { Box } from "@mui/material";

import { Search, Sort } from "components/Icons";
//import CodeIcon from "@mui/icons-material/Code";

import {
  // RadioSelectRowType,
  // TableData,
  MaterialTableProps,
} from "utils/types/tableConfig";

import { useStyles } from "./styles";

const Table: FC<MaterialTableProps> = ({
  title,
  toolbarActions,
  options = {},
  columns = [],
  data = [],
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Box className={classes.tableTitle}>{title}</Box>
      <MaterialTable
        title={""}
        columns={columns}
        data={data}
        options={{
          searchFieldAlignment: "left",
          searchFieldVariant: "outlined",
          searchFieldStyle: {
            width: 542,
            fontSize: "1.4rem",
          },
          showTextRowsSelected: false,
          ...options,
        }}
        localization={{
          toolbar: {
            searchPlaceholder: `${t("Search")}...`,
          },
        }}
        components={{
          Toolbar: props => (
            <Toolbar {...props} toolbarActions={toolbarActions} />
          ),
        }}
        icons={{
          Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
          SortArrow: forwardRef((props, ref) => (
            <Sort {...props} ref={ref} width="16px" height="16px" />
          )),
        }}
        {...props}
      />
    </>
  );
};

export default observer(Table);
