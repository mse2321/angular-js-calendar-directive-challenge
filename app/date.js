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

$( document ).ready(function() { 
	getMonthlyRange();
});


function getMonthlyRange (date) {
    var month = date.getMonth();
    var startDay = new Date(date);
    startDay.setDate(1);

    var firstDay = new Date(startDay);
    if (firstDay.getDay() > 0) { //Not Sunday
      firstDay.setTime(firstDay.getTime() - (firstDay.getDay() * this.DAY));
    }
    var endDay = new Date(startDay);
    if(month == 11) {
      endDay.setMonth(0);
      endDay.setYear(endDay.getFullYear() + 1);
    } else {
      endDay.setMonth(month + 1);
    }

    endDay.setTime(endDay.getTime() - this.DAY);

    var lastDay = new Date(endDay);
    lastDay.setTime(lastDay.getTime() + (6 - endDay.getDay()) * this.DAY);

    var date = new Date(firstDay);
    var days = [];
    while(date <= lastDay) {
      days.push(this.prepareDate(date));
      date.setTime(day.getTime() + this.DAY);
    }

    return {
      first : firstDay,
      start : startDay,
      end : endDay,
      last : lastDay,
      days : days
    };

    console.log('first day ' + firstDay);
    console.log('end day ' + endDay);
    console.log('last day ' + lastDay);

;}