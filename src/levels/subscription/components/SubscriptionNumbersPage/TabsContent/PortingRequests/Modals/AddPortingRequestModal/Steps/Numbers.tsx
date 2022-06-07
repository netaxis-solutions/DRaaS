import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";

import {
  PortingNumberRangeType,
  PortingNumbersErrors,
} from "utils/types/numbers";
import { t } from "services/Translation";

import { numbersStyles } from "../styles";

// It's a translations for all possible errors
const translations = {
  "incorrect start": t("incorrect start"),
  "incorrect length": t("incorrect length"),
  "incorrect number": t("incorrect number"),
  "range start incorrect start": t("range start incorrect start"),
  "range start incorrect length": t("range start incorrect length"),
  "range start incorrect number": t("range start incorrect number"),
  "range end incorrect start": t("range end incorrect start"),
  "range end incorrect length": t("range end incorrect length"),
  "range end incorrect number": t("range end incorrect number"),
  "numbers have different amount of digits": t(
    "numbers have different amount of digits",
  ),
  "end < start": t("end < start"),
};

// This function returns the number string without plus
const getNumberWithoutPlus = (number: string) => {
  return number.replace(/\+/g, "");
};

// This function checks if number is correct
const checkIsNumberCorrect = (
  number: string,
  countryCode: string,
  minLength: number,
  maxLength: number,
) => {
  const errorsList: Array<PortingNumbersErrors> = [];

  if (number.indexOf(countryCode) !== 0) {
    errorsList.push("incorrect start");
  }

  const correctNumber = getNumberWithoutPlus(number);

  if (correctNumber.length < minLength || correctNumber.length > maxLength) {
    errorsList.push("incorrect length");
  }

  try {
    BigInt(correctNumber);
  } catch {
    errorsList.push("incorrect number");
  }

  return errorsList;
};

// This function checks if numbers range is correct
const checkIsNumbersRangeCorrect = (
  numbers: [string, string],
  startsWith: string,
  minLength: number,
  maxLength: number,
) => {
  const errorsList: Array<PortingNumbersErrors> = [];

  if (numbers[0].length !== numbers[1].length) {
    errorsList.push("numbers have different amount of digits");
  }

  const rangeStartErrors = checkIsNumberCorrect(
    numbers[0],
    startsWith,
    minLength,
    maxLength,
  ).map(error => "range start " + error) as Array<PortingNumbersErrors>;

  const rangeEndErrors = checkIsNumberCorrect(
    numbers[1],
    startsWith,
    minLength,
    maxLength,
  ).map(error => "range end " + error) as Array<PortingNumbersErrors>;

  try {
    if (
      BigInt(getNumberWithoutPlus(numbers[0])) >
      BigInt(getNumberWithoutPlus(numbers[1]))
    ) {
      errorsList.push("end < start");
    }
  } catch {}

  return errorsList.concat(rangeStartErrors, rangeEndErrors);
};

// This function parses entered numbers and generates data
// in appropriate format for every of it for displaying
const parseNumbers = (
  rawNumbers: string,
  countryCode: string,
  minLength: number,
  maxLength: number,
) => {
  const splittedNumbers = rawNumbers.split("\n").filter(number => number);

  return splittedNumbers.reduce(
    (resultNumbers: Array<PortingNumberRangeType>, number, id) => {
      const splittedSubNumbers = number
        .split(/-(.*)/)
        .map(number => number.trim())
        .filter(number => number) as [string, string];

      const resultNumber =
        splittedSubNumbers.length === 2
          ? {
              id,
              from: splittedSubNumbers[0],
              to: splittedSubNumbers[1],
              errors: checkIsNumbersRangeCorrect(
                splittedSubNumbers,
                countryCode,
                minLength,
                maxLength,
              ).reduce(
                (keys: Array<JSX.Element>, currentKey) => [
                  ...keys,
                  translations[currentKey],
                ],
                [],
              ),
            }
          : {
              id,
              from: number,
              errors: checkIsNumberCorrect(
                number,
                countryCode,
                minLength,
                maxLength,
              ).reduce(
                (keys: Array<JSX.Element>, currentKey) => [
                  ...keys,
                  translations[currentKey],
                ],
                [],
              ),
            };

      return [...resultNumbers, resultNumber];
    },
    [],
  );
};

// This function geneates random correct number
const randomNumberGenerator = (
  startWith: string,
  minLength: number,
  maxLength = minLength,
) => {
  const startValueWithoutPlus = getNumberWithoutPlus(startWith);
  const multiplicator = maxLength - minLength + 1;
  const iterationCount =
    Math.floor(Math.random() * multiplicator + minLength) -
    startValueWithoutPlus.length;

  let res = startWith;

  for (let i = 0; i < iterationCount; i++) {
    res += Math.floor(Math.random() * 10);
  }
  return res;
};

// This function generates random correct range
const generateRandomRange = (
  startWith: string,
  minLength: number,
  maxLength: number,
) => {
  const multiplicator = maxLength - minLength + 1;

  const numbersRangeLength = Math.floor(
    Math.random() * multiplicator + minLength,
  );

  const rangeFrom = randomNumberGenerator(startWith, numbersRangeLength);

  let rangeTo = "";

  do {
    rangeTo = randomNumberGenerator(startWith, numbersRangeLength);
  } while (+getNumberWithoutPlus(rangeFrom) >= +getNumberWithoutPlus(rangeTo));

  return `${rangeFrom} - ${rangeTo}`;
};

const Numbers: React.FC = () => {
  const [textfieldValue, setTextfieldValue] = useState("");
  const { t } = useTranslation();
  const classes = numbersStyles();
  const { previousChoices, setPreviousChoices, goNext } = MultiStepForm;

  const {
    startsWith: countryCode,
    minDigits: minLength,
    maxDigits: maxLength,
  } = previousChoices[0]?.country?.numbering;
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    setPreviousChoices({
      portingNumbers: parseNumbers(
        textfieldValue,
        countryCode,
        minLength,
        maxLength,
      ),
    });
    goNext();
  };

  const numbersRange = useMemo(
    () => generateRandomRange(countryCode, minLength, maxLength),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <form
      id={"CreatePortingRequest"}
      onSubmit={handleSubmit(onSubmit)}
      className={classes.numbersFlex}
    >
      <textarea
        value={textfieldValue}
        placeholder={t("Numbers")}
        onChange={event => setTextfieldValue(event.target.value)}
        className={classes.numbersTextArea}
      />
      <div className={classes.numbersDescription}>
        {t("A valid number has following format")}:
        <ul>
          <li>
            {t("starts with")}: {countryCode}
          </li>
          <li>
            {minLength === maxLength ? (
              <div>
                {maxLength} {t("digits")}
              </div>
            ) : (
              <div>
                {t("between and digits", {
                  minLength,
                  maxLength,
                })}
              </div>
            )}
          </li>
        </ul>
        {t("You can either provide 1 number per line or a range of numbers")}
        <br />
        <br />
        <div>{t("To add ranges")}:</div>
        <ul>
          <li>
            {t("format")}: {numbersRange}
          </li>
          <li>{t("start and end must have the same amount of digits")}</li>
          <li>{t("end >= start")}</li>
        </ul>
      </div>
    </form>
  );
};

export default observer(Numbers);
