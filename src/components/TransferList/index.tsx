import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Grid";
import CloudConnection from "storage/singletons/CloudConnection";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import { toJS } from "mobx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SearchInput from "components/common/SearchInput";
import TableSearch from "storage/singletons/TableSearch";

const TransferList = () => {
  const { numbersForCreate } = CloudConnection;
  // @ts-ignore
  const { t } = useTranslation();

  const [checked, setChecked] = useState<any>([]);
  const [left, setLeft] = useState<any>(numbersForCreate);
  const [right, setRight] = useState<any>([]);

  const not = (a: any, b: any) => {
    return a.filter((value: any) => b.indexOf(value) === -1);
  };

  const intersection = (a: any, b: any) => {
    return a.filter((value: any) => b.indexOf(value) !== -1);
  };

  const union = (a: any, b: any) => {
    return [...a, ...not(b, a)];
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  useEffect(() => {
    setLeft(numbersForCreate);
  }, [numbersForCreate.length]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("NEW CHECKED", newChecked);

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  console.log("checked", checked);

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  console.log("rerender", TableSearch.searchValue);

  const CustomListLeft = () => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(
              left.filter((el: any) => el.includes(TableSearch.searchValue)),
            )}
            checked={
              numberOfChecked(
                left.filter((el: any) => el.includes(TableSearch.searchValue)),
              ) === left.length && left.length !== 0
            }
            indeterminate={
              numberOfChecked(
                left.filter((el: any) => el.includes(TableSearch.searchValue)),
              ) !== left.length &&
              numberOfChecked(
                left.filter((el: any) => el.includes(TableSearch.searchValue)),
              ) !== 0
            }
            disabled={left.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={"GGGGG"}
        subheader={`${numberOfChecked(left)}/${left.length} selected`}
      />

      <Divider />
      <List
        sx={{
          width: 400,
          height: 550,
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {left
          .filter((el: any) => el.includes(TableSearch.searchValue))
          .map((value: any) => {
            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`List item ${value}`} />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Card>
  );

  const CustomListRight = () => (
    <Paper sx={{ width: 400, height: 550, overflow: "auto" }}>
      <List dense component="div" role="list">
        {right.map((value: any) => {
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={`List item ${value}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <h1>Free Number</h1>
        <SearchInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            TableSearch.setSearchValue(e.target.value);
          }}
          value={TableSearch.searchValue}
        />
        <CustomListLeft />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            {" >>>>>>>>>>>"}
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <h1>Selected Numbers</h1>
        <CustomListRight />
      </Grid>
    </Grid>
  );
};

export default observer(TransferList);
