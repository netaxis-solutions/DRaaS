import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";

import { numbersStyles } from "../styles";

type defaultValuesType = {
  rangeSize: string;
  suggestionsAmount: string;
};

const defaultValues: defaultValuesType = {
  rangeSize: "1",
  suggestionsAmount: "1",
};

const checkIsNumberCorrect = (
  number: string,
  countryCode: string,
  minLength: number,
  maxLength: number,
) => {
  const correctCountryCode = countryCode.replace(/\+/g, "");

  if (number.indexOf(correctCountryCode) !== 0) {
    return false;
  }

  if (number.length < minLength || number.length > maxLength) {
    return false;
  }

  try {
    BigInt(number);
  } catch {
    return false;
  }

  return true;
};

const parseNumbers = (
  rawNumbers: string,
  countryCode: string,
  minLength: number,
  maxLength: number,
) => {
  const splittedNumbers = rawNumbers
    .split("\n")
    .filter(number => number)
    .map(number => number.replace(/\s+/g, ""));

  return splittedNumbers.reduce(
    (
      resultNumbers: Array<{
        id: number;
        from: string;
        to?: string;
        isCorrect: boolean;
      }>,
      number,
      id,
    ) => {
      const splittedSubNumbers = number.split("-");
      if (
        splittedSubNumbers.length === 2 &&
        splittedSubNumbers[1].length < splittedSubNumbers[0].length
      ) {
        splittedSubNumbers[1] =
          splittedSubNumbers[0].slice(
            0,
            splittedSubNumbers[0].length - splittedSubNumbers[1].length,
          ) + splittedSubNumbers[1];
      }
      const resultNumber =
        splittedSubNumbers.length === 2
          ? {
              id,
              from: splittedSubNumbers[0],
              to: splittedSubNumbers[1],
              isCorrect:
                checkIsNumberCorrect(
                  splittedSubNumbers[0],
                  countryCode,
                  minLength,
                  maxLength,
                ) &&
                checkIsNumberCorrect(
                  splittedSubNumbers[1],
                  countryCode,
                  minLength,
                  maxLength,
                ),
            }
          : {
              id,
              from: number,
              isCorrect: checkIsNumberCorrect(
                number,
                countryCode,
                minLength,
                maxLength,
              ),
            };

      return [...resultNumbers, resultNumber];
    },
    [],
  );
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
  const { handleSubmit } = useForm<defaultValuesType>({
    defaultValues,
  });

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

  return (
    <form
      id={"CreatePortingRequest"}
      onSubmit={handleSubmit(onSubmit)}
      className={classes.numbersFlex}
    >
      <textarea
        value={textfieldValue}
        placeholder={"Numbers"}
        onChange={event => setTextfieldValue(event.target.value)}
        className={classes.numbersTextArea}
      />
      <div className={classes.numbersDescription}>
        {t("Please include Country Code, City/Area Code and the Local Number")}.
        {t("For example")}:
        <br />
        <br />
        <div>35319609036</div>
        <div>35 31 9609036</div>
        <br />
        {t(
          "When porting multiple numbers, they must be listed in a column, for example",
        )}
        :
        <br />
        <br />
        <div>35319609036</div>
        <div>35319600837</div>
        <div>35319603649</div>
        <br />
        {t(
          "If a range of numbers is to be ported, please enter the numbers as follows",
        )}
        :
        <br />
        <br />
        <div>35319609036 - 35319609046</div>
        {t("or")}
        <div>35319609036 - 46</div>
        <br />
      </div>
    </form>
  );
};

export default observer(Numbers);
