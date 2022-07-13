import { NumberRangeArray } from "utils/types/operatorConnection";
//wait implement future features
// create ranges from string[]
export const joinRangedNumber = (arr: Array<string>) => {
  const sorted = [...arr].sort((a, b) => +a - +b);
  const result = [[sorted[0]]];

  for (let j = 1, v, current = result[0]; j < sorted.length; j++) {
    v = sorted[j];
    if (+v - +current[current.length - 1] === 1) {
      current.push(v);
    } else {
      result.push((current = [v]));
    }
  }

  return result.reduce((result: NumberRangeArray[], el) => {
    return [
      ...result,
      {
        startRange: el[0],
        endRange: el[el.length - 1],
        range: el,
      },
    ];
  }, []);
};
