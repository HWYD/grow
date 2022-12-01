//日期转为 yy-mm-dd
export function formatDate(time) {
  let date = new Date()
  if (time) {
    date = new Date(time)
  }
  const y = date.getFullYear()
  const m = `0${date.getMonth() + 1}`.slice(-2)
  const d = `0${date.getDate()}`.slice(-2)
  return `${y}-${m}-${d}`
}
//不足两位数前面补零
export function addZero(num){
  return `0${num}`.slice(-2)
}
