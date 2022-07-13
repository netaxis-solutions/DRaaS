import { useEffect, useMemo, useState, FC } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useParams } from "react-router";

import CloudConnection from "storage/singletons/CloudConnection";
import PendingQueries from "storage/singletons/PendingQueries";
import TableSearch from "storage/singletons/TableSearch";

import { getIsLoading } from "utils/functions/getIsLoading";

import SearchInput from "components/common/SearchInput";
import CheckboxCheckedIcon from "components/common/Form/FormCheckbox/CheckboxCheckedIcon";
import CheckboxIcon from "components/common/Form/FormCheckbox/CheckboxIcon";
import { StrokeArrowLeft, StrokeArrowRight } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import useStyles from "../styles";

// remove duplicate and selected data
const not = (a: string[], b: string[]) => {
  return a.filter(value => b.indexOf(value) === -1);
};

// helper func for filter data
const intersection = (a: string[], b: string[]) => {
  return a.filter(value => b.indexOf(value) !== -1);
};

// use in select all. Filtered data
const union = (a: string[], b: string[]) => {
  return [...a, ...not(b, a)];
};

const TransferList: FC<{ handleCancel: () => void }> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const {
    numbersForCreate,
    incrementCheckedLength,
    dicrementCheckedLength,
    checkedLength,
    clearStorage,
    addNumbersOperatorConnect,
  } = CloudConnection;
  const { clearTableSearch } = TableSearch;
  const [checked, setChecked] = useState<string[]>([]);
  const [left, setLeft] = useState<string[]>(numbersForCreate);
  const [right, setRight] = useState<string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const { byFetchType } = PendingQueries;

  useEffect(() => {
    setLeft(numbersForCreate);
    return () => {
      clearTableSearch();
      clearStorage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numbersForCreate.length]);

  // select checkbox logic
  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // counter for select checkboxes
  const numberOfChecked = (items: string[]) =>
    intersection(checked, items).length;

  // select all checkboxes (rows)
  const handleToggleAll = (items: string[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  // get from left and send to right
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    incrementCheckedLength(leftChecked.length);
  };

  // get from right and send to left
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    dicrementCheckedLength(rightChecked.length);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNumbersOperatorConnect(tenantID, subscriptionID, right, () =>
      handleCancel(),
    );
  };

  const leftMemo = useMemo(() => {
    return left.filter(el => el.includes(TableSearch.searchValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TableSearch.searchValue, left.length, numbersForCreate.length]);

  const RightMemo = useMemo(() => {
    return right.filter(el =>
      el.includes(TableSearch.searchValueRightTransfer),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TableSearch.searchValueRightTransfer, right.length]);

  const isLoading =
    getIsLoading("@getAllFreeNumbersLastStep", byFetchType) ||
    getIsLoading("@addNumbersOperatorConnect", byFetchType);

  const renderRow = (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <div
        onClick={handleToggle(leftMemo[index])}
        className={classes.listItems}
        style={style}
      >
        <div>
          <Checkbox
            checked={checked.indexOf(leftMemo[index]) !== -1}
            tabIndex={-1}
            disableRipple
            icon={<CheckboxIcon className={classes.checkbox} />}
            checkedIcon={
              <CheckboxCheckedIcon className={classes.checkboxChecked} />
            }
          />
        </div>
        <div>{leftMemo[index]}</div>
      </div>
    );
  };

  const renderRowRight = (props: ListChildComponentProps) => {
    const { index, style } = props;

    return (
      <div
        onClick={handleToggle(RightMemo[index])}
        className={classes.listItems}
        style={style}
      >
        <div>
          <Checkbox
            checked={checked.indexOf(RightMemo[index]) !== -1}
            tabIndex={-1}
            disableRipple
            icon={<CheckboxIcon className={classes.checkbox} />}
            checkedIcon={
              <CheckboxCheckedIcon className={classes.checkboxChecked} />
            }
          />
        </div>
        <div>{RightMemo[index]}</div>
      </div>
    );
  };

  const customList = (
    side: string,
    items: string[],
    title: string,
    search: JSX.Element,
  ) => (
    <div className={classes.listWrapper}>
      <div className={classes.listTitle}>
        <div className={classes.titleLeft}>{title}</div>
        <Divider orientation="vertical" flexItem />
        <div>{search}</div>
      </div>
      <Divider />
      <div className={classes.listHeaderWrapper}>
        {side === "right" ? (
          <Checkbox
            onClick={handleToggleAll(
              items.filter((el: string) =>
                el.includes(TableSearch.searchValueRightTransfer),
              ),
            )}
            checked={
              numberOfChecked(
                items.filter(el =>
                  el.includes(TableSearch.searchValueRightTransfer),
                ),
              ) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(
                items.filter(el =>
                  el.includes(TableSearch.searchValueRightTransfer),
                ),
              ) !== items.length &&
              numberOfChecked(
                items.filter(el =>
                  el.includes(TableSearch.searchValueRightTransfer),
                ),
              ) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
            icon={<CheckboxIcon className={classes.checkbox} />}
            checkedIcon={
              <CheckboxCheckedIcon className={classes.checkboxChecked} />
            }
            indeterminateIcon={
              <CheckboxCheckedIcon className={classes.checkboxChecked} />
            }
          />
        ) : (
          <Checkbox
            onClick={handleToggleAll(
              items.filter(el => el.includes(TableSearch.searchValue)),
            )}
            checked={
              numberOfChecked(
                items.filter(el => el.includes(TableSearch.searchValue)),
              ) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(
                items.filter(el => el.includes(TableSearch.searchValue)),
              ) !== items.length &&
              numberOfChecked(
                items.filter(el => el.includes(TableSearch.searchValue)),
              ) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
            icon={<CheckboxIcon className={classes.checkbox} />}
            checkedIcon={
              <CheckboxCheckedIcon className={classes.checkboxChecked} />
            }
            indeterminateIcon={
              <CheckboxCheckedIcon className={classes.checkboxChecked} />
            }
          />
        )}
        <div className={classes.listHeaderColumns}>
          <span>{t("Number")}</span>
          <span>{t("Number type")}</span>
        </div>
      </div>
      <Divider />
      <List
        sx={{
          width: 382,
          height: 490,
          bgcolor: "background.paper",
        }}
        component="div"
        role="list"
      >
        {side === "right" ? (
          <FixedSizeList
            height={470}
            width={382}
            itemSize={45}
            itemCount={RightMemo.length}
            overscanCount={1}
          >
            {renderRowRight}
          </FixedSizeList>
        ) : (
          <FixedSizeList
            height={480}
            width={382}
            itemSize={40}
            itemCount={leftMemo.length}
            overscanCount={1}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </List>
      <Divider />
      <span className={classes.listPagination}>
        {numberOfChecked(items) === 0
          ? null
          : `${numberOfChecked(items)} ${t("rows selected")}`}
      </span>
    </div>
  );

  return (
    <>
      {!isLoading && (
        <div className={classes.topTextWrapper}>
          <span>
            {t("Select the numbers you would like to route to Microsoft Teams")}
          </span>
          <span>.{`   max 10, selected ${checkedLength}`}</span>
        </div>
      )}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {isLoading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={382} height={100} />
            <Skeleton variant="text" width={382} height={50} />
            {Array(10)
              .fill(0)
              .map((_: number, i: number) => (
                <Grid
                  key={i}
                  flexDirection="row"
                  display="flex"
                  gap={3}
                  alignItems="center"
                >
                  <Skeleton variant="rectangular" width={30} height={20} />
                  <Skeleton variant="text" width={150} height={30} />
                  <Skeleton variant="text" width={150} height={30} />
                </Grid>
              ))}
            <Skeleton variant="rectangular" width={382} height={75} />
          </Stack>
        ) : (
          <Grid item>
            {customList(
              "left",
              left,
              t("available numbers"),
              <SearchInput
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  TableSearch.setSearchValue(e.target.value);
                }}
                value={TableSearch.searchValue}
              />,
            )}
          </Grid>
        )}
        <Grid item>
          <Grid container direction="column" alignItems="center" gap={4}>
            <ButtonWithIcon
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              icon={StrokeArrowRight}
              title={""}
            />
            <ButtonWithIcon
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              icon={StrokeArrowLeft}
              title={""}
              className={classes.styleCancel}
            />
          </Grid>
        </Grid>
        {isLoading ? (
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={382} height={100} />
            <Skeleton variant="text" width={382} height={50} />
            {Array(10)
              .fill(0)
              .map((_: number, i: number) => (
                <Grid
                  key={i}
                  flexDirection="row"
                  display="flex"
                  gap={3}
                  alignItems="center"
                >
                  <Skeleton variant="rectangular" width={30} height={20} />
                  <Skeleton variant="text" width={150} height={30} />
                  <Skeleton variant="text" width={150} height={30} />
                </Grid>
              ))}
            <Skeleton variant="rectangular" width={382} height={75} />
          </Stack>
        ) : (
          <Grid item>
            <form id={"CreateNumbers"} onSubmit={onSubmit}>
              {customList(
                "right",
                right,
                t("selected numbers"),
                <SearchInput
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    TableSearch.setSearchValueRightTransfer(e.target.value);
                  }}
                  value={TableSearch.searchValueRightTransfer}
                />,
              )}
            </form>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default observer(TransferList);
