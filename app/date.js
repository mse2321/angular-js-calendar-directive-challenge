var date = new Date();
var day = date.getDay();
var weekday = day != 0 && day != 6;
var dayDate = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

console.log(date);
console.log(day);
console.log(weekday);
console.log(dayDate);
console.log(month);
console.log(year);
