export const searchRange = (phoneArr, searchValue) =>
  phoneArr.filter(({ value }) => {
    const searchWithoutPlus = searchValue.replace('+', '')
    if (Array.isArray(value)) {
      const length = searchValue.length

      const firstNumber = `${value[0]}`
      const secondNumber = `${value[1]}`

      const stringCondition =
        firstNumber.includes(searchWithoutPlus) ||
        secondNumber.includes(searchWithoutPlus)

      const isMoreThanFirst =
        Number(searchWithoutPlus) >= Number(`${firstNumber}`.slice(0, length))
      const isLessThanSecond =
        Number(searchWithoutPlus) <= Number(`${secondNumber}`.slice(0, length))

      const numberCondition = isMoreThanFirst && isLessThanSecond

      return stringCondition || numberCondition
    } else {
      return `${value}`.includes(searchWithoutPlus)
    }
  })
