/**
 * Created by out_xu on 17/8/25.
 */
const randomNumBoth = (Min, Max) => {
  let range = Max - Min
  let Rand = Math.random()
  return Min + Math.round(Rand * range)
}
const addZero = (n) => n >= 10 ? n : '0' + n
export { randomNumBoth,addZero }
