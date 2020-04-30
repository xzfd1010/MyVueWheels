export default {
  firstDayOfMonth (date) {
    let [year, month, day] = getYearMonthDate(date)
    return new Date(year, month, 1)
  },
  lastDayOfMonth (date) {
    let [year, month, day] = getYearMonthDate(date)
    return new Date(year, month + 1, 0)
  },
  // [begin,end)
  range (begin, end) {
    let result = []
    for (let i = begin; i < end; i++) {
      result.push(i)
    }
    return result
  },
  getYearMonthDate
}

function getYearMonthDate (date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return [year, month, day]
}
