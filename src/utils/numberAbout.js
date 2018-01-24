/**
 * Created by out_xu on 17/8/25.
 */
const randomNumBoth = (Min, Max) => {
  let range = Max - Min
  let Rand = Math.random()
  return Min + Math.round(Rand * range)
}

const generateWord = (num) => {
  let stringName = ''
  if (num > 0) {
    if (num >= 1 && num <= 26) {
      stringName = String.fromCharCode(64 + parseInt(num))
    } else {
      while (num > 26) {
        let count = ~~(num / 26)
        let remainder = num % 26
        if (remainder === 0) {
          remainder = 26
          count--
          stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName
        } else {
          stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName
        }
        num = count
      }
      stringName = String.fromCharCode(64 + parseInt(num)) + stringName
    }
  }
  return stringName
}

const addZero = (n) => n >= 10 ? n : '0' + n

export { randomNumBoth, addZero, generateWord }
