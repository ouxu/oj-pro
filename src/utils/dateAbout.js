/**
 * Created by out_xu on 17/7/7.
 */
const dateFormat = format => {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

/**
 * fix safari Date type
 * safari can't deal new Date('2017-11-11 00:00:00')
 * @param str  time string like '2017-11-19 02:00:47'
 * @returns {*}
 */
const newDate = str => {
  let date
  if (typeof (str) !== 'string') {
    date = str
  } else if (str) {
    str = str.replace(/-/g, '/')
    date = new Date(str)
  } else {
    date = new Date()
  }
  return date
}

export { dateFormat, newDate }
