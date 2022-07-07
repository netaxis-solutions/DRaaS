import { observer } from "mobx-react-lite";
import Grid from "@mui/material/Grid";
import CloudConnection from "storage/singletons/CloudConnection";
// import { toJS } from "mobx";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
// @ts-ignore
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
// @ts-ignore
import { toJS } from "mobx";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

const TransferList = () => {
  const { numberRange } = CloudConnection;
  // @ts-ignore
  const { t } = useTranslation();
  // const [checked, setChecked] = useState<any>(
  //   TableSelectedRowsStore?.selectedRowsValues,
  // );
  // @ts-ignore
  const [modal, setModal] = useState<string>("");
  // @ts-ignore
  const [modalData, setModalData] = useState<any>();

  const [checked, setChecked] = useState<any>([]);
  const [left, setLeft] = useState<any>([]);
  // @ts-ignore
  const [right, setRight] = useState<any>([]);

  const inputRef = useRef();

  const not = (a: any, b: any) => {
    return a.filter((value: any) => b.indexOf(value) === -1);
  };

  // @ts-ignore
  const intersection = (a: any, b: any) => {
    return a.filter((value: any) => b.indexOf(value) !== -1);
  };

  // @ts-ignore
  const union = (a: any, b: any) => {
    return [...a, ...not(b, a)];
  };

  // console.log("NUMBER RANGE", toJS(numberRange));
  useEffect(() => {
    setLeft(numberRange);
  }, [numberRange.length]);

  // @ts-ignore
  const handleToggleToRight = (value: any) => () => {
    setChecked([value]);
    const leftChecked = intersection([value], left);
    handleCheckedRight(leftChecked);
  };
  const handleToggleToLeft = (value: any) => () => {
    setChecked([value]);
    const rightChecked = intersection([value], right);
    handleCheckedLeft(rightChecked);
  };

  const handleCheckedRight = (leftChecked: any) => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = (rightChecked: any) => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const searchNumbers = () => {
    const result = left.filter((el: any) => {
      // @ts-ignore
      el.startRange.includes(inputRef?.current?.value);
    });

    setLeft(result);
  };

  // const openModal = (value: any) => {
  //   console.log("GGGGGGG", value);
  //   setModalData(value);
  //   setModal("split");
  // };

  console.log("checked", checked);

  // @ts-ignore
  // const rightChecked = intersection(checked, right);

  // const setSelectRow = () => {
  //   for (let i = 0; i <= left.length; i++) {
  //     left.filter((el: any) => {
  //       if (
  //         el.startRange ===
  //         TableSelectedRowsStore?.selectedRowsValues[i]?.values.startRange
  //       ) {
  //         const findData = [...right, el];
  //         setRight(findData);
  //       }
  //     });
  //   }
  //   // console.log("SET RIGHT", setRight(right.concat(leftChecked)));
  //   setLeft(not(left, leftChecked));
  //   // removeLeft();
  //   // console.log("RIGHT", right);
  // };
  // const handleCheckedRight = () => {
  //   // setRight(right.concat(leftChecked));
  //   console.log("SET RIGHT", setRight(right.concat(leftChecked)));
  //   console.log("SET LEFT", setLeft(not(left, leftChecked)));
  //   console.log("RIGHT", right);
  // };

  // console.log("checked", checked);

  // @ts-ignore
  // const removeLeft = () => {
  //   // console.log("LEFT", toJS(left), "RIGHT", toJS(right));
  //   const filteredLeftSide = [];
  //   for (let i = 0; i <= left.length; i++) {
  //     for (let j = 0; j <= left.length; j++) {
  //       if (
  //         left[i]?.startRange === right[j]?.startRange &&
  //         left[i] !== undefined
  //       ) {
  //         // setLeft(
  //         //   leftSide.filter(
  //         //     (el: any) => el?.startRange !== rightSide[j]?.startRange,
  //         //   ),
  //         // );

  //         filteredLeftSide.push(left[i]);
  //         console.log("FIND", left[i]?.startRange, right[j]?.startRange);
  //       }
  //     }
  //   }
  //   const result = [...new Set(filteredLeftSide)];
  //   console.log("filteredLeftSide", result);
  // };

  const CustomListLeft = () => (
    <Paper sx={{ width: 400, height: 550, overflow: "auto" }}>
      <List dense component="div" role="list">
        <input ref={inputRef as any} />{" "}
        <button onClick={searchNumbers}>Search</button>
        {left?.map((value: any) => {
          const labelId = `transfer-list-item-${value?.startRange}-label`;

          return (
            <>
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggleToRight(value)}
              >
                <ListItemText
                  id={labelId}
                  primary={`StartRange ${value?.startRange}`}
                />
                <ListItemText
                  id={labelId}
                  primary={`EndRandge ${value?.startRange}`}
                />
                <ListItemText
                  id={labelId}
                  primary={`Quantity ${value?.range.length}`}
                />
              </ListItem>
            </>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  // @ts-ignore
  const SelectRangeModal = ({ data }: any) => {
    console.log("DATA", data);
    return <> DATA: {data?.startRange}</>;
  };

  const CustomListRight = () => (
    <Paper sx={{ width: 400, height: 550, overflow: "auto" }}>
      <List dense component="div" role="list">
        {right.map((value: any) => {
          const labelId = `transfer-list-item-${value?.startRange}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggleToLeft(value)}
            >
              <ListItemText
                id={labelId}
                primary={`StartRange ${value?.startRange}`}
              />
              <ListItemText
                id={labelId}
                primary={`EndRandge ${value?.startRange}`}
              />
              <ListItemText
                id={labelId}
                primary={`Quantity ${value?.range.length}`}
              />
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
        <CustomListLeft />
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          {modal === "split" && <SelectRangeModal data={modalData} />}
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
