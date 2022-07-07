const joinRangedNumbers = arr => {
    const sorted = [...arr].sort((a, b) => a - b)
    const result = [[sorted[0]]]
  
    for (let j = 1, v, current = result[0]; j < sorted.length; j++) {
      v = sorted[j]
      if (v - current[current.length - 1] === 1) {
        current.push(v)
      } else {
        result.push((current = [v]))
      }
    }
  
    return result
  }
  
  export const getRangedAssignedNumbers = arr => {
    if (!arr || !arr.length) {
      return arr || []
    }
    const rangedNumbers = joinRangedNumbers(arr)
  
    return rangedNumbers.map(value =>
      value.length === 1
        ? {
            label: value[0],
            value: value
          }
        : {
            label: `${value[0]} - ${value[value.length - 1]}`,
            value
          }
    )
  }
  
  export const getTableRangedNumbers = arr => {
    if (!arr || !arr.length) {
      return arr || []
    }
  
    const rangedNumbers = joinRangedNumbers(arr)
  
    const expandedResult = rangedNumbers.map(value => {
      const rangeStart = value[0]
      const rangeSize = +value[value.length - 1] - +value[0] + 1
      const expandedValue = {
        value,
        rangeStart,
        rangeSize
      }
  
      if (rangeSize > 1) {
        expandedValue.rangeEnd = value[value.length - 1]
      }
  
      if (rangeSize > 1) {
        expandedValue.label =
          value.length === 1
            ? value[0]
            : `${value[0]} - ${value[value.length - 1]}`
      }
  
      return expandedValue
    })
  
    return expandedResult.flatMap(item => {
      const parentItem = { ...item, id: item.rangeStart }
      let itemsAcc = [parentItem]
      if (item?.rangeSize > 1) {
        itemsAcc = [
          parentItem,
          ...item.value.map(val => ({
            rangeStart: val,
            id: val,
            parentId: item.rangeStart
          }))
        ]
      }
      return itemsAcc
    })
  }
  
  export const getRangedNumbers = (arr, selectedNumbers) => {
    if (!arr.length) {
      return arr
    }
  
    const sorted = [...arr]
      .filter(el => !selectedNumbers.includes(el.value))
      .sort((a, b) => a.value - b.value)
    const result = [[sorted[0]?.value]]
  
    for (let j = 1, v, current = result[0]; j < sorted.length; j++) {
      v = sorted[j].value
      if (v - current[current.length - 1] === 1) {
        current.push(v)
      } else {
        result.push((current = [v]))
      }
    }
  
    const resultWithSubranges = result.flatMap(range => {
      let newRange = [range]
      const assignedNumbers = getRangedAssignedNumbers(selectedNumbers)
  
      let assignedIndex = -1
      range.forEach(number => {
        assignedNumbers.forEach((assignedNumber, i) => {
          if (assignedNumber.value.includes(number)) {
            assignedIndex = i
          }
        })
      })
  
      if (
        assignedIndex > -1 &&
        range.length !== assignedNumbers[assignedIndex].value?.length
      ) {
        const assignedValue = assignedNumbers[assignedIndex].value
  
        // double range from start
        if (assignedValue[0] === range[0]) {
          const lastAssignedIndex = range.findIndex(
            number => number === assignedValue[assignedValue.length - 1]
          )
          const rest = range.slice(lastAssignedIndex + 1)
          newRange = [assignedValue, rest]
          // double range from end
        } else if (
          assignedValue[assignedValue.length - 1] === range[range.length - 1]
        ) {
          const firstAssignedIndex = range.findIndex(
            number => number === assignedValue[0]
          )
          const rest = range.slice(0, firstAssignedIndex)
          newRange = [rest, assignedValue]
          // tripple range
        } else {
          const firstAssignedIndex = range.findIndex(
            number => number === assignedValue[0]
          )
          const restStart = range.slice(0, firstAssignedIndex)
  
          const lastAssignedIndex = range.findIndex(
            number => number === assignedValue[assignedValue.length - 1]
          )
          const restEnd = range.slice(lastAssignedIndex + 1)
          newRange = [restStart, assignedValue, restEnd]
        }
      }
  
      return newRange
    })
  
    return resultWithSubranges.map(value =>
      value.length === 1
        ? {
            label: value[0],
            value: value[0]
          }
        : {
            label: `${value[0]} - ${value[value.length - 1]}`,
            value
          }
    )
  }
  