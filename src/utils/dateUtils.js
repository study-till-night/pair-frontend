// Date对象转换为年月日
export function format(oldDate) {
  let date = new Date(oldDate); //创建新的Date对象
  let year = date.getFullYear(); //把年月日时分秒分别取出来
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = addZeroToNum(month);
  day = addZeroToNum(day);
  hour = addZeroToNum(hour);
  minute = addZeroToNum(minute);
  second = addZeroToNum(second);

  return [year, month, day].join("-") + " " + [hour, minute, second].join(":"); //将取出的数据组合拼接成预期格式的日期
}

function addZeroToNum(num) {
  return num < 10 ? "0" + num : num;
}